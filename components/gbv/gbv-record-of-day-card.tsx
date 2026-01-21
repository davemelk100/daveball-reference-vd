"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getDailyGbvRecord, type GbvRecordOfDay } from "@/lib/gbv-records-data";
import Image from "next/image";
import Link from "next/link";

export function GbvRecordOfDayCard() {
  const [record, setRecord] = useState<GbvRecordOfDay | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [albumId, setAlbumId] = useState<number | null>(null);
  const coverSourceRef = useRef<"primary" | "fallback" | null>(null);

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
          coverSourceRef.current = parsed.source || "fallback";
          setCoverUrl(parsed.url);
        }
      }
    } catch {
      // ignore cache errors
    }

    async function fetchCoverArt() {
      try {
        const res = await fetch(
          `/api/gbv/cover-art?album=${encodeURIComponent(
            daily.title
          )}&artist=${encodeURIComponent("Guided By Voices")}&year=${
            daily.year
          }&primaryType=album&size=small`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data.coverUrl) {
          const normalized = normalizeImageUrl(data.coverUrl);
          if (normalized) {
            coverSourceRef.current = "primary";
            setCoverUrl(normalized);
            try {
              localStorage.setItem(
                cacheKey,
                JSON.stringify({ url: normalized, source: "primary" })
              );
            } catch {
              // ignore cache errors
            }
          }
        }
      } catch {
        // ignore cover art errors
      }
    }

    fetchCoverArt();

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
        const fallbackThumb = normalizeImageUrl(match?.thumb);
        if (fallbackThumb && coverSourceRef.current !== "primary") {
          coverSourceRef.current = "fallback";
          setCoverUrl(fallbackThumb);
          try {
            localStorage.setItem(
              cacheKey,
              JSON.stringify({ url: fallbackThumb, source: "fallback" })
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
                <Image
                  src={coverUrl}
                  alt={`${record.title} cover`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="rounded-md object-cover"
                  loading="eager"
                  unoptimized
                />
              </Link>
            ) : (
              <Image
                src={coverUrl}
                alt={`${record.title} cover`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="rounded-md object-cover"
                loading="eager"
                unoptimized
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
