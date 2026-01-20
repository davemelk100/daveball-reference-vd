"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Album {
  id: number;
  title: string;
  year: number;
  thumb: string;
  mainRelease?: number;
  coverUrl?: string | null;
  format?: string | string[];
  releaseType?: string;
}

function getPrimaryType(format?: string | string[], releaseType?: string) {
  if (!format && releaseType !== "release") return "Album";
  const normalized = Array.isArray(format) ? format.join(" ") : format || "";
  if (normalized.toLowerCase().includes("single")) return "Single";
  if (releaseType === "release") return "Single";
  return "Album";
}

export function GbvAlbumsContent() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"year-asc" | "year-desc" | "title">("year-asc");
  const [releaseFilter, setReleaseFilter] = useState<"albums" | "singles">("albums");
  const [loadedCovers, setLoadedCovers] = useState<Set<string>>(new Set());

  // Fetch cover art in batches
  const fetchCoverArt = useCallback(async (albumsToFetch: Album[]) => {
    // Filter out albums we've already tried to load
    const newAlbums = albumsToFetch.filter((a) => !loadedCovers.has(a.title));
    if (newAlbums.length === 0) return;

    try {
      const response = await fetch("/api/gbv/cover-art", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          albums: newAlbums.map((a) => ({
            title: a.title,
            year: a.year,
            primaryType: getPrimaryType(a.format, a.releaseType),
          })),
        }),
      });

      if (!response.ok) return;

      const data = await response.json();
      const coverMap = new Map<string, string | null>();

      for (const result of data.results || []) {
        coverMap.set(result.title, result.coverUrl);
      }

      // Mark these as loaded
      setLoadedCovers((prev) => {
        const newSet = new Set(prev);
        newAlbums.forEach((a) => newSet.add(a.title));
        return newSet;
      });

      setAlbums((prev) =>
        prev.map((album) => ({
          ...album,
          coverUrl: coverMap.has(album.title) ? coverMap.get(album.title) : album.coverUrl,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch cover art:", err);
    }
  }, [loadedCovers]);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const res = await fetch("/api/gbv/discogs?type=albums");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const albumsList = data.albums || [];
        setAlbums(albumsList);
        setFilteredAlbums(albumsList);

        // Fetch cover art for first 20 albums
        if (albumsList.length > 0) {
          fetchCoverArt(albumsList.slice(0, 20));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAlbums();
  }, []);

  // Load more covers as user scrolls/views more albums
  useEffect(() => {
    if (albums.length > 0 && loadedCovers.size < albums.length) {
      // Load covers for albums that don't have them yet (in batches of 20)
      const startIndex = loadedCovers.size;
      const endIndex = Math.min(startIndex + 20, albums.length);
      if (startIndex < albums.length) {
        const timer = setTimeout(() => {
          fetchCoverArt(albums.slice(startIndex, endIndex));
        }, 500); // Delay to avoid rate limiting
        return () => clearTimeout(timer);
      }
    }
  }, [albums, loadedCovers.size, fetchCoverArt]);

  const getAlbumImage = (album: Album): string | null => {
    return album.coverUrl || album.thumb || null;
  };

  const getReleaseType = (format?: string | string[], releaseType?: string) => {
    if (!format) return "Album";
    const normalized = Array.isArray(format) ? format.join(" ") : format;
    if (normalized.toLowerCase().includes("single")) return "Single";
    if (releaseType === "release") return "Single";
    return "Album";
  };

  useEffect(() => {
    let result = [...albums];

    // Filter by search
    if (search) {
      result = result.filter((album) =>
        album.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "year-asc") {
      result.sort((a, b) => a.year - b.year);
    } else if (sortBy === "year-desc") {
      result.sort((a, b) => b.year - a.year);
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredAlbums(result);
  }, [albums, search, sortBy]);

  const albumsOnly = filteredAlbums.filter(
    (album) => getReleaseType(album.format, album.releaseType) === "Album"
  );
  const singlesOnly = filteredAlbums.filter(
    (album) => getReleaseType(album.format, album.releaseType) === "Single"
  );
  const visibleAlbums = releaseFilter === "albums" ? albumsOnly : singlesOnly;

  if (isLoading) {
    return (
      <main className="container py-6">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Loading albums...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-league text-4xl font-semibold">Discography</h1>
          <p className="text-sm text-muted-foreground">
            {releaseFilter === "albums" ? "Albums" : "Singles"} ({visibleAlbums.length})
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Tabs value={releaseFilter} onValueChange={(v) => setReleaseFilter(v as typeof releaseFilter)}>
            <TabsList>
              <TabsTrigger value="albums">Albums</TabsTrigger>
              <TabsTrigger value="singles">Singles</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search titles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year-asc">Year (oldest)</SelectItem>
              <SelectItem value="year-desc">Year (newest)</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {visibleAlbums.map((album) => (
          <Link key={album.id} href={`/gbv/albums/${album.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-3">
                {getAlbumImage(album) ? (
                  <Image
                    src={getAlbumImage(album)!}
                    alt={album.title}
                    width={200}
                    height={200}
                    className="w-full aspect-square rounded-lg object-cover mb-2"
                    unoptimized
                  />
                ) : (
                  <div className="w-full aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                    <Image
                      src="/gbv-rune.svg"
                      alt="GBV rune"
                      width={48}
                      height={48}
                      className="h-12 w-12"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-sm truncate">{album.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{album.year}</span>
                  <span className="border border-border rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                    {getReleaseType(album.format, album.releaseType)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {visibleAlbums.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          No {releaseFilter === "albums" ? "albums" : "singles"} found matching &quot;{search}&quot;
        </div>
      )}
    </main>
  );
}
