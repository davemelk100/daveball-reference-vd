"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { RevRemoteImage } from "@/components/rev/rev-remote-image";
import {
  DashboardDailyRow,
  DashboardDescription,
  DashboardDiscographyGrid,
  DashboardMembersGrid,
  DashboardSectionHeader,
} from "@/components/music-site/dashboard-sections";
import { getRevArtistImageUrl, type RevArtist } from "@/lib/rev-artists-data";
import { type RevRelease } from "@/lib/rev-discography-data";

const FEATURED_BANDS: (RevArtist & { imageUrl?: string | null })[] = [
  { id: "youth-of-today", name: "Youth of Today" },
  { id: "gorilla-biscuits", name: "Gorilla Biscuits" },
  { id: "shelter", name: "Shelter" },
  { id: "quicksand", name: "Quicksand" },
  { id: "sick-of-it-all", name: "Sick of It All" },
  { id: "bold", name: "Bold" },
].map((band) => ({
  ...band,
  imageUrl: getRevArtistImageUrl(band.id) ?? null,
}));

type RevDashboardAlbum = {
  id: number;
  title: string;
  year: number;
  format?: string;
};

const FEATURED_RELEASE_DATA: RevRelease[] = [
  { catalogNumber: 1, artist: "Warzone", title: "Lower East Side Crew", year: 1987 },
  { catalogNumber: 8, artist: "Youth of Today", title: "Break Down the Walls", year: 1986 },
  { catalogNumber: 12, artist: "Gorilla Biscuits", title: "Start Today", year: 1989 },
  { catalogNumber: 15, artist: "Judge", title: "Bringin' It Down", year: 1989 },
  { catalogNumber: 16, artist: "Shelter", title: "Perfection of Desire", year: 1990 },
  { catalogNumber: 18, artist: "Quicksand", title: "Quicksand", year: 1990 },
];

const FEATURED_RELEASES: RevDashboardAlbum[] = FEATURED_RELEASE_DATA.map((r) => ({
  id: r.catalogNumber,
  title: `${r.artist} — ${r.title}`,
  year: r.year,
  format: r.format,
}));

export function RevDashboardContent() {
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
          const res = await fetch(`/api/rev/discogs?${params}`);
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
    (album: RevDashboardAlbum): string | null => coverImages[album.id] ?? null,
    [coverImages],
  );

  return (
    <div className="container py-2">
      <DashboardDescription text={site.description} />

      {/* Daily Trivia + Record of the Day */}
      <DashboardDailyRow>
        <TriviaPanel />
        <RecordOfDayCard
          RemoteImage={RevRemoteImage}
          imageFit="contain"
          placeholderVariant="next-image"
          placeholderClassName="w-1/2 h-1/2 object-contain"
          placeholderSize={32}
        />
      </DashboardDailyRow>

      {/* Bands */}
      <div className="mb-8">
        <DashboardSectionHeader
          title="Featured Bands"
          href={`${site.basePath}/members`}
        />
        <DashboardMembersGrid
          members={FEATURED_BANDS}
          site={site}
          linkBasePath={`${site.basePath}/members`}
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
          RemoteImage={RevRemoteImage}
          cacheKeyPrefix="rev-release-thumb"
          imageFit="cover"
          placeholderVariant="next-image"
          placeholderClassName="w-1/2 h-1/2 object-contain"
          placeholderSize={32}
        />
      </div>
    </div>
  );
}
