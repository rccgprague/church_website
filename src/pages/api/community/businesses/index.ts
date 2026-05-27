import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import sql from "@/src/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  // GET — public search/list (returns only active listings to approved members or publicly)
  if (req.method === "GET") {
    const { search, category } = req.query;

    let query = `
      SELECT b.*, m.full_name as owner_name
      FROM community_businesses b
      JOIN community_members m ON b.owner_id = m.id
      WHERE b.active = TRUE AND m.status = 'approved'
    `;
    const params: string[] = [];
    let idx = 1;

    if (category && typeof category === "string") {
      query += ` AND b.category = $${idx++}`;
      params.push(category);
    }

    if (search && typeof search === "string") {
      query += ` AND (b.name ILIKE $${idx} OR b.description ILIKE $${idx} OR b.category ILIKE $${idx})`;
      params.push(`%${search}%`);
      idx++;
    }

    query += " ORDER BY b.created_at DESC";

    const businesses = await sql(query, params);
    return res.status(200).json({ businesses });
  }

  // POST — create a business (approved members only)
  if (req.method === "POST") {
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const [member] = await sql(
      "SELECT * FROM community_members WHERE clerk_user_id = $1",
      [userId]
    );

    if (!member) return res.status(403).json({ error: "Not a community member" });
    if (member.status !== "approved")
      return res.status(403).json({ error: "Your membership is pending approval" });

    const { name, category, description, website, phone, email, location, logo_url } =
      req.body;

    if (!name || !category || !description) {
      return res
        .status(400)
        .json({ error: "name, category, and description are required" });
    }

    const [business] = await sql(
      `INSERT INTO community_businesses
         (owner_id, name, category, description, website, phone, email, location, logo_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        member.id,
        name,
        category,
        description,
        website || null,
        phone || null,
        email || null,
        location || null,
        logo_url || null,
      ]
    );

    return res.status(201).json({ business });
  }

  return res.status(405).end();
}
