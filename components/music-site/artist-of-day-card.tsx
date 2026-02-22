"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { MusicSiteConfig } from "@/lib/music-site";

type RemoteImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  preferProxy?: boolean;
};

type ArtistOfDayItem = {
  id: string | number;
  name: string;
  imageUrl?: string;
};

type ArtistOfDayCardProps = {
  artists: ArtistOfDayItem[];
  site: MusicSiteConfig;
  RemoteImage: ComponentType<RemoteImageProps>;
  imageFit?: "cover" | "contain";
  placeholderVariant?: "next-image" | "img";
  placeholderClassName?: string;
  placeholderWrapperClassName?: string;
  placeholderSize?: number;
};

export function ArtistOfDayCard({
  artists,
  site,
  RemoteImage,
  imageFit = "contain",
}: ArtistOfDayCardProps) {
  // Only pick from artists that have images
  const artistsWithImages = artists.filter((a) => a.imageUrl);
  if (artistsWithImages.length === 0) return null;

  const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const index = daysSinceEpoch % artistsWithImages.length;
  const artist = artistsWithImages[index];
  const coverUrl = artist.imageUrl || null;
  const albumHref = `${site.basePath}/members/${artist.id}`;
  const displayTitle = artist.name;

  return (
    <Card className="w-full h-full min-h-[120px]">
      <CardContent className="p-4 flex flex-col gap-3">
        <h2>Artist of the Day</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Link
              href={albumHref}
              className="text-base font-semibold hover:underline"
            >
              {displayTitle}
            </Link>
          </div>
          <div className="relative h-[220px] sm:h-[260px] lg:h-[300px]">
            {coverUrl ? (
              <Link href={albumHref} className="absolute inset-0 flex items-center justify-center">
                <RemoteImage
                  src={coverUrl}
                  alt={`${displayTitle} cover`}
                  className={`rounded-md object-${imageFit} w-full h-full`}
                  loading="eager"
                  preferProxy
                />
              </Link>
            ) : (
              <Link
                href={albumHref}
                className="w-full h-full rounded-md bg-muted flex items-center justify-center"
              >
                <span className="text-sm text-muted-foreground font-medium text-center px-4">{displayTitle}</span>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
