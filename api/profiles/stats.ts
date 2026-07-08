import type { VercelRequest, VercelResponse } from "@vercel/node";
import { eq, sql } from "drizzle-orm";
import { db, profilesTable } from "../_lib/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const [total, verified, featured, cats] = await Promise.all([
    db.select({ count: sql<number>`cast(count(*) as int)` }).from(profilesTable),
    db.select({ count: sql<number>`cast(count(*) as int)` }).from(profilesTable).where(eq(profilesTable.verified, true)),
    db.select({ count: sql<number>`cast(count(*) as int)` }).from(profilesTable).where(eq(profilesTable.featured, true)),
    db.selectDistinct({ category: profilesTable.category }).from(profilesTable),
  ]);

  return res.json({
    totalProfiles: total[0]?.count ?? 0,
    verifiedProfiles: verified[0]?.count ?? 0,
    featuredProfiles: featured[0]?.count ?? 0,
    categoriesCount: cats.length,
  });
}
