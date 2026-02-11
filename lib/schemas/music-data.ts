import { z } from "zod";

// ─── Base contracts: what shared components require ───

export const BaseReleaseSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  year: z.number(),
  format: z.union([z.string(), z.array(z.string())]).optional(),
  releaseType: z.string().optional(),
});

export const BaseMemberSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string().min(1),
});

// ─── Site-specific schemas ───

// GBV
export const GbvAlbumSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  year: z.number(),
  releaseType: z.enum(["album", "ep", "single"]).optional(),
});

export const GbvMemberSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  active: z.boolean(),
});

// Revelation
export const RevReleaseSchema = z.object({
  catalogNumber: z.number(),
  artist: z.string().min(1),
  title: z.string().min(1),
  year: z.number(),
  format: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const RevArtistSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  genre: z.string().optional(),
  yearsActive: z.string().optional(),
  notableReleases: z.array(z.string()).optional(),
  wikipediaUrl: z.string().optional(),
});

// AmRep
export const AmrepReleaseSchema = z.object({
  id: z.number(),
  catalogNo: z.string().optional(),
  title: z.string().min(1),
  artist: z.string().min(1),
  year: z.number().nullable().optional(),
  format: z.string().nullable().optional(),
  section: z.enum(["US", "Singles"]).optional(),
  highlight: z.string().optional(),
});

export const AmrepArtistSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  description: z.string().optional(),
});

// ─── Inferred types ───

export type NormalizedRelease = z.infer<typeof BaseReleaseSchema>;
export type NormalizedMember = z.infer<typeof BaseMemberSchema>;
