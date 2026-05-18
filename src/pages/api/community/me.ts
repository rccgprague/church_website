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

  if (!member) return res.status(404).json({ error: "Not registered" });

  return res.status(200).json({ member });
}
