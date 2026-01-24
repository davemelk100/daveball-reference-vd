"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { getReleaseType } from "@/lib/gbv-utils";
import { GbvRemoteImage } from "@/components/gbv/gbv-remote-image";
import {
  DashboardDailyRow,
  DashboardDiscographyGrid,
  DashboardMembersGrid,
  DashboardSectionHeader,
} from "@/components/music-site/dashboard-sections";
import { useDashboardData } from "@/components/music-site/use-dashboard-data";

const MEMBER_IMAGE_FALLBACKS: Record<string, string> = {
  "mark shue":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FSpecial%3AFilePath%2FMark%2520Shue%2520GARP%2520music%2520festival%25202016.jpg",
};

export function GbvDashboardContent() {
  const {
    site,
    isAmrep,
    isLoading,
    error,
    membersToShow,
    albumsToShow,
    getAlbumImage,
  } = useDashboardData();

  if (isLoading) {
    return (
      <div className="container py-2">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Loading {site.shortName} data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-2">
      {/* Daily Trivia + Record of the Day */}
      <DashboardDailyRow>
        <TriviaPanel />
        <RecordOfDayCard
          RemoteImage={GbvRemoteImage}
          imageFit="contain"
          placeholderVariant="next-image"
          placeholderClassName="w-1/2 h-1/2 gbv-nav-icon object-contain"
          placeholderSize={32}
        />
      </DashboardDailyRow>

      {/* Error Message */}
      {error && (
        <Card className="mb-8 border-destructive">
          <CardContent className="p-4 text-destructive">{error}</CardContent>
        </Card>
      )}

      {/* Band Members */}
      <div className="mb-8">
        <DashboardSectionHeader
          title={isAmrep ? "Featured Artists" : "Current Members"}
          href={`${site.basePath}/members`}
        />
        <DashboardMembersGrid
          members={membersToShow}
          site={site}
          linkBasePath={`${site.basePath}/members`}
          memberAvatarProps={{ fallbackImages: MEMBER_IMAGE_FALLBACKS }}
        />
      </div>

      {/* Discography */}
      <div className="mb-8">
        <DashboardSectionHeader
          title={site.navLabels.discography}
          href={`${site.basePath}/albums`}
        />
        <DashboardDiscographyGrid
          albums={albumsToShow}
          site={site}
          linkBasePath={`${site.basePath}/albums`}
          getAlbumImage={getAlbumImage}
          getReleaseTypeLabel={(album) =>
            getReleaseType(album.format, album.releaseType)
          }
          RemoteImage={GbvRemoteImage}
          cacheKeyPrefix="gbv-album-thumb"
          imageFit="cover"
          placeholderVariant="next-image"
          placeholderClassName="w-1/2 h-1/2 gbv-nav-icon object-contain"
          placeholderSize={24}
        />
      </div>
    </div>
  );
}
