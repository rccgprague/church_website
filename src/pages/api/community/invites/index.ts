import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import sql from "@/src/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthenticated" });

  const [admin] = await sql(
    "SELECT * FROM community_members WHERE clerk_user_id = $1",
    [userId]
  );

  if (!admin || admin.role !== "admin")
    return res.status(403).json({ error: "Admins only" });

  // GET — list all invites
  if (req.method === "GET") {
    const invites = await sql(
      `SELECT i.*, m.full_name as created_by_name
       FROM community_invites i
       LEFT JOIN community_members m ON i.created_by = m.id
       ORDER BY i.created_at DESC`
    );
    return res.status(200).json({ invites });
  }

  // POST — create a new invite
  if (req.method === "POST") {
    const { email } = req.body;

    const [invite] = await sql(
      `INSERT INTO community_invites (created_by, email)
       VALUES ($1, $2)
       RETURNING *`,
      [admin.id, email || null]
    );

    return res.status(201).json({ invite });
  }

  return res.status(405).end();
}
