import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "drizzle-orm";
import { db, profilesTable } from "../_lib/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const rows = await db
    .select({ category: profilesTable.category, count: sql<number>`cast(count(*) as int)` })
    .from(profilesTable)
    .groupBy(profilesTable.category);

  return res.json(rows.map(r => ({ category: r.category, count: r.count })));
}
