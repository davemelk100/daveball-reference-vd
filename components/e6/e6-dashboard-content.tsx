"use client";

import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { E6RemoteImage } from "@/components/e6/e6-remote-image";
import {
  DashboardDailyRow,
  DashboardDiscographyGrid,
  DashboardMembersGrid,
  DashboardSectionHeader,
} from "@/components/music-site/dashboard-sections";
import { getE6ArtistImageUrl, type E6Artist } from "@/lib/e6-artists-data";
import { getE6ReleaseImageUrl, type E6Release } from "@/lib/e6-discography-data";

const FEATURED_BANDS: (E6Artist & { imageUrl?: string | null })[] = [
  { id: "neutral-milk-hotel", name: "Neutral Milk Hotel" },
  { id: "the-apples-in-stereo", name: "The Apples in Stereo" },
  { id: "the-olivia-tremor-control", name: "The Olivia Tremor Control" },
  { id: "of-montreal", name: "of Montreal" },
  { id: "elf-power", name: "Elf Power" },
  { id: "the-music-tapes", name: "The Music Tapes" },
].map((band) => ({
  ...band,
  imageUrl: getE6ArtistImageUrl(band.id) ?? null,
}));

type E6DashboardAlbum = {
  id: number;
  title: string;
  year: number;
  format?: string;
};

const FEATURED_RELEASES: E6DashboardAlbum[] = [
  { catalogNumber: 2, artist: "Neutral Milk Hotel", title: "In the Aeroplane Over the Sea", year: 1998 },
  { catalogNumber: 3, artist: "The Olivia Tremor Control", title: "Dusk at Cubist Castle", year: 1996 },
  { catalogNumber: 5, artist: "The Apples in Stereo", title: "Fun Trick Noisemaker", year: 1995 },
  { catalogNumber: 16, artist: "of Montreal", title: "Hissing Fauna, Are You the Destroyer?", year: 2007 },
  { catalogNumber: 18, artist: "Elf Power", title: "When the Red King Comes", year: 1997 },
  { catalogNumber: 22, artist: "The Music Tapes", title: "First Imaginary Symphony for Nomad", year: 1999 },
].map((r: E6Release) => ({
  id: r.catalogNumber,
  title: `${r.artist} — ${r.title}`,
  year: r.year,
  format: r.format,
}));

function getE6DashboardAlbumImage(album: E6DashboardAlbum): string | null {
  return getE6ReleaseImageUrl(album.id) ?? null;
}

export function E6DashboardContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-2">
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
          title="Artists"
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
          getAlbumImage={getE6DashboardAlbumImage}
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
