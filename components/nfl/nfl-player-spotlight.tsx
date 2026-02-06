"use client";

import { useState, useEffect, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { getDailyNFLPlayer, type NFLSpotlightPlayer } from "@/lib/nfl-player-spotlight-data";
import { getPlayerHeadshotUrl } from "@/lib/nfl-api";
import Image from "next/image";
import Link from "next/link";

const STORAGE_KEY = "nflDailyPlayer";

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
        const { date, player: cachedPlayer } = JSON.parse(cached);
        if (date === todayKey && cachedPlayer) {
          setPlayer(cachedPlayer);
          return;
        }
      }
    } catch { /* ignore */ }

    const daily = getDailyNFLPlayer();
    setPlayer(daily);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayKey, player: daily }));
    } catch { /* ignore */ }
  }, []);

  if (!player) {
    return (
      <div className="w-full h-full bg-muted/30 rounded-lg border p-3 sm:p-4 space-y-2 sm:space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="font-league mr-4 text-primary">Player of the Day</h2>
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
        <h2 className="font-league mr-4 text-primary">Player of the Day</h2>
      </div>
      <div className="flex gap-3 sm:gap-6 items-center">
        <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
          <div>
            <span className="text-base sm:text-2xl font-bold block">
              {player.name}
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              {player.team} &middot; {player.position}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">{player.years}</p>
          <p className="text-sm text-muted-foreground">{player.fact}</p>
        </div>
        {headshotUrl ? (
          <Link
            href={`/nfl/players/${player.id}`}
            className="shrink-0 group relative overflow-hidden rounded-xl"
          >
            <Image
              src={headshotUrl}
              alt={player.name}
              width={168}
              height={168}
              className="rounded-xl transition-transform group-hover:scale-105 w-[70px] sm:w-[120px] md:w-[150px] lg:w-[168px] h-auto"
              unoptimized
              priority
            />
          </Link>
        ) : (
          <div className="shrink-0 w-[70px] sm:w-[120px] md:w-[150px] lg:w-[168px] h-[70px] sm:h-[120px] md:h-[150px] lg:h-[168px] bg-muted rounded-xl flex items-center justify-center">
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
