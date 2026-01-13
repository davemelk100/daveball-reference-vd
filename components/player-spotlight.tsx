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
    setPlayer(getDailyPlayer());
  }, []);

  if (!player) return null;

  return (
    <div className="w-full h-full bg-muted/30 rounded-lg border p-4 space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="font-league text-3xl font-semibold mr-4 text-primary uppercase tracking-wider">
          Daily Random Player
        </h2>
      </div>
      <div className="flex gap-6 items-center">
        <Link
          href={`/players/${player.id}`}
          className="shrink-0 group relative overflow-hidden rounded-xl"
        >
          {!imageError ? (
            <Image
              src={
                getPlayerHeadshotUrl(player.id, "large") || "/placeholder.svg"
              }
              alt={player.name}
              width={180}
              height={180}
              style={{ width: "auto", height: "180px" }}
              className="rounded-xl transition-transform group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-[180px] h-[180px] bg-muted flex items-center justify-center rounded-xl">
              <User className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
        </Link>
        <div className="space-y-2 flex-1 min-w-0">
          <Link
            href={`/players/${player.id}`}
            className="text-2xl font-bold hover:underline decoration-primary decoration-2 underline-offset-4 block"
          >
            {player.name}
          </Link>
          <div className="flex flex-wrap gap-x-2 text-base text-muted-foreground">
            <span>{player.team}</span>
            <span>•</span>
            <span>{player.position}</span>
            <span>•</span>
            <span>{player.years}</span>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed">
            {player.fact}
          </p>
        </div>
      </div>
    </div>
  );
}
