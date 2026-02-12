"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { getE6ArtistById, getE6ArtistImageUrl } from "@/lib/e6-artists-data";
import { getE6ReleasesByArtist } from "@/lib/e6-discography-data";
import Image from "next/image";

function DetailArtistImage({ name, staticUrl }: { name: string; staticUrl?: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(staticUrl || null);
  const [failed, setFailed] = useState(false);
  const handleError = useCallback(() => setFailed(true), []);

  useEffect(() => {
    if (staticUrl) return;

    const params = new URLSearchParams({ type: "artist", name });
    fetch(`/api/e6/discogs?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.artist?.imageUrl) {
          setImageUrl(data.artist.imageUrl);
        }
      })
      .catch(() => {});
  }, [name, staticUrl]);

  if (imageUrl && !failed) {
    return (
      <div className="w-full aspect-square bg-muted/30 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      </div>
    );
  }

  return (
    <div className="w-full aspect-square bg-muted/30 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
      <Image
        src="/e6-logo.png"
        alt={name}
        width={200}
        height={200}
        className="opacity-30 w-full h-auto p-4"
      />
    </div>
  );
}

export function E6MemberDetailContent({ memberId }: { memberId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const artist = getE6ArtistById(memberId);
  const releases = artist ? getE6ReleasesByArtist(artist.name) : [];
  const imageUrl = artist ? getE6ArtistImageUrl(artist.id) : undefined;

  if (!artist) {
    return (
      <div className="container py-6">
        <Link
          href={`${site.basePath}/members`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {site.navLabels.members}
        </Link>
        <p className="text-muted-foreground">Artist not found.</p>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <Link
        href={`${site.basePath}/members`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        {site.navLabels.members}
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        {/* Left: artist image + info */}
        <div>
          <DetailArtistImage name={artist.name} staticUrl={imageUrl} />
          <h1 className="font-league mb-2">{artist.name}</h1>
          {artist.yearsActive && (
            <p className="text-sm text-muted-foreground mb-2">
              Active: {artist.yearsActive}
            </p>
          )}
          {artist.genre && (
            <p className="text-sm text-muted-foreground mb-2">
              Genre: {artist.genre}
            </p>
          )}
          {artist.wikipediaUrl && (
            <a
              href={artist.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              Wikipedia
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        {/* Right: discography */}
        <div>
          <h2 className="mb-4">Releases on E6 ({releases.length})</h2>
          {releases.length > 0 ? (
            <div className="space-y-2">
              {releases.map((release) => (
                <Link
                  key={release.catalogNumber}
                  href={`${site.basePath}/albums/${release.catalogNumber}`}
                  className="flex items-center justify-between border-b border-border pb-2 last:border-0 hover:bg-muted/50 -mx-2 px-2 py-1 rounded transition-colors"
                >
                  <div>
                    <p className="font-semibold text-sm">{release.title}</p>
                    <p className="text-xs text-muted-foreground">
                      E6 {release.catalogNumber}
                    </p>
                  </div>
                  <Badge variant="outline">{release.year}</Badge>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No releases found in catalog.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
