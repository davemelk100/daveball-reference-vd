"use client";

import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { GbvRemoteImage } from "@/components/gbv/gbv-remote-image";
import { getLocalAlbumImage } from "@/lib/gbv-album-images";
import {
  useSiteAlbumDetail,
  type GbvAlbumDetail,
} from "@/components/music-site/use-site-album-detail";
import { AlbumDetailLayout } from "@/components/music-site/album-detail-layout";
import { AlbumDetailTracklist } from "@/components/music-site/album-detail-tracklist";
import { AlbumDetailLeft } from "@/components/music-site/album-detail-left";

export function GbvAlbumDetailContent({ albumId }: { albumId: string }) {
  const { site, album, isLoading, error } = useSiteAlbumDetail(albumId);
  const detail = album as GbvAlbumDetail | null;

  // Use MusicBrainz cover art, fallback to Discogs images (which may be empty without auth)
  const displayImage = useMemo(
    () =>
      getLocalAlbumImage(Number(albumId)) ||
      detail?.images?.find((img) => img.type === "primary")?.uri ||
      detail?.images?.[0]?.uri ||
      null,
    [albumId, detail?.images],
  );

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
            <Image
              src="/chat-gbv-box.svg"
              alt="GBV rune"
              width={48}
              height={48}
              className="w-1/2 h-1/2 gbv-nav-icon object-contain"
            />
          </div>
        }
        rightTitle="Tracklist"
        rightContent={
          <p className="text-muted-foreground">{error || "Album not found"}</p>
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
        displayImage ? (
          <GbvRemoteImage
            src={displayImage}
            alt={detail.title}
            width={500}
            height={500}
            className="w-full aspect-square rounded-lg object-cover"
            loading="eager"
            cacheKey={`gbv-album-cover:${albumId}`}
            preferProxy
          />
        ) : (
          <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
            <Image
              src="/chat-gbv-box.svg"
              alt="GBV rune"
              width={48}
              height={48}
              className="w-1/2 h-1/2 gbv-nav-icon object-contain"
            />
          </div>
        )
      }
      title={detail.title}
      subtitle={detail.year ? String(detail.year) : null}
      badges={[
        ...(detail.genres?.map((genre) => ({
          label: genre,
          variant: "secondary" as const,
        })) ?? []),
        ...(detail.styles?.map((style) => ({
          label: style,
          variant: "outline" as const,
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
        ...(detail.formats && detail.formats.length > 0
          ? [
              {
                label: "Format",
                value: detail.formats.map((format) => format.name).join(", "),
              },
            ]
          : []),
      ]}
      linkHref={
        detail.uri
          ? detail.uri.startsWith("http")
            ? detail.uri
            : `https://www.discogs.com${detail.uri}`
          : null
      }
      linkLabel={detail.uri ? "View on Discogs" : null}
    />
  );

  const rightContent = (
    <AlbumDetailTracklist
      tracks={detail.tracklist}
      variant="gbv"
      emptyLabel="No tracklist available"
    />
  );

  return (
    <AlbumDetailLayout
      site={site}
      backHref={`${site.basePath}/albums`}
      backLabel={site.navLabels.discography}
      leftContent={leftContent}
      rightTitle={`Tracklist (${detail.tracklist?.length || 0} tracks)`}
      rightContent={rightContent}
    />
  );
}
