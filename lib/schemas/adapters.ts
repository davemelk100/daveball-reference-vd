import type { GbvAlbum } from "@/lib/gbv-discography-data";
import type { GbvMember } from "@/lib/gbv-members-data";
import type { RevRelease } from "@/lib/rev-discography-data";
import type { RevArtist } from "@/lib/rev-artists-data";
import type { AmrepRelease } from "@/lib/amrep-releases-data";
import type { AmrepArtist } from "@/lib/amrep-artists-data";
import type { NormalizedRelease, NormalizedMember } from "./music-data";

// ─── GBV adapters ───

export function normalizeGbvAlbum(album: GbvAlbum): NormalizedRelease {
  return {
    id: album.id,
    title: album.title,
    year: album.year,
  };
}

export function normalizeGbvMember(member: GbvMember): NormalizedMember {
  return {
    id: member.id,
    name: member.name,
  };
}

// ─── Rev adapters ───

export function normalizeRevRelease(release: RevRelease): NormalizedRelease {
  return {
    id: release.catalogNumber,
    title: `${release.artist} — ${release.title}`,
    year: release.year,
    format: release.format,
  };
}

export function normalizeRevArtist(artist: RevArtist): NormalizedMember {
  return {
    id: artist.id,
    name: artist.name,
  };
}

// ─── AmRep adapters ───

export function normalizeAmrepRelease(release: AmrepRelease): NormalizedRelease {
  return {
    id: release.id,
    title: `${release.artist} — ${release.title}`,
    year: release.year ?? 0,
    format: release.format ?? undefined,
  };
}

export function normalizeAmrepArtist(artist: AmrepArtist): NormalizedMember {
  return {
    id: artist.id,
    name: artist.name,
  };
}
