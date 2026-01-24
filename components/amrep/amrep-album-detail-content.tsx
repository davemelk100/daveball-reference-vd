"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2, ExternalLink } from "lucide-react";
import { GbvRemoteImage } from "@/components/amrep/amrep-remote-image";
import { getLocalAlbumImage } from "@/lib/gbv-album-images";
import { getProxiedImageUrl, getReleaseType } from "@/lib/gbv-utils";
import {
  useSiteAlbumDetail,
  type AmrepAlbumDetail,
} from "@/components/music-site/use-site-album-detail";
import { AlbumDetailLayout } from "@/components/music-site/album-detail-layout";
import { AlbumDetailTracklist } from "@/components/music-site/album-detail-tracklist";
import { AlbumDetailLeft } from "@/components/music-site/album-detail-left";

export function GbvAlbumDetailContent({ albumId }: { albumId: string }) {
  const { site, isAmrep, album, isLoading, error } = useSiteAlbumDetail(albumId);
  const detail = album as AmrepAlbumDetail | null;

  const albumImage = useMemo(() => {
    if (!detail) return null;
    return isAmrep && detail.thumb
      ? getProxiedImageUrl(detail.thumb)
      : getLocalAlbumImage(detail.id) || getProxiedImageUrl(detail.thumb);
  }, [detail?.id, detail?.thumb, isAmrep]);

  const displayTitle = useMemo(() => {
    if (!detail) return "";
    return isAmrep && detail.artists && detail.artists.length > 0
      ? `${detail.artists.map((artist) => artist.name).join(", ")} — ${detail.title}`
      : detail.title;
  }, [detail?.artists, detail?.title, isAmrep]);

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Loading album...</p>
        </div>
      </div>
    );
  }

  if (error || !album) {
    return (
      <AlbumDetailLayout
        site={site}
        backHref={`${site.basePath}/albums`}
        backLabel={site.navLabels.discography}
        leftContent={
          <div className="w-full aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
            <img
              src={site.placeholderIconSrc}
              alt={`${site.shortName} logo`}
              className="w-auto h-auto max-w-1/2 max-h-1/2 gbv-nav-icon object-contain"
            />
          </div>
        }
        rightTitle="Tracklist"
        rightContent={
          <p className="text-sm text-muted-foreground">
            {error || "Album not found"}
          </p>
        }
      />
    );
  }

  if (!detail) {
    return null;
  }

  const leftContent = (
    <AlbumDetailLeft
      image={
        albumImage ? (
          <GbvRemoteImage
            src={albumImage}
            alt={detail.title}
            width={300}
            height={300}
            className="w-full aspect-square rounded-lg object-contain"
            cacheKey={`gbv-album-thumb:${detail.id}`}
            preferProxy
          />
        ) : (
          <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
            <img
              src={site.placeholderIconSrc}
              alt={`${site.shortName} logo`}
              className="w-auto h-auto max-w-1/2 max-h-1/2 gbv-nav-icon object-contain"
            />
          </div>
        )
      }
      title={displayTitle}
      badges={[
        ...(detail.year ? [{ label: String(detail.year), variant: "outline" as const }] : []),
        {
          label: getReleaseType(detail.format, detail.releaseType),
          variant: "outline" as const,
        },
        ...(detail.styles?.map((style) => ({
          label: style,
          variant: "secondary" as const,
        })) ?? []),
      ]}
      meta={[
        ...(detail.labels && detail.labels.length > 0
          ? [
              {
                label: "Label",
                value: detail.labels.map((label) => label.name).join(", "),
              },
            ]
          : []),
        ...(detail.artists && detail.artists.length > 0
          ? [
              {
                label: "Artist",
                value: detail.artists.map((artist) => artist.name).join(", "),
              },
            ]
          : []),
      ]}
      linkHref={!isAmrep ? `https://www.discogs.com/release/${detail.id}` : null}
      linkLabel={!isAmrep ? "View on Discogs" : null}
      linkClassName="inline-flex items-center text-sm text-primary hover:underline mt-2"
    />
  );

  const rightContent = (
    <AlbumDetailTracklist
      tracks={detail.tracklist}
      variant="amrep"
      emptyLabel="Tracklist not available."
    />
  );

  return (
    <AlbumDetailLayout
      site={site}
      backHref={`${site.basePath}/albums`}
      backLabel={site.navLabels.discography}
      leftContent={leftContent}
      rightTitle="Tracklist"
      rightContent={rightContent}
    />
  );
}
