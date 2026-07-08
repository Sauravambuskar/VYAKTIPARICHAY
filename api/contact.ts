import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db, contactMessagesTable } from "./_lib/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, phone, subject, message } = req.body ?? {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are required" });
  }

  const [record] = await db.insert(contactMessagesTable).values({
    name, email,
    phone: phone ?? null,
    subject: subject ?? null,
    message,
  }).returning();

  return res.status(201).json({
    id: record.id,
    name: record.name,
    email: record.email,
    phone: record.phone,
    subject: record.subject,
    message: record.message,
    createdAt: record.createdAt.toISOString(),
  });
}
