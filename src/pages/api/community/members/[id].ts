import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import sql from "@/src/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(405).end();

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthenticated" });

  const [admin] = await sql(
    "SELECT * FROM community_members WHERE clerk_user_id = $1",
    [userId]
  );

  if (!admin || admin.role !== "admin")
    return res.status(403).json({ error: "Admins only" });

  const { id } = req.query;
  const { status, role } = req.body;

  if (
    status &&
    !["pending", "approved", "rejected"].includes(status)
  ) {
    return res.status(400).json({ error: "Invalid status" });
  }

  if (role && !["member", "admin"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const [updated] = await sql(
    `UPDATE community_members
     SET status = COALESCE($1, status),
         role = COALESCE($2, role),
         updated_at = NOW()
     WHERE id = $3
     RETURNING *`,
    [status || null, role || null, id]
  );

  if (!updated) return res.status(404).json({ error: "Member not found" });

  return res.status(200).json({ member: updated });
}
