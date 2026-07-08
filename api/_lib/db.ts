import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, text, serial, boolean, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);

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

export type Profile = typeof profilesTable.$inferSelect;

export function serializeProfile(p: Profile) {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    tagline: p.tagline,
    bio: p.bio,
    location: p.location,
    phone: p.phone,
    email: p.email,
    website: p.website,
    avatarUrl: p.avatarUrl,
    coverImageUrl: p.coverImageUrl,
    achievements: p.achievements ?? [],
    awards: p.awards ?? [],
    galleryUrls: p.galleryUrls ?? [],
    socialLinks: p.socialLinks ?? {},
    featured: p.featured,
    verified: p.verified,
    yearsOfExperience: p.yearsOfExperience,
    organization: p.organization,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt?.toISOString() ?? null,
  };
}
