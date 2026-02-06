"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { getDailyUSPBLPlayer, type USPBLSpotlightPlayer } from "@/lib/uspbl-player-spotlight-data";

const STORAGE_KEY = "uspblDailyPlayer";

function getTodayKey(): string {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function USPBLPlayerSpotlightContent() {
  const [player, setPlayer] = useState<USPBLSpotlightPlayer | null>(null);

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

    const daily = getDailyUSPBLPlayer();
    setPlayer(daily);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayKey, player: daily }));
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

  return (
    <div className="w-full h-full bg-muted/30 rounded-lg border p-3 sm:p-4 space-y-2 sm:space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="mr-4 text-primary">Player of the Day</h2>
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
        <div className="shrink-0 w-[70px] sm:w-[120px] h-[70px] sm:h-[120px] rounded-xl bg-muted/50 flex items-center justify-center overflow-hidden">
          {player.imageUrl ? (
            <Image
              src={player.imageUrl}
              alt={player.name}
              width={120}
              height={120}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl sm:text-5xl font-bold text-muted-foreground/50">
              {player.position.charAt(0)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function USPBLPlayerSpotlight() {
  return (
    <Suspense fallback={<div className="w-full bg-muted/30 rounded-lg border p-4 h-[200px] animate-pulse" />}>
      <USPBLPlayerSpotlightContent />
    </Suspense>
  );
}
