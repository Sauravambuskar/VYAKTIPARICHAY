import { Router, type IRouter } from "express";
import { eq, ilike, and, desc, sql, or } from "drizzle-orm";
import { db, profilesTable, contactMessagesTable } from "@workspace/db";
import {
  ListProfilesQueryParams,
  CreateProfileBody,
  GetFeaturedProfilesQueryParams,
  GetProfileParams,
  UpdateProfileParams,
  UpdateProfileBody,
  DeleteProfileParams,
  SubmitContactBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

// GET /profiles
router.get("/profiles", async (req, res): Promise<void> => {
  const parsed = ListProfilesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { category, search, featured, page = 1, limit = 12 } = parsed.data;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (category) conditions.push(eq(profilesTable.category, category));
  if (featured !== undefined) conditions.push(eq(profilesTable.featured, featured));
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
    db
      .select()
      .from(profilesTable)
      .where(where)
      .orderBy(desc(profilesTable.featured), desc(profilesTable.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(profilesTable)
      .where(where),
  ]);

  res.json({
    profiles: profiles.map(serializeProfile),
    total: countResult[0]?.count ?? 0,
    page,
    limit,
  });
});

// POST /profiles
router.post("/profiles", async (req, res): Promise<void> => {
  const parsed = CreateProfileBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [profile] = await db
    .insert(profilesTable)
    .values({
      name: parsed.data.name,
      category: parsed.data.category,
      tagline: parsed.data.tagline,
      bio: parsed.data.bio ?? null,
      location: parsed.data.location ?? null,
      phone: parsed.data.phone ?? null,
      email: parsed.data.email ?? null,
      website: parsed.data.website ?? null,
      avatarUrl: parsed.data.avatarUrl ?? null,
      coverImageUrl: parsed.data.coverImageUrl ?? null,
      achievements: parsed.data.achievements ?? [],
      awards: parsed.data.awards ?? [],
      galleryUrls: parsed.data.galleryUrls ?? [],
      socialLinks: parsed.data.socialLinks ?? {},
      yearsOfExperience: parsed.data.yearsOfExperience ?? null,
      organization: parsed.data.organization ?? null,
      featured: false,
      verified: false,
    })
    .returning();

  res.status(201).json(serializeProfile(profile));
});

// GET /profiles/featured
router.get("/profiles/featured", async (req, res): Promise<void> => {
  const parsed = GetFeaturedProfilesQueryParams.safeParse(req.query);
  const limit = parsed.success ? (parsed.data.limit ?? 6) : 6;

  const profiles = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.featured, true))
    .orderBy(desc(profilesTable.createdAt))
    .limit(limit);

  res.json(profiles.map(serializeProfile));
});

// GET /profiles/stats
router.get("/profiles/stats", async (_req, res): Promise<void> => {
  const [totalResult, featuredResult, verifiedResult, categoryResult] = await Promise.all([
    db.select({ count: sql<number>`cast(count(*) as int)` }).from(profilesTable),
    db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(profilesTable)
      .where(eq(profilesTable.featured, true)),
    db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(profilesTable)
      .where(eq(profilesTable.verified, true)),
    db
      .select({
        category: profilesTable.category,
        count: sql<number>`cast(count(*) as int)`,
      })
      .from(profilesTable)
      .groupBy(profilesTable.category)
      .orderBy(desc(sql`count(*)`)),
  ]);

  res.json({
    totalProfiles: totalResult[0]?.count ?? 0,
    featuredProfiles: featuredResult[0]?.count ?? 0,
    verifiedProfiles: verifiedResult[0]?.count ?? 0,
    categoriesCount: categoryResult.length,
    categoryBreakdown: categoryResult,
  });
});

// GET /profiles/categories
router.get("/profiles/categories", async (_req, res): Promise<void> => {
  const categories = await db
    .select({
      category: profilesTable.category,
      count: sql<number>`cast(count(*) as int)`,
    })
    .from(profilesTable)
    .groupBy(profilesTable.category)
    .orderBy(desc(sql`count(*)`));

  res.json(categories);
});

// GET /profiles/:id
router.get("/profiles/:id", async (req, res): Promise<void> => {
  const params = GetProfileParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [profile] = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.id, params.data.id));

  if (!profile) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  res.json(serializeProfile(profile));
});

// PATCH /profiles/:id
router.patch("/profiles/:id", async (req, res): Promise<void> => {
  const params = UpdateProfileParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateProfileBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updateData: Partial<typeof profilesTable.$inferInsert> = {
    updatedAt: new Date(),
  };

  if (parsed.data.name !== undefined) updateData.name = parsed.data.name;
  if (parsed.data.category !== undefined) updateData.category = parsed.data.category;
  if (parsed.data.tagline !== undefined) updateData.tagline = parsed.data.tagline;
  if (parsed.data.bio !== undefined) updateData.bio = parsed.data.bio ?? null;
  if (parsed.data.location !== undefined) updateData.location = parsed.data.location ?? null;
  if (parsed.data.phone !== undefined) updateData.phone = parsed.data.phone ?? null;
  if (parsed.data.email !== undefined) updateData.email = parsed.data.email ?? null;
  if (parsed.data.website !== undefined) updateData.website = parsed.data.website ?? null;
  if (parsed.data.avatarUrl !== undefined) updateData.avatarUrl = parsed.data.avatarUrl ?? null;
  if (parsed.data.coverImageUrl !== undefined) updateData.coverImageUrl = parsed.data.coverImageUrl ?? null;
  if (parsed.data.achievements !== undefined) updateData.achievements = parsed.data.achievements ?? [];
  if (parsed.data.awards !== undefined) updateData.awards = parsed.data.awards ?? [];
  if (parsed.data.galleryUrls !== undefined) updateData.galleryUrls = parsed.data.galleryUrls ?? [];
  if (parsed.data.socialLinks !== undefined) updateData.socialLinks = parsed.data.socialLinks ?? {};
  if (parsed.data.featured !== undefined) updateData.featured = parsed.data.featured;
  if (parsed.data.verified !== undefined) updateData.verified = parsed.data.verified;
  if (parsed.data.yearsOfExperience !== undefined) updateData.yearsOfExperience = parsed.data.yearsOfExperience ?? null;
  if (parsed.data.organization !== undefined) updateData.organization = parsed.data.organization ?? null;

  const [profile] = await db
    .update(profilesTable)
    .set(updateData)
    .where(eq(profilesTable.id, params.data.id))
    .returning();

  if (!profile) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  res.json(serializeProfile(profile));
});

// DELETE /profiles/:id
router.delete("/profiles/:id", async (req, res): Promise<void> => {
  const params = DeleteProfileParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(profilesTable)
    .where(eq(profilesTable.id, params.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  res.sendStatus(204);
});

// POST /contact
router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [message] = await db
    .insert(contactMessagesTable)
    .values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      subject: parsed.data.subject ?? null,
      message: parsed.data.message,
    })
    .returning();

  res.status(201).json({
    id: message.id,
    name: message.name,
    email: message.email,
    phone: message.phone,
    subject: message.subject,
    message: message.message,
    createdAt: message.createdAt.toISOString(),
  });
});

function serializeProfile(p: typeof profilesTable.$inferSelect) {
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

export default router;
