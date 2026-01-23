"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GbvRemoteImage } from "@/components/amrep/amrep-remote-image";
import { getLocalAlbumImage } from "@/lib/gbv-album-images";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { getAmrepReleaseById } from "@/lib/amrep-releases-data";
import { getProxiedImageUrl, getReleaseType } from "@/lib/gbv-utils";

interface Album {
  id: number;
  title: string;
  year: number;
  thumb?: string | null;
  mainRelease?: number;
  format?: string | string[];
  labels?: Array<{ name: string }>;
  artists?: Array<{ name: string }>;
  releaseType?: string;
}

interface Track {
  position: string;
  title: string;
  duration: string;
}

interface AlbumDetail {
  id: number;
  title: string;
  year: number;
  thumb?: string | null;
  mainRelease?: number;
  format?: string | string[];
  labels?: Array<{ name: string }>;
  artists?: Array<{ name: string }>;
  styles?: string[];
  genres?: string[];
  tracklist?: Track[];
  releaseType?: string;
}

export function GbvAlbumDetailContent({ albumId }: { albumId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const [album, setAlbum] = useState<AlbumDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function fetchAlbum() {
      setIsLoading(true);
      setError(null);

      if (isAmrep) {
        try {
          const res = await fetch(`/api/amrep/discogs?type=release&id=${albumId}`);
          if (res.ok) {
            const data = await res.json();
            if (isActive) {
              setAlbum(data.release);
              setIsLoading(false);
            }
            return;
          }
        } catch {
          // fall back to local data
        }

        const release = getAmrepReleaseById(Number(albumId));
        if (isActive) {
          if (release) {
            setAlbum({
              id: release.id,
              title: `${release.artist} — ${release.title}`,
              year: release.year,
              thumb: "",
              format: release.format,
              artists: release.artist ? [{ name: release.artist }] : undefined,
            });
          } else {
            setError("Release not found");
            setAlbum(null);
          }
          setIsLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(`/api/gbv/discogs?type=master&id=${albumId}`);
        if (!res.ok) throw new Error("Failed to fetch album");
        const data = await res.json();
        if (isActive) {
          setAlbum(data);
        }
      } catch (err) {
        if (isActive) {
          setError("Failed to load album details");
        }
        console.error(err);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    fetchAlbum();
    return () => {
      isActive = false;
    };
  }, [albumId, isAmrep]);

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
      <div className="container py-6">
        <Link href={`${site.basePath}/albums`}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to {site.navLabels.discography}
          </Button>
        </Link>
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            {error || "Album not found"}
          </CardContent>
        </Card>
      </div>
    );
  }

  const albumImage = isAmrep
    ? getProxiedImageUrl(album.thumb)
    : getLocalAlbumImage(album.id) || getProxiedImageUrl(album.thumb);
  const displayTitle =
    isAmrep && album.artists && album.artists.length > 0
      ? `${album.artists.map((artist) => artist.name).join(", ")} — ${album.title}`
      : album.title;

  return (
    <div className="container py-6">
      <Link href={`${site.basePath}/albums`}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to {site.navLabels.discography}
        </Button>
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Album Cover */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              {albumImage ? (
                <GbvRemoteImage
                  src={albumImage}
                  alt={album.title}
                  width={300}
                  height={300}
                  className="w-full aspect-square rounded-lg object-cover mb-4"
                  cacheKey={`gbv-album-thumb:${album.id}`}
                  preferProxy
                />
              ) : (
                <div className="w-full aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src={site.placeholderIconSrc}
                    alt={`${site.shortName} logo`}
                    width={96}
                    height={96}
                    className="h-24 w-24 gbv-nav-icon"
                  />
                </div>
              )}
              <h1 className="font-league mb-2">
                {displayTitle}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {album.year && (
                  <Badge variant="outline">{album.year}</Badge>
                )}
                <Badge variant="outline">
                  {getReleaseType(album.format, album.releaseType)}
                </Badge>
                {album.styles?.map((style) => (
                  <Badge key={style} variant="secondary">
                    {style}
                  </Badge>
                ))}
              </div>
              {album.labels && album.labels.length > 0 && (
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="font-semibold">Label:</span>{" "}
                  {album.labels.map((label) => label.name).join(", ")}
                </div>
              )}
              {album.artists && album.artists.length > 0 && (
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="font-semibold">Artist:</span>{" "}
                  {album.artists.map((artist) => artist.name).join(", ")}
                </div>
              )}
              {!isAmrep && (
                <a
                  href={`https://www.discogs.com/release/${album.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary hover:underline mt-2"
                >
                  View on Discogs <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tracklist */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-4">
              <h2 className="font-league mb-4">Tracklist</h2>
              {album.tracklist && album.tracklist.length > 0 ? (
                <div className="space-y-2">
                  {album.tracklist.map((track, idx) => (
                    <div
                      key={`${track.title}-${idx}`}
                      className="flex items-center justify-between border-b border-border pb-2 last:border-0"
                    >
                      <div>
                        <span className="text-sm font-medium">
                          {track.position || idx + 1}. {track.title}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {track.duration || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Tracklist not available.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
