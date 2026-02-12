"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { E6RemoteImage } from "@/components/e6/e6-remote-image";
import {
  DashboardDailyRow,
  DashboardDescription,
  DashboardDiscographyGrid,
  DashboardMembersGrid,
  DashboardSectionHeader,
} from "@/components/music-site/dashboard-sections";
import { type E6Artist } from "@/lib/e6-artists-data";
import { type E6Release } from "@/lib/e6-discography-data";

const FEATURED_BANDS: (E6Artist & { imageUrl?: string | null })[] = [
  { id: "neutral-milk-hotel", name: "Neutral Milk Hotel", imageUrl: null },
  { id: "the-apples-in-stereo", name: "The Apples in Stereo", imageUrl: null },
  { id: "the-olivia-tremor-control", name: "The Olivia Tremor Control", imageUrl: null },
  { id: "of-montreal", name: "of Montreal", imageUrl: null },
  { id: "elf-power", name: "Elf Power", imageUrl: null },
  { id: "the-music-tapes", name: "The Music Tapes", imageUrl: null },
];

type E6DashboardAlbum = {
  id: number;
  title: string;
  year: number;
  format?: string;
  artist?: string;
  albumTitle?: string;
};

const FEATURED_RELEASE_DATA: E6Release[] = [
  { catalogNumber: 2, artist: "Neutral Milk Hotel", title: "In the Aeroplane Over the Sea", year: 1998 },
  { catalogNumber: 3, artist: "The Olivia Tremor Control", title: "Dusk at Cubist Castle", year: 1996 },
  { catalogNumber: 5, artist: "The Apples in Stereo", title: "Fun Trick Noisemaker", year: 1995 },
  { catalogNumber: 16, artist: "of Montreal", title: "Hissing Fauna, Are You the Destroyer?", year: 2007 },
  { catalogNumber: 18, artist: "Elf Power", title: "When the Red King Comes", year: 1997 },
  { catalogNumber: 22, artist: "The Music Tapes", title: "First Imaginary Symphony for Nomad", year: 1999 },
];

const FEATURED_RELEASES: E6DashboardAlbum[] = FEATURED_RELEASE_DATA.map((r) => ({
  id: r.catalogNumber,
  title: `${r.artist} — ${r.title}`,
  year: r.year,
  format: r.format,
  artist: r.artist,
  albumTitle: r.title,
}));

export function E6DashboardContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const [coverImages, setCoverImages] = useState<Record<number, string>>({});

  useEffect(() => {
    let active = true;
    async function fetchCovers() {
      for (const r of FEATURED_RELEASE_DATA) {
        if (!active) break;
        try {
          const params = new URLSearchParams({
            type: "resolve",
            artist: r.artist,
            title: r.title,
          });
          const res = await fetch(`/api/e6/discogs?${params}`);
          if (!res.ok) continue;
          const data = await res.json();
          const url = data.release?.coverImage;
          if (url && active) {
            setCoverImages((prev) => ({ ...prev, [r.catalogNumber]: url }));
          }
        } catch {
          // skip failed fetches
        }
      }
    }
    fetchCovers();
    return () => { active = false; };
  }, []);

  const getAlbumImage = useCallback(
    (album: E6DashboardAlbum): string | null => coverImages[album.id] ?? null,
    [coverImages],
  );

  return (
    <div className="container py-2">
      <DashboardDescription text={site.description} />

      {/* Daily Trivia + Record of the Day */}
      <DashboardDailyRow>
        <TriviaPanel />
        <RecordOfDayCard
          RemoteImage={E6RemoteImage}
          imageFit="contain"
          placeholderVariant="next-image"
          placeholderClassName="w-full h-auto opacity-30 p-4"
          placeholderSize={200}
        />
      </DashboardDailyRow>

      {/* Artists */}
      <div className="mb-8">
        <DashboardSectionHeader
          title="Featured Artists"
          href={`${site.basePath}/members`}
        />
        <DashboardMembersGrid
          members={FEATURED_BANDS}
          site={site}
          linkBasePath={`${site.basePath}/members`}
          memberAvatarProps={{
            placeholderSize: 200,
            placeholderClassName: "opacity-30 w-full h-auto p-4",
            fallbackClassName: "opacity-30 w-full h-auto p-4",
          }}
        />
      </div>

      {/* Releases */}
      <div className="mb-8">
        <DashboardSectionHeader
          title="Featured Releases"
          href={`${site.basePath}/albums`}
        />
        <DashboardDiscographyGrid
          albums={FEATURED_RELEASES}
          site={site}
          linkBasePath={`${site.basePath}/albums`}
          getAlbumImage={getAlbumImage}
          getReleaseTypeLabel={() => "Album"}
          RemoteImage={E6RemoteImage}
          cacheKeyPrefix="e6-release-thumb"
          imageFit="cover"
          placeholderVariant="next-image"
          placeholderClassName="w-full h-auto opacity-30 p-4"
          placeholderSize={200}
        />
      </div>
    </div>
  );
}
