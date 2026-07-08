import type { VercelRequest, VercelResponse } from "@vercel/node";
import { eq } from "drizzle-orm";
import { db, profilesTable, serializeProfile } from "../_lib/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const id = parseInt(req.query.id as string);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid profile ID" });

  if (req.method === "GET") {
    const [profile] = await db.select().from(profilesTable).where(eq(profilesTable.id, id));
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    return res.json(serializeProfile(profile));
  }

  if (req.method === "PATCH") {
    const body = req.body ?? {};
    const allowed = ["name","category","tagline","bio","location","phone","email","website","avatarUrl","coverImageUrl","achievements","awards","galleryUrls","socialLinks","featured","verified","yearsOfExperience","organization"];
    const update: Record<string, unknown> = { updatedAt: new Date() };
    for (const key of allowed) {
      if (key in body) update[key] = body[key];
    }
    const [profile] = await db.update(profilesTable).set(update).where(eq(profilesTable.id, id)).returning();
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    return res.json(serializeProfile(profile));
  }

  if (req.method === "DELETE") {
    const [deleted] = await db.delete(profilesTable).where(eq(profilesTable.id, id)).returning();
    if (!deleted) return res.status(404).json({ error: "Profile not found" });
    return res.status(204).end();
  }

  return res.status(405).json({ error: "Method not allowed" });
}
