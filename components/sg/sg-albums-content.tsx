"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SgRemoteImage } from "@/components/sg/sg-remote-image";
import { sgDiscography, sgReleaseImages } from "@/lib/sg-discography-data";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { AlbumsControls } from "@/components/music-site/albums-controls";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

const ITEMS_PER_PAGE = 30;

function getSgReleaseType(format?: string): "Album" | "Single" {
  if (format === '7"') return "Single";
  return "Album";
}

export function SgAlbumsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"year-asc" | "year-desc" | "title">(
    "year-asc",
  );
  const [releaseFilter, setReleaseFilter] = useState<
    "all" | "albums" | "eps" | "singles"
  >("all");
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [search, sortBy, releaseFilter]);

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

    if (releaseFilter === "albums") {
      result = result.filter((album) => getSgReleaseType(album.format) === "Album");
    } else if (releaseFilter === "singles") {
      result = result.filter((album) => getSgReleaseType(album.format) === "Single");
    }

    if (sortBy === "year-asc") {
      result.sort((a, b) => a.year - b.year || a.id - b.id);
    } else if (sortBy === "year-desc") {
      result.sort((a, b) => b.year - a.year || b.id - a.id);
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [albums, search, sortBy, releaseFilter]);

  const typeCounts = useMemo(() => {
    let searchFiltered = albums;
    if (search) {
      const searchLower = search.toLowerCase();
      searchFiltered = albums.filter((album) =>
        album.title.toLowerCase().includes(searchLower),
      );
    }
    const albumCount = searchFiltered.filter(
      (album) => getSgReleaseType(album.format) === "Album",
    ).length;
    const singleCount = searchFiltered.filter(
      (album) => getSgReleaseType(album.format) === "Single",
    ).length;
    return { all: searchFiltered.length, albums: albumCount, eps: 0, singles: singleCount };
  }, [albums, search]);

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
      <AlbumsControls
        site={site}
        isAmrep
        totalCount={filteredAlbums.length}
        typeCounts={typeCounts}
        releaseFilter={releaseFilter}
        onReleaseFilterChange={setReleaseFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        search={search}
        onSearchChange={setSearch}
      />

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
                    <SitePlaceholderIcon site={site} />
                  )}
                  <h3 className="font-semibold text-base truncate">
                    {album.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{album.year}</span>
                    <span className="border border-border rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                      {getSgReleaseType(album.format)}
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
