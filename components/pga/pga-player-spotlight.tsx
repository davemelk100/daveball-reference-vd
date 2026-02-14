"use client";

import { useState, useEffect, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { getDailyPGAPlayer, type PGASpotlightPlayer } from "@/lib/pga-player-spotlight-data";
import Link from "next/link";

const STORAGE_KEY = "pgaDailyPlayer";
const CACHE_VERSION = 5;

function getTodayKey(): string {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function PGAPlayerSpotlightContent() {
  const [player, setPlayer] = useState<PGASpotlightPlayer | null>(null);

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

    const daily = getDailyPGAPlayer();
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
            <span className="text-sm text-muted-foreground">{player.team}</span>
          </div>
          <p className="text-sm text-muted-foreground">{player.fact}</p>
        </div>
        <Link
          href={`/pga/players/${player.id}`}
          className="group relative overflow-hidden rounded-xl flex justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={player.imageUrl}
            alt={player.name}
            className="rounded-xl transition-transform group-hover:scale-105 w-[200px] sm:w-[250px] lg:w-[300px] h-auto"
          />
        </Link>
      </div>
    </div>
  );
}

export function PGAPlayerSpotlight() {
  return (
    <Suspense fallback={<div className="w-full bg-muted/30 rounded-lg border p-4 h-[200px] animate-pulse" />}>
      <PGAPlayerSpotlightContent />
    </Suspense>
  );
}
