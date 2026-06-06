import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import sql from "@/src/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthenticated" });

  const [member] = await sql(
    "SELECT * FROM community_members WHERE clerk_user_id = $1",
    [userId]
  );

  if (!member || member.status !== "approved")
    return res.status(403).json({ error: "Approved members only" });

  // GET — admins see all invites; regular members see only their own
  if (req.method === "GET") {
    const invites = member.role === "admin"
      ? await sql(
          `SELECT i.*, m.full_name as created_by_name
           FROM community_invites i
           LEFT JOIN community_members m ON i.created_by = m.id
           ORDER BY i.created_at DESC`
        )
      : await sql(
          `SELECT i.*, m.full_name as created_by_name
           FROM community_invites i
           LEFT JOIN community_members m ON i.created_by = m.id
           WHERE i.created_by = $1
           ORDER BY i.created_at DESC`,
          [member.id]
        );
    return res.status(200).json({ invites });
  }

  // POST — any approved member can create an invite
  if (req.method === "POST") {
    const { email } = req.body;

    const [invite] = await sql(
      `INSERT INTO community_invites (created_by, email)
       VALUES ($1, $2)
       RETURNING *`,
      [member.id, email || null]
    );

    return res.status(201).json({ invite });
  }

  return res.status(405).end();
}
