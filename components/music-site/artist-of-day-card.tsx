"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
  placeholderVariant = "next-image",
  placeholderClassName = "w-1/2 h-1/2 gbv-nav-icon object-contain",
  placeholderWrapperClassName,
  placeholderSize = 32,
}: ArtistOfDayCardProps) {
  if (artists.length === 0) return null;

  const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const index = daysSinceEpoch % artists.length;
  const artist = artists[index];
  const coverUrl = artist.imageUrl || null;
  const albumHref = `${site.basePath}/members/${artist.id}`;
  const displayTitle = artist.name;

  const renderPlaceholder = () => {
    if (placeholderVariant === "img") {
      return (
        <img
          src={site.placeholderIconSrc}
          alt={`${site.shortName} logo`}
          className={placeholderClassName}
        />
      );
    }

    return (
      <Image
        src={site.placeholderIconSrc}
        alt={`${site.shortName} logo`}
        width={placeholderSize}
        height={placeholderSize}
        className={placeholderClassName}
      />
    );
  };

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
                className={cn("w-full h-full rounded-md flex items-center justify-center", placeholderWrapperClassName)}
                style={{ opacity: 0.2 }}
              >
                {renderPlaceholder()}
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
