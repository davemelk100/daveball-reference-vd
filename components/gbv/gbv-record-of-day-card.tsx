"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getDailyGbvRecord, type GbvRecordOfDay } from "@/lib/gbv-records-data";
import Image from "next/image";
import Link from "next/link";
import { GbvRemoteImage } from "@/components/gbv/gbv-remote-image";
import { getLocalAlbumImage } from "@/lib/gbv-album-images";

export function GbvRecordOfDayCard() {
  const [record, setRecord] = useState<GbvRecordOfDay | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [albumId, setAlbumId] = useState<number | null>(null);
  const cacheKey = record
    ? `gbv-record-cover:${record.title}:${record.year}`
    : "gbv-record-cover";

  useEffect(() => {
    const daily = getDailyGbvRecord();
    setRecord(daily);

    const normalizeImageUrl = (url: string | null | undefined) =>
      url ? url.replace(/^http:/, "https:") : null;
    const cacheKey = `gbv-record-cover:${daily.title}:${daily.year}`;

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
        const res = await fetch("/api/gbv/discogs?type=albums");
        if (!res.ok) return;
        const data = await res.json();
        const albums = Array.isArray(data.albums) ? data.albums : [];
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
              JSON.stringify({ url: resolvedUrl })
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

  const albumHref = albumId ? `/gbv/albums/${albumId}` : null;

  return (
    <Card className="w-full h-full min-h-[120px]">
      <CardContent className="p-4 flex gap-4 items-stretch">
        <div className="flex flex-col gap-1 w-1/2">
          <h2 className="text-lg font-semibold">Record of the Day</h2>
          {albumHref ? (
            <Link href={albumHref} className="text-base font-semibold hover:underline">
              {record.title}
            </Link>
          ) : (
            <div className="text-base font-semibold">{record.title}</div>
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
                  className="rounded-md object-cover w-full h-full"
                  loading="eager"
                  preferProxy={false}
                />
              </Link>
            ) : (
              <GbvRemoteImage
                src={coverUrl}
                alt={`${record.title} cover`}
                className="rounded-md object-cover w-full h-full"
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
                <Image
                  src="/chat-gbv-box.svg"
                  alt="GBV rune"
                  width={64}
                  height={64}
                  className="h-16 w-16 gbv-nav-icon"
                />
              </Link>
            ) : (
              <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                <Image
                  src="/chat-gbv-box.svg"
                  alt="GBV rune"
                  width={64}
                  height={64}
                  className="h-16 w-16 gbv-nav-icon"
                />
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
