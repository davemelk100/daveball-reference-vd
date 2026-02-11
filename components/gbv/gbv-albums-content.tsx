"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { GbvRemoteImage } from "@/components/gbv/gbv-remote-image";
import { getLocalAlbumImage } from "@/lib/gbv-album-images";
import { getReleaseType, getProxiedImageUrl } from "@/lib/gbv-utils";
import { useSiteAlbumsData } from "@/components/music-site/use-site-albums-data";
import { AlbumGrid } from "@/components/music-site/album-grid";
import { AlbumsControls } from "@/components/music-site/albums-controls";
import { getRockathonUrl } from "@/lib/gbv-rockathon-data";

const ITEMS_PER_PAGE = 30;

export function GbvAlbumsContent() {
  const { site, isAmrep, albums, isLoading } = useSiteAlbumsData();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"year-asc" | "year-desc" | "title">(
    "year-asc",
  );
  const [releaseFilter, setReleaseFilter] = useState<
    "all" | "albums" | "eps" | "singles"
  >("all");
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

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
        album.title.toLowerCase().includes(searchLower),
      );
    }

    // Filter by release type
    if (releaseFilter === "albums") {
      result = result.filter(
        (album) => getReleaseType(album.format, album.releaseType) === "Album",
      );
    } else if (releaseFilter === "eps") {
      result = result.filter(
        (album) => getReleaseType(album.format, album.releaseType) === "EP",
      );
    } else if (releaseFilter === "singles") {
      result = result.filter(
        (album) => getReleaseType(album.format, album.releaseType) === "Single",
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

  const getAlbumImage = (album: typeof albums[number]): string | null => {
    if (isAmrep) return album.thumb ? getProxiedImageUrl(album.thumb) : null;
    return getLocalAlbumImage(album.id) || getProxiedImageUrl(album.thumb);
  };

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

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Loading {isAmrep ? "releases" : "albums"}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <AlbumsControls
        site={site}
        isAmrep={isAmrep}
        totalCount={filteredAlbums.length}
        releaseFilter={releaseFilter}
        onReleaseFilterChange={setReleaseFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        search={search}
        onSearchChange={setSearch}
      />

      <AlbumGrid
        albums={visibleAlbums}
        site={site}
        getAlbumImage={getAlbumImage}
        getReleaseTypeLabel={(album) => getReleaseType(album.format, album.releaseType)}
        RemoteImage={GbvRemoteImage}
        linkBasePath={`${site.basePath}/albums`}
        cacheKeyPrefix="gbv-album-thumb"
        imageFit={isAmrep ? "contain" : "cover"}
        getPurchaseUrl={isAmrep ? undefined : (album) => getRockathonUrl(album.title)}
      />

      {hasMore && <div ref={sentinelRef} className="h-1" />}

      {visibleAlbums.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          No{" "}
          {releaseFilter === "albums"
            ? "albums"
            : releaseFilter === "eps"
              ? "EPs"
              : releaseFilter === "singles"
                ? "singles"
                : "releases"}{" "}
          found
          {search && <> matching &quot;{search}&quot;</>}
        </div>
      )}
    </div>
  );
}
