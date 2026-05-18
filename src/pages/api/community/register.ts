import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import sql from "@/src/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthenticated" });

  const { full_name, email, phone, invite_token } = req.body;

  if (!full_name || !email) {
    return res.status(400).json({ error: "full_name and email are required" });
  }

  // Check if already registered
  const existing = await sql(
    "SELECT id FROM community_members WHERE clerk_user_id = $1",
    [userId]
  );
  if (existing.length > 0) {
    return res.status(409).json({ error: "Already registered" });
  }

  let invite_id: string | null = null;
  let status: "pending" | "approved" = "pending";

  if (invite_token) {
    const invite = await sql(
      `SELECT id FROM community_invites
       WHERE token = $1 AND used_at IS NULL AND expires_at > NOW()`,
      [invite_token]
    );
    if (invite.length === 0) {
      return res.status(400).json({ error: "Invalid or expired invite link" });
    }
    invite_id = invite[0].id;
    status = "approved"; // invite = instant approval
  }

  const [member] = await sql(
    `INSERT INTO community_members (clerk_user_id, full_name, email, phone, status, invite_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [userId, full_name, email, phone || null, status, invite_id]
  );

  // Mark invite as used
  if (invite_id) {
    await sql("UPDATE community_invites SET used_at = NOW() WHERE id = $1", [
      invite_id,
    ]);
  }

  return res.status(201).json({ member });
}
