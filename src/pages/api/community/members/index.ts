import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import sql from "@/src/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthenticated" });

  const [member] = await sql(
    "SELECT * FROM community_members WHERE clerk_user_id = $1",
    [userId]
  );

  if (!member || member.role !== "admin")
    return res.status(403).json({ error: "Admins only" });

  const { status } = req.query;
  let members;

  if (status && typeof status === "string") {
    members = await sql(
      "SELECT * FROM community_members WHERE status = $1 ORDER BY created_at DESC",
      [status]
    );
  } else {
    members = await sql(
      "SELECT * FROM community_members ORDER BY created_at DESC"
    );
  }

  return res.status(200).json({ members });
}
