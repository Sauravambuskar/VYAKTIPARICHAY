import { pgTable, text, serial, boolean, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const profilesTable = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  tagline: text("tagline").notNull(),
  bio: text("bio"),
  location: text("location"),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  avatarUrl: text("avatar_url"),
  coverImageUrl: text("cover_image_url"),
  achievements: jsonb("achievements").$type<string[]>().default([]).notNull(),
  awards: jsonb("awards").$type<string[]>().default([]).notNull(),
  galleryUrls: jsonb("gallery_urls").$type<string[]>().default([]).notNull(),
  socialLinks: jsonb("social_links").$type<{
    linkedin?: string | null;
    twitter?: string | null;
    instagram?: string | null;
    facebook?: string | null;
    youtube?: string | null;
  }>().default({}).notNull(),
  featured: boolean("featured").default(false).notNull(),
  verified: boolean("verified").default(false).notNull(),
  yearsOfExperience: integer("years_of_experience"),
  organization: text("organization"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contactMessagesTable = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProfileSchema = createInsertSchema(profilesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profilesTable.$inferSelect;

export const insertContactMessageSchema = createInsertSchema(contactMessagesTable).omit({ id: true, createdAt: true });
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessagesTable.$inferSelect;
