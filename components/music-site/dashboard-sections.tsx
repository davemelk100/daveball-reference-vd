"use client";

import { Children, type ComponentProps, type ComponentType, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { MusicSiteConfig } from "@/lib/music-site";
import { MemberAvatar } from "@/components/music-site/member-avatar";
import { cn } from "@/lib/utils";

type RemoteImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "lazy" | "eager";
  cacheKey?: string;
  preferProxy?: boolean;
};

type DashboardMember = {
  id?: number | string;
  name: string;
  imageUrl?: string | null;
};

type DashboardAlbum = {
  id?: number;
  title: string;
  year?: number;
  format?: string | string[];
  releaseType?: string;
  thumb?: string;
};

type MemberAvatarOptions = Pick<
  ComponentProps<typeof MemberAvatar>,
  | "fallbackImages"
  | "skipImages"
  | "fit"
  | "skipRemoteLookup"
  | "placeholderSize"
  | "placeholderClassName"
  | "placeholderVariant"
  | "placeholderWrapperClassName"
  | "fallbackClassName"
  | "renderPlaceholder"
>;

type DashboardDailyRowProps = {
  children: ReactNode;
  columns?: 2 | 3;
};

type DashboardSectionHeaderProps = {
  title: string;
  href: string;
  linkLabel?: string;
};

type DashboardMembersGridProps = {
  members: DashboardMember[];
  site: MusicSiteConfig;
  linkBasePath: string;
  memberAvatarProps?: MemberAvatarOptions;
};

type DashboardDiscographyGridProps<T extends DashboardAlbum> = {
  albums: T[];
  site: MusicSiteConfig;
  linkBasePath: string;
  getAlbumImage: (album: T) => string | null;
  getReleaseTypeLabel: (album: T) => string;
  RemoteImage: ComponentType<RemoteImageProps>;
  cacheKeyPrefix: string;
  imageFit?: "cover" | "contain";
  placeholderVariant?: "next-image" | "img";
  placeholderClassName?: string;
  placeholderWrapperClassName?: string;
  placeholderSize?: number;
  renderPlaceholder?: () => ReactNode;
};

export function DashboardDescription({ text }: { text?: string }) {
  if (!text) return null;
  return <p className="text-sm mb-6">{text}</p>;
}

export function DashboardDailyRow({ children, columns = 2 }: DashboardDailyRowProps) {
  if (columns === 3) {
    const childArray = Children.toArray(children);
    const first = childArray[0];
    const rest = childArray.slice(1);

    return (
      <div className="mb-8 flex flex-col gap-4">
        <div>{first}</div>
        <div className="grid gap-4 md:grid-cols-2">
          {rest}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2">
      {children}
    </div>
  );
}

export function DashboardSectionHeader({
  title,
  href,
  linkLabel = "View all →",
}: DashboardSectionHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <h2>{title}</h2>
      <Link
        href={href}
        className="uppercase text-sm text-muted-foreground hover:text-foreground font-bold"
      >
        {linkLabel}
      </Link>
    </div>
  );
}

export function DashboardMembersGrid({
  members,
  site,
  linkBasePath,
  memberAvatarProps,
}: DashboardMembersGridProps) {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {members.map((member, index) => {
        const card = (
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-3 text-center">
              <MemberAvatar
                name={member.name}
                imageUrl={member.imageUrl}
                memberId={typeof member.id === "number" ? member.id : undefined}
                fallbackIconSrc={site.placeholderIconSrc}
                cacheKeyPrefix={site.id}
                {...memberAvatarProps}
              />
              <h3 className="font-semibold text-sm">{member.name}</h3>
            </CardContent>
          </Card>
        );

        if (member.id) {
          return (
            <Link key={member.id} href={`${linkBasePath}/${member.id}`}>
              {card}
            </Link>
          );
        }

        return (
          <div key={`${member.name}-${index}`} className="cursor-default">
            {card}
          </div>
        );
      })}
    </div>
  );
}

export function DashboardDiscographyGrid<T extends DashboardAlbum>({
  albums,
  site,
  linkBasePath,
  getAlbumImage,
  getReleaseTypeLabel,
  RemoteImage,
  cacheKeyPrefix,
  imageFit = "cover",
  placeholderVariant = "next-image",
  placeholderClassName = "w-1/2 h-1/2 gbv-nav-icon object-contain",
  placeholderWrapperClassName,
  placeholderSize = 24,
  renderPlaceholder: renderPlaceholderProp,
}: DashboardDiscographyGridProps<T>) {
  const imageClassName = `w-full aspect-square rounded-lg object-${imageFit} mb-2`;

  const renderPlaceholder = renderPlaceholderProp ?? (() => (
    <div className={cn("w-full aspect-square rounded-lg mb-2 flex items-center justify-center", placeholderWrapperClassName)}>
      {placeholderVariant === "img" ? (
        <img
          src={site.placeholderIconSrc}
          alt={`${site.shortName} logo`}
          className={placeholderClassName}
          loading="eager"
        />
      ) : (
        <Image
          src={site.placeholderIconSrc}
          alt={`${site.shortName} logo`}
          width={placeholderSize}
          height={placeholderSize}
          className={placeholderClassName}
          loading="eager"
        />
      )}
    </div>
  ));

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {albums.map((album, index) => {
        const albumImage = getAlbumImage(album);
        const card = (
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-3">
              {albumImage ? (
                <RemoteImage
                  src={albumImage}
                  alt={album.title}
                  width={200}
                  height={200}
                  className={imageClassName}
                  loading={index < 5 ? "eager" : "lazy"}
                  cacheKey={
                    album.id ? `${cacheKeyPrefix}:${album.id}` : undefined
                  }
                  preferProxy
                />
              ) : (
                renderPlaceholder()
              )}
              <h3 className="font-semibold text-base truncate">
                {album.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{album.year ?? "—"}</span>
                <span className="border border-border rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                  {getReleaseTypeLabel(album)}
                </span>
              </div>
            </CardContent>
          </Card>
        );

        if (album.id) {
          return (
            <Link
              key={`${album.id}-${index}`}
              href={`${linkBasePath}/${album.id}`}
            >
              {card}
            </Link>
          );
        }

        return (
          <div
            key={`${album.title}-${album.year ?? "unknown"}-${index}`}
            className="cursor-default"
          >
            {card}
          </div>
        );
      })}
    </div>
  );
}
