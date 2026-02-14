"use client";

import { useMemo } from "react";
import { SgRemoteImage } from "@/components/sg/sg-remote-image";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { getSgArtistById, sgArtistImages } from "@/lib/sg-artists-data";
import { sgDiscography, sgReleaseImages } from "@/lib/sg-discography-data";
import { MemberDetailLayout } from "@/components/music-site/member-detail-layout";
import { MemberDetailLeft } from "@/components/music-site/member-detail-left";
import { MemberDetailRight } from "@/components/music-site/member-detail-right";
import Link from "next/link";

export function SgMemberDetailContent({ memberId }: { memberId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  const artist = useMemo(() => getSgArtistById(memberId), [memberId]);

  const imageUrl = artist ? sgArtistImages[artist.id] ?? null : null;

  const releases = useMemo(() => {
    if (!artist) return [];
    const artistNameLower = artist.name.toLowerCase();
    return sgDiscography.filter(
      (r) => r.artist.toLowerCase() === artistNameLower,
    );
  }, [artist]);

  if (!artist) {
    return (
      <MemberDetailLayout
        site={site}
        backHref={`${site.basePath}/members`}
        backLabel={site.navLabels.members}
        leftContent={
          <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
            <img
              src={site.placeholderIconSrc}
              alt={`${site.shortName} logo`}
              className="w-3/5 h-auto opacity-20 object-contain"
            />
          </div>
        }
        rightTitle="Releases"
        rightContent={
          <p className="text-sm text-muted-foreground">Artist not found</p>
        }
      />
    );
  }

  const leftContent = (
    <MemberDetailLeft
      image={
        imageUrl ? (
          <SgRemoteImage
            src={imageUrl}
            alt={artist.name}
            width={300}
            height={300}
            className="w-full aspect-square object-contain"
            cacheKey={`sg-member-image:${artist.id}`}
            preferProxy
          />
        ) : (
          <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
            <img
              src={site.placeholderIconSrc}
              alt={`${site.shortName} logo`}
              className="w-3/5 h-auto opacity-20 object-contain"
            />
          </div>
        )
      }
      name={artist.name}
      profile={[
        artist.genre ? `Genre: ${artist.genre}` : null,
        artist.yearsActive ? `Active: ${artist.yearsActive}` : null,
      ]
        .filter(Boolean)
        .join("\n")}
      links={
        artist.wikipediaUrl
          ? [{ href: artist.wikipediaUrl, label: "Wikipedia" }]
          : []
      }
    />
  );

  const rightContent = (
    <MemberDetailRight
      items={releases}
      emptyLabel="No releases found on Skin Graft."
      emptyClassName="text-sm"
      containerClassName="grid gap-2"
      renderItem={(release) => (
        <Link
          key={release.catalogNumber}
          href={`${site.basePath}/albums/${release.catalogNumber}`}
          className="block border-b border-border pb-2 last:border-0 hover:bg-muted/50 rounded px-2 py-1 transition-colors"
        >
          <p className="font-semibold text-sm">{release.title}</p>
          <p className="text-xs text-muted-foreground">
            {release.year}
            {release.format ? ` · ${release.format}` : ""} · GR{" "}
            {String(release.catalogNumber).padStart(3, "0")}
          </p>
        </Link>
      )}
    />
  );

  return (
    <MemberDetailLayout
      site={site}
      backHref={`${site.basePath}/members`}
      backLabel={site.navLabels.members}
      leftContent={leftContent}
      rightTitle="Releases"
      rightContent={rightContent}
    />
  );
}
