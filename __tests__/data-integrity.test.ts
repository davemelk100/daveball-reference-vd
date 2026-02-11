import { describe, it, expect } from "vitest";
import { gbvAlbums } from "@/lib/gbv-discography-data";
import { gbvMembers } from "@/lib/gbv-members-data";
import { revDiscography } from "@/lib/rev-discography-data";
import { revArtists } from "@/lib/rev-artists-data";
import { amrepReleases } from "@/lib/amrep-releases-data";
import { amrepArtists } from "@/lib/amrep-artists-data";
import {
  GbvAlbumSchema,
  GbvMemberSchema,
  RevReleaseSchema,
  RevArtistSchema,
  AmrepReleaseSchema,
  AmrepArtistSchema,
} from "@/lib/schemas/music-data";

// ─── GBV ───

describe("GBV data integrity", () => {
  it("has non-empty albums array", () => {
    expect(gbvAlbums.length).toBeGreaterThan(0);
  });

  it("validates every album against GbvAlbumSchema", () => {
    for (const album of gbvAlbums) {
      const result = GbvAlbumSchema.safeParse(album);
      expect(result.success, `Album "${album.title}" failed validation: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });

  it("has no duplicate album IDs", () => {
    const ids = gbvAlbums.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has non-empty members array", () => {
    expect(gbvMembers.length).toBeGreaterThan(0);
  });

  it("validates every member against GbvMemberSchema", () => {
    for (const member of gbvMembers) {
      const result = GbvMemberSchema.safeParse(member);
      expect(result.success, `Member "${member.name}" failed validation: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });

  it("has no duplicate member IDs", () => {
    const ids = gbvMembers.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has at least one active member", () => {
    const active = gbvMembers.filter((m) => m.active);
    expect(active.length).toBeGreaterThan(0);
  });
});

// ─── Rev ───

describe("Rev data integrity", () => {
  it("has non-empty releases array", () => {
    expect(revDiscography.length).toBeGreaterThan(0);
  });

  it("validates every release against RevReleaseSchema", () => {
    for (const release of revDiscography) {
      const result = RevReleaseSchema.safeParse(release);
      expect(result.success, `Release "${release.title}" (REV ${release.catalogNumber}) failed validation: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });

  it("has no duplicate catalog numbers", () => {
    const nums = revDiscography.map((r) => r.catalogNumber);
    expect(new Set(nums).size).toBe(nums.length);
  });

  it("has non-empty artists array", () => {
    expect(revArtists.length).toBeGreaterThan(0);
  });

  it("validates every artist against RevArtistSchema", () => {
    for (const artist of revArtists) {
      const result = RevArtistSchema.safeParse(artist);
      expect(result.success, `Artist "${artist.name}" failed validation: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });

  it("has no duplicate artist IDs", () => {
    const ids = revArtists.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ─── AmRep ───

describe("AmRep data integrity", () => {
  it("has non-empty releases array", () => {
    expect(amrepReleases.length).toBeGreaterThan(0);
  });

  it("validates every release against AmrepReleaseSchema", () => {
    for (const release of amrepReleases) {
      const result = AmrepReleaseSchema.safeParse(release);
      expect(result.success, `Release "${release.title}" (id ${release.id}) failed validation: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });

  it("has no duplicate release IDs", () => {
    const ids = amrepReleases.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has non-empty artists array", () => {
    expect(amrepArtists.length).toBeGreaterThan(0);
  });

  it("validates every artist against AmrepArtistSchema", () => {
    for (const artist of amrepArtists) {
      const result = AmrepArtistSchema.safeParse(artist);
      expect(result.success, `Artist "${artist.name}" failed validation: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });

  it("has no duplicate artist IDs", () => {
    const ids = amrepArtists.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
