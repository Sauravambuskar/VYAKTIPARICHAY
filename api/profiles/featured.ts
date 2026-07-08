import type { VercelRequest, VercelResponse } from "@vercel/node";
import { eq, desc } from "drizzle-orm";
import { db, profilesTable, serializeProfile } from "../_lib/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const limit = Math.min(50, parseInt((req.query.limit as string) || "6") || 6);
  const profiles = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.featured, true))
    .orderBy(desc(profilesTable.createdAt))
    .limit(limit);

  return res.json(profiles.map(serializeProfile));
}
