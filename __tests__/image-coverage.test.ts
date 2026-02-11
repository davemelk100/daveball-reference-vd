import { describe, it, expect } from "vitest";
import { localAlbumImages } from "@/lib/gbv-album-images";
import { gbvAlbums } from "@/lib/gbv-discography-data";
import { revReleaseImages } from "@/lib/rev-discography-data";
import { revDiscography } from "@/lib/rev-discography-data";
import { revArtistImages, revArtists } from "@/lib/rev-artists-data";

describe("GBV image coverage", () => {
  it("covers a reasonable percentage of albums", () => {
    const albumIds = new Set(gbvAlbums.map((a) => a.id));
    const coveredIds = Object.keys(localAlbumImages).map(Number).filter((id) => albumIds.has(id));
    const coverage = coveredIds.length / gbvAlbums.length;
    // Expect at least 50% of albums to have local images
    expect(coverage).toBeGreaterThan(0.5);
  });
});

describe("Rev release image coverage", () => {
  it("has no orphaned release image keys", () => {
    const validCatalogNumbers = new Set(revDiscography.map((r) => r.catalogNumber));
    const imageKeys = Object.keys(revReleaseImages).map(Number);
    const orphans = imageKeys.filter((key) => !validCatalogNumbers.has(key));
    expect(orphans, `Orphaned release image keys: ${orphans.join(", ")}`).toEqual([]);
  });
});

describe("Rev artist image coverage", () => {
  it("has no orphaned artist image keys", () => {
    const validIds = new Set(revArtists.map((a) => a.id));
    const imageKeys = Object.keys(revArtistImages);
    const orphans = imageKeys.filter((key) => !validIds.has(key));
    expect(orphans, `Orphaned artist image keys: ${orphans.join(", ")}`).toEqual([]);
  });
});
