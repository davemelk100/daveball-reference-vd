"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getDailyGbvRecord, type GbvRecordOfDay } from "@/lib/gbv-records-data";
import { getDailyAmrepRecord, type AmrepRecordOfDay } from "@/lib/amrep-records-data";
import Image from "next/image";
import Link from "next/link";
import { GbvRemoteImage } from "@/components/amrep/amrep-remote-image";
import { getLocalAlbumImage } from "@/lib/gbv-album-images";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { amrepReleases } from "@/lib/amrep-releases-data";

export function GbvRecordOfDayCard() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const [record, setRecord] = useState<GbvRecordOfDay | AmrepRecordOfDay | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [albumId, setAlbumId] = useState<number | null>(null);
  const cacheKeyPrefix = isAmrep ? "amrep" : "gbv";
  const cacheKey = record
    ? `${cacheKeyPrefix}-record-cover:${record.title}:${record.year}`
    : `${cacheKeyPrefix}-record-cover`;

  useEffect(() => {
    const daily = isAmrep ? getDailyAmrepRecord() : getDailyGbvRecord();
    setRecord(daily);

    if (isAmrep) {
      const amrepDaily = daily as AmrepRecordOfDay;
      if (amrepDaily.coverUrl) {
        setCoverUrl(amrepDaily.coverUrl);
        return;
      }

      const cacheKey = `${cacheKeyPrefix}-record-cover:${daily.title}:${daily.year}`;
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as { url?: string };
          if (parsed?.url) {
            setCoverUrl(parsed.url);
          }
        }
      } catch {
        // ignore cache errors
      }

      const match = amrepReleases.find(
        (release) =>
          release.title.toLowerCase() === daily.title.toLowerCase() &&
          release.year === daily.year
      );
      if (match?.id) setAlbumId(match.id);

      async function fetchAmrepCover() {
        try {
          const titleMatch = (release: { title?: string }) =>
            (release.title || "").toLowerCase() === daily.title.toLowerCase();
          const perPage = 100;
          const maxPages = 3;

          for (let page = 1; page <= maxPages; page += 1) {
            const res = await fetch(
              `/api/amrep/discogs?type=releases&per_page=${perPage}&page=${page}`
            );
            if (!res.ok) return;
            const data = await res.json();
            const releases = Array.isArray(data?.releases) ? data.releases : [];
            const exact = releases.find(
              (release: { title?: string; year?: number }) =>
                titleMatch(release) && release.year === daily.year
            );
            const fallback = releases.find(titleMatch);
            const resolved = exact || fallback;
            if (resolved?.thumb) {
              setCoverUrl(resolved.thumb);
              if (resolved?.id) {
                setAlbumId(resolved.id);
              }
              try {
                localStorage.setItem(
                  cacheKey,
                  JSON.stringify({ url: resolved.thumb })
                );
              } catch {
                // ignore cache errors
              }
              break;
            }
          }
        } catch {
          // ignore cover lookup errors
        }
      }

      fetchAmrepCover();
      return;
    }

    const normalizeImageUrl = (url: string | null | undefined) =>
      url ? url.replace(/^http:/, "https:") : null;
    const cacheKey = `${cacheKeyPrefix}-record-cover:${daily.title}:${daily.year}`;
    const albumsCacheKey = `${cacheKeyPrefix}-albums-cache`;

    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as {
          url?: string;
          source?: "primary" | "fallback";
        };
        if (parsed?.url) {
          setCoverUrl(parsed.url);
        }
      }
    } catch {
      // ignore cache errors
    }

    async function fetchAlbumLink() {
      try {
        let albums: Array<{ id?: number; title?: string; year?: number; thumb?: string }> = [];
        try {
          const cachedAlbums = localStorage.getItem(albumsCacheKey);
          if (cachedAlbums) {
            const parsed = JSON.parse(cachedAlbums) as { albums?: typeof albums };
            if (parsed?.albums?.length) {
              albums = parsed.albums;
            }
          }
        } catch {
          // ignore cache errors
        }

        if (albums.length === 0) {
          const res = await fetch("/api/gbv/discogs?type=albums");
          if (!res.ok) return;
          const data = await res.json();
          albums = Array.isArray(data.albums) ? data.albums : [];
          try {
            localStorage.setItem(
              albumsCacheKey,
              JSON.stringify({ albums })
            );
          } catch {
            // ignore cache errors
          }
        }
        const titleMatch = (album: { title?: string }) =>
          (album.title || "").toLowerCase() === daily.title.toLowerCase();
        const exact = albums.find(
          (album: { title?: string; year?: number }) =>
            titleMatch(album) && album.year === daily.year
        );
        const fallback = albums.find(titleMatch);
        const match = exact || fallback;
        if (match?.id) {
          setAlbumId(match.id);
        }
        const localImage = getLocalAlbumImage(match?.id);
        const thumbUrl = match?.thumb || null;
        const resolvedUrl = localImage || thumbUrl;
        if (resolvedUrl) {
          setCoverUrl(resolvedUrl);
          try {
            localStorage.setItem(
              cacheKey,
              JSON.stringify({ url: normalizeImageUrl(resolvedUrl) })
            );
          } catch {
            // ignore cache errors
          }
        }
      } catch {
        // ignore album lookup errors
      }
    }

    fetchAlbumLink();
  }, []);

  if (!record) return null;

  const albumHref = albumId ? `${site.basePath}/albums/${albumId}` : null;
  const displayTitle =
    record && "artist" in record && record.artist
      ? `${record.artist} — ${record.title}`
      : record?.title;

  return (
    <Card className="w-full h-full min-h-[120px]">
      <CardContent className="p-4 flex gap-4 items-stretch">
        <div className="flex flex-col gap-1 w-1/2">
          <h2>Record of the Day</h2>
          {albumHref ? (
            <Link href={albumHref} className="text-base font-semibold hover:underline">
              {displayTitle}
            </Link>
          ) : (
            <div className="text-base font-semibold">{displayTitle}</div>
          )}
          <div className="text-xs text-muted-foreground">{record.year}</div>
          <p className="text-sm text-muted-foreground">{record.highlight}</p>
        </div>
        <div className="w-1/2 relative">
          {coverUrl ? (
            albumHref ? (
              <Link href={albumHref} className="absolute inset-0">
                <GbvRemoteImage
                  src={coverUrl}
                  alt={`${record.title} cover`}
                  className="rounded-md object-contain w-full h-full"
                  loading="eager"
                  preferProxy={false}
                />
              </Link>
            ) : (
              <GbvRemoteImage
                src={coverUrl}
                alt={`${record.title} cover`}
                className="rounded-md object-contain w-full h-full"
                loading="eager"
                preferProxy={false}
              />
            )
          ) : (
            albumHref ? (
              <Link
                href={albumHref}
                className="w-full h-full bg-muted rounded-md flex items-center justify-center"
              >
                <img
                  src={site.placeholderIconSrc}
                  alt={`${site.shortName} logo`}
                  className="w-auto h-auto max-w-1/2 max-h-1/2 gbv-nav-icon object-contain"
                />
              </Link>
            ) : (
              <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                <img
                  src={site.placeholderIconSrc}
                  alt={`${site.shortName} logo`}
                  className="w-auto h-auto max-w-1/2 max-h-1/2 gbv-nav-icon object-contain"
                />
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
