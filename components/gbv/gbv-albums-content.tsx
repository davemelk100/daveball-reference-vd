"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { GbvRemoteImage } from "@/components/gbv/gbv-remote-image";
import { getLocalAlbumImage } from "@/lib/gbv-album-images";
import { getReleaseType, getProxiedImageUrl } from "@/lib/gbv-utils";
import { useSiteAlbumsData } from "@/components/music-site/use-site-albums-data";
import { AlbumGrid } from "@/components/music-site/album-grid";
import { AlbumsControls } from "@/components/music-site/albums-controls";

const ITEMS_PER_PAGE = 30;

export function GbvAlbumsContent() {
  const { site, isAmrep, albums, isLoading } = useSiteAlbumsData();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"year-asc" | "year-desc" | "title">(
    "year-asc",
  );
  const [releaseFilter, setReleaseFilter] = useState<
    "all" | "albums" | "singles"
  >("albums");
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

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  };

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
      />

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            className="text-black"
          >
            Load More{" "}
            <span className="align-baseline">
              ({filteredAlbums.length - displayCount} remaining)
            </span>
          </Button>
        </div>
      )}

      {visibleAlbums.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          No{" "}
          {releaseFilter === "albums"
            ? "albums"
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
