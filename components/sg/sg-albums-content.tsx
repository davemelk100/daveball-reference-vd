"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SgRemoteImage } from "@/components/sg/sg-remote-image";
import { sgDiscography, sgReleaseImages } from "@/lib/sg-discography-data";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { AlbumsControls } from "@/components/music-site/albums-controls";

const ITEMS_PER_PAGE = 30;

export function SgAlbumsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"year-asc" | "year-desc" | "title">(
    "year-asc",
  );
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [search, sortBy]);

  const albums = useMemo(() => {
    return sgDiscography.map((release) => ({
      id: release.catalogNumber,
      title: `${release.artist} — ${release.title}`,
      year: release.year,
      format: release.format,
    }));
  }, []);

  const filteredAlbums = useMemo(() => {
    let result = [...albums];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((album) =>
        album.title.toLowerCase().includes(searchLower),
      );
    }

    if (sortBy === "year-asc") {
      result.sort((a, b) => a.year - b.year || a.id - b.id);
    } else if (sortBy === "year-desc") {
      result.sort((a, b) => b.year - a.year || b.id - a.id);
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [albums, search, sortBy]);

  const typeCounts = useMemo(() => {
    return { all: filteredAlbums.length, albums: 0, eps: 0, singles: 0 };
  }, [filteredAlbums]);

  const visibleAlbums = filteredAlbums.slice(0, displayCount);
  const hasMore = displayCount < filteredAlbums.length;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!node) return;
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
          }
        },
        { rootMargin: "200px" },
      );
      observerRef.current.observe(node);
    },
    [],
  );

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="font-league">
          {filteredAlbums.length} {site.navLabels.discography}
        </h1>
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={site.searchPlaceholder || "Search releases..."}
            className="h-9 px-3 rounded-md border border-input bg-background text-sm flex-1 min-w-[200px]"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="h-9 px-3 rounded-md border border-input bg-background text-sm"
          >
            <option value="year-asc">Year (oldest)</option>
            <option value="year-desc">Year (newest)</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {visibleAlbums.map((album, index) => {
          const imageUrl = sgReleaseImages[album.id] ?? null;
          return (
            <Link key={album.id} href={`${site.basePath}/albums/${album.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-3">
                  {imageUrl ? (
                    <SgRemoteImage
                      src={imageUrl}
                      alt={album.title}
                      width={200}
                      height={200}
                      className="w-full aspect-square rounded-lg object-contain mb-2"
                      loading={index < 6 ? "eager" : "lazy"}
                      cacheKey={`sg-album-thumb:${album.id}`}
                    />
                  ) : (
                    <div className="w-full aspect-square rounded-lg mb-2 flex items-center justify-center">
                      <img
                        src={site.placeholderIconSrc}
                        alt={`${site.shortName} logo`}
                        className="w-3/5 h-auto opacity-20 object-contain"
                        loading="eager"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-base truncate">
                    {album.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{album.year}</span>
                    <span className="border border-border rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                      {album.format || "Release"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {hasMore && <div ref={sentinelRef} className="h-1" />}
    </div>
  );
}
