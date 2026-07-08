import type { VercelRequest, VercelResponse } from "@vercel/node";
import { eq, ilike, and, desc, sql, or } from "drizzle-orm";
import { db, profilesTable, serializeProfile } from "../_lib/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    const { category, search, featured, page = "1", limit = "12" } = req.query as Record<string, string>;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, parseInt(limit) || 12);
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];
    if (category) conditions.push(eq(profilesTable.category, category));
    if (featured !== undefined) conditions.push(eq(profilesTable.featured, featured === "true"));
    if (search) {
      conditions.push(
        or(
          ilike(profilesTable.name, `%${search}%`),
          ilike(profilesTable.tagline, `%${search}%`),
          ilike(profilesTable.bio, `%${search}%`),
          ilike(profilesTable.organization, `%${search}%`)
        )!
      );
    }
    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [profiles, countResult] = await Promise.all([
      db.select().from(profilesTable).where(where)
        .orderBy(desc(profilesTable.featured), desc(profilesTable.createdAt))
        .limit(limitNum).offset(offset),
      db.select({ count: sql<number>`cast(count(*) as int)` }).from(profilesTable).where(where),
    ]);

    return res.json({ profiles: profiles.map(serializeProfile), total: countResult[0]?.count ?? 0, page: pageNum, limit: limitNum });
  }

  if (req.method === "POST") {
    const body = req.body;
    if (!body?.name || !body?.category || !body?.tagline) {
      return res.status(400).json({ error: "name, category, and tagline are required" });
    }
    const [profile] = await db.insert(profilesTable).values({
      name: body.name,
      category: body.category,
      tagline: body.tagline,
      bio: body.bio ?? null,
      location: body.location ?? null,
      phone: body.phone ?? null,
      email: body.email ?? null,
      website: body.website ?? null,
      avatarUrl: body.avatarUrl ?? null,
      coverImageUrl: body.coverImageUrl ?? null,
      achievements: body.achievements ?? [],
      awards: body.awards ?? [],
      galleryUrls: body.galleryUrls ?? [],
      socialLinks: body.socialLinks ?? {},
      featured: body.featured ?? false,
      verified: body.verified ?? false,
      yearsOfExperience: body.yearsOfExperience ?? null,
      organization: body.organization ?? null,
    }).returning();
    return res.status(201).json(serializeProfile(profile));
  }

  return res.status(405).json({ error: "Method not allowed" });
}
