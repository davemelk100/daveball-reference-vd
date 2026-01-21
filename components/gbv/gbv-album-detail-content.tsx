"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  const [album, setAlbum] = useState<AlbumDetail | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlbum() {
      try {
        // Fetch master release details from Discogs
        const res = await fetch(`https://api.discogs.com/masters/${albumId}`, {
          headers: { "User-Agent": "GuidedByNumbers/1.0" },
        });
        if (!res.ok) throw new Error("Failed to fetch album");
        const data = await res.json();
        setAlbum(data);

        // Fetch cover art from MusicBrainz
        if (data.title) {
          fetchCoverArt(data.title);
        }
      } catch (err) {
        setError("Failed to load album details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchCoverArt(title: string) {
      try {
        const res = await fetch(`/api/gbv/cover-art?album=${encodeURIComponent(title)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.coverUrl) {
          setCoverUrl(data.coverUrl);
        }
      } catch (err) {
        console.error("Failed to fetch cover art:", err);
      }
    }

    fetchAlbum();
  }, [albumId]);

  if (isLoading) {
    return (
      <main className="container py-6">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Loading album...</p>
        </div>
      </main>
    );
  }

  if (error || !album) {
    return (
      <main className="container py-6">
        <Link href="/gbv/albums">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Albums
          </Button>
        </Link>
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            {error || "Album not found"}
          </CardContent>
        </Card>
      </main>
    );
  }

  // Use MusicBrainz cover art, fallback to Discogs images (which may be empty without auth)
  const displayImage = coverUrl || album.images?.find((img) => img.type === "primary")?.uri || album.images?.[0]?.uri;

  return (
    <main className="container py-6">
      <Link href="/gbv/albums">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Albums
        </Button>
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Album Cover & Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              {displayImage ? (
                <Image
                  src={displayImage}
                  alt={album.title}
                  width={500}
                  height={500}
                  className="w-full aspect-square rounded-lg object-cover mb-4"
                  unoptimized
                  priority
                  loading="eager"
                />
              ) : (
                <div className="w-full aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src="/chat-gbv-box.svg"
                    alt="GBV rune"
                    width={96}
                    height={96}
                    className="h-24 w-24 gbv-nav-icon"
                  />
                </div>
              )}
              <h1 className="font-league text-2xl font-semibold mb-2">{album.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{album.year}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {album.genres?.map((genre) => (
                  <Badge key={genre} variant="secondary">{genre}</Badge>
                ))}
                {album.styles?.map((style) => (
                  <Badge key={style} variant="outline">{style}</Badge>
                ))}
              </div>

              {album.labels && album.labels.length > 0 && (
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">Label:</span> {album.labels.map((l) => l.name).join(", ")}
                </p>
              )}

              {album.formats && album.formats.length > 0 && (
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="font-medium">Format:</span> {album.formats.map((f) => f.name).join(", ")}
                </p>
              )}

              {album.uri && (
                <a
                  href={`https://www.discogs.com${album.uri}`}
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
              <CardTitle>Tracklist ({album.tracklist?.length || 0} tracks)</CardTitle>
            </CardHeader>
            <CardContent>
              {album.tracklist && album.tracklist.length > 0 ? (
                <div className="divide-y">
                  {album.tracklist.map((track, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-8">
                          {track.position || index + 1}
                        </span>
                        <span>{track.title}</span>
                      </div>
                      {track.duration && (
                        <span className="text-sm text-muted-foreground">{track.duration}</span>
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
    </main>
  );
}
