"use client";

import { useState, useEffect, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { getDailyNFLPlayer, type NFLSpotlightPlayer } from "@/lib/nfl-player-spotlight-data";
import { getPlayerHeadshotUrl } from "@/lib/nfl-api";
import Image from "next/image";
import Link from "next/link";

const STORAGE_KEY = "nflDailyPlayer";
const CACHE_VERSION = 2; // bump to invalidate stale cached data

function getTodayKey(): string {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function NFLPlayerSpotlightContent() {
  const [player, setPlayer] = useState<NFLSpotlightPlayer | null>(null);

  useEffect(() => {
    const todayKey = getTodayKey();
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const { date, player: cachedPlayer, v } = JSON.parse(cached);
        if (date === todayKey && v === CACHE_VERSION && cachedPlayer) {
          setPlayer(cachedPlayer);
          return;
        }
      }
    } catch { /* ignore */ }

    const daily = getDailyNFLPlayer();
    setPlayer(daily);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayKey, player: daily, v: CACHE_VERSION }));
    } catch { /* ignore */ }
  }, []);

  if (!player) {
    return (
      <div className="w-full h-full bg-muted/30 rounded-lg border p-3 sm:p-4 space-y-2 sm:space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="mr-4 text-primary">Player of the Day</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // Only use ESPN headshots for current players with hasHeadshot !== false
  const showHeadshot = player.hasHeadshot !== false;
  const headshotUrl = showHeadshot ? getPlayerHeadshotUrl(player.id) : null;

  return (
    <div className="w-full h-full bg-muted/30 rounded-lg border p-3 sm:p-4 space-y-2 sm:space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="mr-4 text-primary">Player of the Day</h2>
      </div>
      <div className="flex flex-col gap-3">
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-2xl font-bold">
              {player.name}
            </span>
            <span className="text-sm text-muted-foreground">{player.position}</span>
          </div>
          <p className="text-sm text-muted-foreground">{player.fact}</p>
        </div>
        {headshotUrl ? (
          <Link
            href={`/nfl/players/${player.id}`}
            className="group relative overflow-hidden rounded-xl flex justify-center"
          >
            <Image
              src={headshotUrl}
              alt={player.name}
              width={275}
              height={275}
              className="rounded-xl transition-transform group-hover:scale-105 w-[200px] sm:w-[250px] lg:w-[300px] h-auto"
              unoptimized
              priority
            />
          </Link>
        ) : (
          <div className="w-[200px] sm:w-[250px] lg:w-[300px] h-[200px] sm:h-[250px] lg:h-[300px] bg-muted rounded-xl flex items-center justify-center mx-auto">
            <span className="text-3xl sm:text-5xl font-bold text-muted-foreground">
              {player.position}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function NFLPlayerSpotlight() {
  return (
    <Suspense fallback={<div className="w-full bg-muted/30 rounded-lg border p-4 h-[200px] animate-pulse" />}>
      <NFLPlayerSpotlightContent />
    </Suspense>
  );
}
