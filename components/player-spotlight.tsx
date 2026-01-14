"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";
import {
  getDailyPlayer,
  type SpotlightPlayer,
} from "@/lib/player-spotlight-data";
import { getPlayerHeadshotUrl } from "@/lib/mlb-api";
import Image from "next/image";
import Link from "next/link";

export function PlayerSpotlight() {
  const [player, setPlayer] = useState<SpotlightPlayer | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    getDailyPlayer().then(setPlayer);
  }, []);

  if (!player) return null;

  return (
    <div className="w-full h-full bg-muted/30 rounded-lg border p-3 sm:p-4 space-y-2 sm:space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="font-league text-xl sm:text-4xl font-semibold mr-4 text-primary uppercase tracking-wider">
          Daily Random Player
        </h2>
      </div>
      <div className="flex gap-3 sm:gap-6 items-center">
        <Link
          href={`/players/${player.id}`}
          className="shrink-0 group relative overflow-hidden rounded-xl"
        >
          {!imageError ? (
            <Image
              src={
                getPlayerHeadshotUrl(player.id, "medium") || "/placeholder.svg"
              }
              alt={player.name}
              width={213}
              height={213}
              className="w-auto rounded-xl transition-transform group-hover:scale-105"
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            <div className="w-[80px] h-[80px] sm:w-[200px] sm:h-[200px] bg-muted flex items-center justify-center rounded-xl">
              <User className="h-8 w-8 sm:h-16 sm:w-16 text-muted-foreground" />
            </div>
          )}
        </Link>
        <div className="space-y-1 sm:space-y-3 flex-1 min-w-0">
          <div>
            <Link
              href={`/players/${player.id}`}
              className="text-base sm:text-2xl font-bold hover:underline decoration-primary decoration-2 underline-offset-4 block"
            >
              {player.name}
            </Link>
            <div className="flex flex-wrap gap-x-2 text-sm sm:text-base text-muted-foreground mt-1">
              <span>{player.position}</span>
              <span>•</span>
              <span>{player.team}</span>
              <span className="hidden sm:inline">
                <span className="mr-2">•</span>
                {player.years}
              </span>
              {player.birthplace && (
                <span className="hidden sm:inline">
                  <span className="mr-2">•</span>
                  {player.birthplace}
                </span>
              )}
            </div>
          </div>

          {player.careerStats && (
            <div className="hidden sm:block text-sm font-medium text-foreground bg-muted/50 px-3 py-2 rounded-lg">
              {player.careerStats}
            </div>
          )}

          {player.fact && (
            <p className="hidden sm:block text-sm text-muted-foreground leading-relaxed">
              {player.fact}
            </p>
          )}

          {player.highlights && player.highlights.length > 0 && (
            <div className="hidden sm:block space-y-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Career Highlights
              </span>
              <ul className="text-sm text-muted-foreground space-y-0.5">
                {player.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
