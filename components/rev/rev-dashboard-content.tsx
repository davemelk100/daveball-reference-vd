"use client";

import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { RevRemoteImage } from "@/components/rev/rev-remote-image";
import {
  DashboardDailyRow,
  DashboardDiscographyGrid,
  DashboardMembersGrid,
  DashboardSectionHeader,
} from "@/components/music-site/dashboard-sections";
import { getRevArtistImageUrl, type RevArtist } from "@/lib/rev-artists-data";
import { getRevReleaseImageUrl, type RevRelease } from "@/lib/rev-discography-data";

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

const FEATURED_RELEASES: RevDashboardAlbum[] = [
  { catalogNumber: 1, artist: "Warzone", title: "Lower East Side Crew", year: 1987 },
  { catalogNumber: 8, artist: "Youth of Today", title: "Break Down the Walls", year: 1986 },
  { catalogNumber: 12, artist: "Gorilla Biscuits", title: "Start Today", year: 1989 },
  { catalogNumber: 15, artist: "Judge", title: "Bringin' It Down", year: 1989 },
  { catalogNumber: 16, artist: "Shelter", title: "Perfection of Desire", year: 1990 },
  { catalogNumber: 18, artist: "Quicksand", title: "Quicksand", year: 1990 },
].map((r: RevRelease) => ({
  id: r.catalogNumber,
  title: `${r.artist} — ${r.title}`,
  year: r.year,
  format: r.format,
}));

function getRevDashboardAlbumImage(album: RevDashboardAlbum): string | null {
  return getRevReleaseImageUrl(album.id) ?? null;
}

export function RevDashboardContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-2">
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
          title="Bands"
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
          title="Releases"
          href={`${site.basePath}/albums`}
        />
        <DashboardDiscographyGrid
          albums={FEATURED_RELEASES}
          site={site}
          linkBasePath={`${site.basePath}/albums`}
          getAlbumImage={getRevDashboardAlbumImage}
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
