"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { SgRemoteImage } from "@/components/sg/sg-remote-image";
import { sgArtists, sgArtistImages } from "@/lib/sg-artists-data";
import { sgDiscography, sgReleaseImages } from "@/lib/sg-discography-data";
import {
  DashboardDailyRow,
  DashboardDescription,
  DashboardDiscographyGrid,
  DashboardMembersGrid,
  DashboardSectionHeader,
} from "@/components/music-site/dashboard-sections";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

export function SgDashboardContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  const members = sgArtists.map((artist) => ({
    id: artist.id,
    name: artist.name,
    active: true,
    imageUrl: sgArtistImages[artist.id] ?? null,
  }));

  // Cycle through 5 different artists each day
  const memberLimit = 5;
  const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const offset = (daysSinceEpoch * memberLimit) % members.length;
  const membersToShow = [];
  for (let i = 0; i < memberLimit; i++) {
    membersToShow.push(members[(offset + i) % members.length]);
  }

  const albums = sgDiscography.map((release) => ({
    id: release.catalogNumber,
    title: `${release.artist} — ${release.title}`,
    year: release.year,
    format: release.format,
  }));

  const getAlbumImage = (album: (typeof albums)[number]): string | null => {
    return sgReleaseImages[album.id] ?? null;
  };

  return (
    <div className="container py-2">
      <DashboardDescription text={site.description} />

      <DashboardDailyRow>
        <TriviaPanel />
        <RecordOfDayCard
          RemoteImage={SgRemoteImage}
          imageFit="contain"
          placeholderVariant="img"
          placeholderClassName="w-3/5 h-auto opacity-20 object-contain"
        />
      </DashboardDailyRow>

      <div className="mb-8">
        <DashboardSectionHeader
          title="Featured Artists"
          href={`${site.basePath}/members`}
        />
        <DashboardMembersGrid
          members={membersToShow}
          site={site}
          linkBasePath={`${site.basePath}/members`}
          memberAvatarProps={{
            fit: "contain",
            placeholderSize: 200,
            placeholderClassName: "w-3/5 h-auto opacity-20 object-contain",
            fallbackClassName: "w-3/5 h-auto opacity-20 object-contain",
          }}
        />
      </div>

      <div className="mb-8">
        <DashboardSectionHeader
          title="Featured Releases"
          href={`${site.basePath}/albums`}
        />
        <DashboardDiscographyGrid
          albums={albums.slice(0, 5)}
          site={site}
          linkBasePath={`${site.basePath}/albums`}
          getAlbumImage={getAlbumImage}
          getReleaseTypeLabel={(album) => album.format || "Release"}
          RemoteImage={SgRemoteImage}
          cacheKeyPrefix="sg-album-thumb"
          imageFit="contain"
          placeholderVariant="img"
          placeholderClassName="w-3/5 h-auto opacity-20 object-contain"
          placeholderSize={200}
        />
      </div>
    </div>
  );
}
