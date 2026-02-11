import { describe, it, expect } from "vitest";
import { gbvAlbums } from "@/lib/gbv-discography-data";
import { gbvMembers } from "@/lib/gbv-members-data";
import { revDiscography } from "@/lib/rev-discography-data";
import { revArtists } from "@/lib/rev-artists-data";
import { amrepReleases } from "@/lib/amrep-releases-data";
import { amrepArtists } from "@/lib/amrep-artists-data";
import { BaseReleaseSchema, BaseMemberSchema } from "@/lib/schemas/music-data";
import {
  normalizeGbvAlbum,
  normalizeGbvMember,
  normalizeRevRelease,
  normalizeRevArtist,
  normalizeAmrepRelease,
  normalizeAmrepArtist,
} from "@/lib/schemas/adapters";

describe("GBV adapters", () => {
  it("normalizes every album to BaseReleaseSchema", () => {
    for (const album of gbvAlbums) {
      const normalized = normalizeGbvAlbum(album);
      const result = BaseReleaseSchema.safeParse(normalized);
      expect(result.success, `Album "${album.title}" normalization failed: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });

  it("normalizes every member to BaseMemberSchema", () => {
    for (const member of gbvMembers) {
      const normalized = normalizeGbvMember(member);
      const result = BaseMemberSchema.safeParse(normalized);
      expect(result.success, `Member "${member.name}" normalization failed: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });
});

describe("Rev adapters", () => {
  it("normalizes every release to BaseReleaseSchema", () => {
    for (const release of revDiscography) {
      const normalized = normalizeRevRelease(release);
      const result = BaseReleaseSchema.safeParse(normalized);
      expect(result.success, `Release "${release.title}" normalization failed: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });

  it("normalizes every artist to BaseMemberSchema", () => {
    for (const artist of revArtists) {
      const normalized = normalizeRevArtist(artist);
      const result = BaseMemberSchema.safeParse(normalized);
      expect(result.success, `Artist "${artist.name}" normalization failed: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });
});

describe("AmRep adapters", () => {
  it("normalizes every release to BaseReleaseSchema", () => {
    for (const release of amrepReleases) {
      const normalized = normalizeAmrepRelease(release);
      const result = BaseReleaseSchema.safeParse(normalized);
      expect(result.success, `Release "${release.title}" normalization failed: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });

  it("normalizes every artist to BaseMemberSchema", () => {
    for (const artist of amrepArtists) {
      const normalized = normalizeAmrepArtist(artist);
      const result = BaseMemberSchema.safeParse(normalized);
      expect(result.success, `Artist "${artist.name}" normalization failed: ${JSON.stringify(result.error?.issues)}`).toBe(true);
    }
  });
});
