"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllE6Artists, getE6ArtistImageUrl } from "@/lib/e6-artists-data";
import Link from "next/link";
import Image from "next/image";

// In-memory cache shared across all ArtistImage instances
const artistImageCache = new Map<string, string | null>();

function ArtistImage({ name, staticUrl }: { name: string; staticUrl?: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(staticUrl || null);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const fetchedRef = useRef(false);

  const handleError = useCallback(() => setFailed(true), []);

  useEffect(() => {
    if (staticUrl || fetchedRef.current) return;

    const cacheKey = name.toLowerCase();
    if (artistImageCache.has(cacheKey)) {
      setImageUrl(artistImageCache.get(cacheKey) || null);
      fetchedRef.current = true;
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          fetchedRef.current = true;

          const params = new URLSearchParams({ type: "artist", name });
          fetch(`/api/e6/discogs?${params}`)
            .then((res) => res.json())
            .then((data) => {
              const url = data.artist?.imageUrl || null;
              artistImageCache.set(cacheKey, url);
              setImageUrl(url);
            })
            .catch(() => {
              artistImageCache.set(cacheKey, null);
            });
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [name, staticUrl]);

  if (imageUrl && !failed) {
    return (
      <div ref={ref} className="w-full aspect-square bg-muted/30 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={handleError}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className="w-full aspect-square bg-muted/30 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
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

export function E6MembersContent() {
  const artists = getAllE6Artists();
  const [search, setSearch] = useState("");

  const filteredArtists = artists.filter((artist) =>
    search === "" || artist.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Artists</h1>

      <div className="mb-6">
        <Input
          placeholder="Search artists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredArtists.length} of {artists.length} artists
      </p>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredArtists.map((artist) => {
          const staticUrl = getE6ArtistImageUrl(artist.id);
          return (
            <Link key={artist.id} href={`/e6/members/${artist.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-3 text-center">
                  <ArtistImage name={artist.name} staticUrl={staticUrl} />
                  <p className="text-sm font-medium">{artist.name}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
