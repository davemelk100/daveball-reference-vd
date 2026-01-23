"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GbvRemoteImage } from "@/components/gbv/gbv-remote-image";
import { getLocalAlbumImage } from "@/lib/gbv-album-images";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { getAmrepReleaseById } from "@/lib/amrep-releases-data";

interface Track {
  position: string;
  title: string;
  duration: string;
}

interface AlbumDetail {
  id: number;
  title: string;
  year: number;
  images?: Array<{ uri: string; type: string }>;
  tracklist?: Track[];
  genres?: string[];
  styles?: string[];
  labels?: Array<{ name: string }>;
  formats?: Array<{ name: string; descriptions?: string[] }>;
  uri?: string;
}

export function GbvAlbumDetailContent({ albumId }: { albumId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const [album, setAlbum] = useState<AlbumDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (isAmrep) {
    const release = getAmrepReleaseById(Number(albumId));
    return (
      <div className="container py-6">
        <Link href={`${site.basePath}/albums`}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to {site.navLabels.discography}
          </Button>
        </Link>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Image
                    src={site.placeholderIconSrc}
                    alt={`${site.shortName} logo`}
                    width={48}
                    height={48}
                    className="w-1/2 h-1/2 gbv-nav-icon object-contain"
                  />
                </div>
              </div>
              <div className="lg:col-span-2">
                <h1 className="font-league mb-2">
                  {release ? `${release.artist} — ${release.title}` : "Release"}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {release?.year ?? "—"} • {release?.format ?? "Release"}
                </p>
                {release?.highlight && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {release.highlight}
                  </p>
                )}
                <a
                  href="https://www.shoxop.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  Browse the AmRep catalog <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  useEffect(() => {
    async function fetchAlbum() {
      try {
        const res = await fetch(`/api/gbv/discogs?type=master&id=${albumId}`);
        if (!res.ok) throw new Error("Failed to fetch album");
        const data = await res.json();
        setAlbum(data);
      } catch (err) {
        setError("Failed to load album details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAlbum();
  }, [albumId]);

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

  // Use MusicBrainz cover art, fallback to Discogs images (which may be empty without auth)
  const displayImage =
    getLocalAlbumImage(Number(albumId)) ||
    album.images?.find((img) => img.type === "primary")?.uri ||
    album.images?.[0]?.uri;

  return (
    <div className="container py-6">
      <Link href={`${site.basePath}/albums`}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to {site.navLabels.discography}
        </Button>
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Album Cover & Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              {displayImage ? (
                <GbvRemoteImage
                  src={displayImage}
                  alt={album.title}
                  width={500}
                  height={500}
                  className="w-full aspect-square rounded-lg object-cover mb-4"
                  loading="eager"
                  cacheKey={`gbv-album-cover:${albumId}`}
                  preferProxy
                />
              ) : (
                <div className="w-full aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src="/chat-gbv-box.svg"
                    alt="GBV rune"
                    width={48}
                    height={48}
                    className="w-1/2 h-1/2 gbv-nav-icon object-contain"
                  />
                </div>
              )}
              <h1 className="font-league mb-2">{album.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{album.year}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {album.genres?.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
                {album.styles?.map((style) => (
                  <Badge key={style} variant="outline">
                    {style}
                  </Badge>
                ))}
              </div>

              {album.labels && album.labels.length > 0 && (
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">Label:</span>{" "}
                  {album.labels.map((l) => l.name).join(", ")}
                </p>
              )}

              {album.formats && album.formats.length > 0 && (
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="font-medium">Format:</span>{" "}
                  {album.formats.map((f) => f.name).join(", ")}
                </p>
              )}

              {album.uri && (
                <a
                  href={
                    album.uri.startsWith("http")
                      ? album.uri
                      : `https://www.discogs.com${album.uri}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary hover:underline"
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
            <CardHeader>
              <CardTitle>
                Tracklist{" "}
                <span className="align-baseline">
                  ({album.tracklist?.length || 0} tracks)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {album.tracklist && album.tracklist.length > 0 ? (
                <div className="divide-y">
                  {album.tracklist.map((track, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-8">
                          {track.position || index + 1}
                        </span>
                        <span>{track.title}</span>
                      </div>
                      {track.duration && (
                        <span className="text-sm text-muted-foreground">
                          {track.duration}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No tracklist available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
