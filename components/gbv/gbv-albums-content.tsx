"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getReleaseType } from "@/lib/gbv-utils";

const ITEMS_PER_PAGE = 12;

interface Album {
  id: number;
  title: string;
  year: number;
  thumb: string;
  mainRelease?: number;
  format?: string | string[];
  releaseType?: string;
}

export function GbvAlbumsContent() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"year-asc" | "year-desc" | "title">("year-asc");
  const [releaseFilter, setReleaseFilter] = useState<"all" | "albums" | "singles">("albums");
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const res = await fetch("/api/gbv/discogs?type=albums");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAlbums(data.albums || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAlbums();
  }, []);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [search, sortBy, releaseFilter]);

  // Memoized filtered and sorted albums
  const filteredAlbums = useMemo(() => {
    let result = [...albums];

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((album) =>
        album.title.toLowerCase().includes(searchLower)
      );
    }

    // Filter by release type
    if (releaseFilter === "albums") {
      result = result.filter(
        (album) => getReleaseType(album.format, album.releaseType) === "Album"
      );
    } else if (releaseFilter === "singles") {
      result = result.filter(
        (album) => getReleaseType(album.format, album.releaseType) === "Single"
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

    return result;
  }, [albums, search, sortBy, releaseFilter]);

  // Albums to display (limited by displayCount)
  const visibleAlbums = filteredAlbums.slice(0, displayCount);
  const hasMore = displayCount < filteredAlbums.length;

  const getAlbumImage = (album: Album): string | null => {
    return album.thumb || null;
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  };

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
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-league text-4xl font-semibold">Discography</h1>
            <p className="text-sm text-muted-foreground">
              {releaseFilter === "albums"
                ? "Albums"
                : releaseFilter === "singles"
                  ? "Singles"
                  : "All"}{" "}
              ({filteredAlbums.length})
            </p>
          </div>
          <Tabs value={releaseFilter} onValueChange={(v) => setReleaseFilter(v as typeof releaseFilter)}>
            <TabsList className="text-black">
              <TabsTrigger value="all" className="text-black">All</TabsTrigger>
              <TabsTrigger value="albums" className="text-black">Albums</TabsTrigger>
              <TabsTrigger value="singles" className="text-black">Singles</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex gap-4 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/80" />
            <Input
              placeholder="Search titles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-full text-white gbv-input-white"
            />
          </div>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="w-44 text-white">
              <SelectValue className="text-white" />
            </SelectTrigger>
            <SelectContent className="text-black">
              <SelectItem value="year-asc" className="text-black">Year (oldest)</SelectItem>
              <SelectItem value="year-desc" className="text-black">Year (newest)</SelectItem>
              <SelectItem value="title" className="text-black">Title A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {visibleAlbums.map((album, index) => (
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
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    priority={index === 0}
                    loading={index < 6 ? "eager" : "lazy"}
                  />
                ) : (
                  <div className="w-full aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                    <Image
                      src="/chat-gbv-box.svg"
                      alt="GBV rune"
                      width={48}
                      height={48}
                      className="h-12 w-12 gbv-nav-icon"
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

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            className="text-black"
          >
            Load More ({filteredAlbums.length - displayCount} remaining)
          </Button>
        </div>
      )}

      {visibleAlbums.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          No {releaseFilter === "albums" ? "albums" : releaseFilter === "singles" ? "singles" : "releases"} found
          {search && <> matching &quot;{search}&quot;</>}
        </div>
      )}
    </main>
  );
}
