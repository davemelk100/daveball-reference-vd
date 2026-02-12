"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { getReleaseType } from "@/lib/gbv-utils";
import { AmrepRemoteImage } from "@/components/amrep/amrep-remote-image";
import {
  AMREP_MEMBER_IMAGE_FALLBACKS,
  AMREP_MEMBER_IMAGE_SKIP,
} from "@/lib/amrep-member-images";
import {
  DashboardDailyRow,
  DashboardDescription,
  DashboardDiscographyGrid,
  DashboardMembersGrid,
  DashboardSectionHeader,
} from "@/components/music-site/dashboard-sections";
import { useDashboardData } from "@/components/music-site/use-dashboard-data";

export function AmrepDashboardContent() {
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
      <DashboardDescription text={site.description} />

      {/* Daily Trivia + Record of the Day */}
      <DashboardDailyRow>
        <TriviaPanel />
        <RecordOfDayCard
          RemoteImage={AmrepRemoteImage}
          imageFit="contain"
          placeholderVariant="img"
          placeholderClassName="w-full h-auto opacity-30 p-4"
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
          memberAvatarProps={{
            fallbackImages: AMREP_MEMBER_IMAGE_FALLBACKS,
            skipImages: AMREP_MEMBER_IMAGE_SKIP,
            fit: "contain",
            placeholderSize: 200,
            placeholderClassName: "opacity-30 w-full h-auto p-4",
            fallbackClassName: "opacity-30 w-full h-auto p-4",
          }}
        />
      </div>

      {/* Discography */}
      <div className="mb-8">
        <DashboardSectionHeader
          title="Featured Releases"
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
          RemoteImage={AmrepRemoteImage}
          cacheKeyPrefix="gbv-album-thumb"
          imageFit="contain"
          placeholderVariant="img"
          placeholderClassName="w-full h-auto opacity-30 p-4"
          placeholderSize={200}
        />
      </div>

    </div>
  );
}
