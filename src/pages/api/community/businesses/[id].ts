import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import sql from "@/src/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  // GET — single business detail (public)
  if (req.method === "GET") {
    const [business] = await sql(
      `SELECT b.*, m.full_name as owner_name
       FROM community_businesses b
       JOIN community_members m ON b.owner_id = m.id
       WHERE b.id = $1 AND b.active = TRUE`,
      [id]
    );
    if (!business) return res.status(404).json({ error: "Not found" });
    return res.status(200).json({ business });
  }

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthenticated" });

  const [member] = await sql(
    "SELECT * FROM community_members WHERE clerk_user_id = $1",
    [userId]
  );
  if (!member) return res.status(403).json({ error: "Not a community member" });

  const [business] = await sql(
    "SELECT * FROM community_businesses WHERE id = $1",
    [id]
  );
  if (!business) return res.status(404).json({ error: "Not found" });

  // Only owner or admin can edit/delete
  const isOwner = business.owner_id === member.id;
  const isAdmin = member.role === "admin";

  if (!isOwner && !isAdmin)
    return res.status(403).json({ error: "Forbidden" });

  // PUT — update
  if (req.method === "PUT") {
    const { name, category, description, website, phone, email, location, logo_url, active } =
      req.body;

    const [updated] = await sql(
      `UPDATE community_businesses
       SET name = COALESCE($1, name),
           category = COALESCE($2, category),
           description = COALESCE($3, description),
           website = COALESCE($4, website),
           phone = COALESCE($5, phone),
           email = COALESCE($6, email),
           location = COALESCE($7, location),
           logo_url = COALESCE($8, logo_url),
           active = COALESCE($9, active),
           updated_at = NOW()
       WHERE id = $10
       RETURNING *`,
      [name, category, description, website, phone, email, location, logo_url, active, id]
    );

    return res.status(200).json({ business: updated });
  }

  // DELETE — remove listing
  if (req.method === "DELETE") {
    await sql("DELETE FROM community_businesses WHERE id = $1", [id]);
    return res.status(200).json({ success: true });
  }

  return res.status(405).end();
}
