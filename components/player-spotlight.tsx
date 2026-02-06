"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Hand, Users, Loader2 } from "lucide-react";
import {
  getDailyPlayer,
  type SpotlightPlayer,
} from "@/lib/player-spotlight-data";
import { getPlayerHeadshotUrl } from "@/lib/mlb-api";
import Image from "next/image";
import Link from "next/link";

const STORAGE_KEY = "dailyRandomPlayer";

function getTodayKey(): string {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

export function PlayerSpotlight() {
  const [player, setPlayer] = useState<SpotlightPlayer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const todayKey = getTodayKey();

    // Check localStorage for cached player
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const { date, player: cachedPlayer } = JSON.parse(cached);
        if (date === todayKey && cachedPlayer) {
          setPlayer(cachedPlayer);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Ignore localStorage errors
    }

    // Fetch new player and cache it
    getDailyPlayer()
      .then((newPlayer) => {
        setPlayer(newPlayer);
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ date: todayKey, player: newPlayer }),
          );
        } catch {
          // Ignore localStorage errors
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full bg-muted/30 rounded-lg border p-3 sm:p-4 space-y-2 sm:space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="mr-4 text-primary">Daily Random Player</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!player) return null;

  return (
    <div className="w-full h-full bg-muted/30 rounded-lg border p-3 sm:p-4 space-y-2 sm:space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="mr-4 text-primary">Daily Random Player</h2>
      </div>
      <div className="flex gap-3 sm:gap-6 items-center">
        <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
          <div>
            <Link
              href={`/mlb/players/${player.id}`}
              className="text-base sm:text-2xl font-bold hover:underline decoration-primary decoration-2 underline-offset-4 block"
            >
              {player.name}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {player.team} • {player.position}
            </p>
          </div>

          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{player.years}</span>
            </div>
            {player.birthplace && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{player.birthplace}</span>
              </div>
            )}
            {player.bats && (
              <div className="flex items-center gap-1">
                <Hand className="h-4 w-4" />
                <span>Bats {player.bats}</span>
              </div>
            )}
            {player.throws && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Throws {player.throws}</span>
              </div>
            )}
          </div>

          {player.careerStats && (
            <div className="hidden sm:block">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Career Stats
              </span>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground mt-1">
                {player.careerStats.isPitcher ? (
                  <>
                    {player.careerStats.wins !== undefined &&
                      player.careerStats.losses !== undefined && (
                        <span>
                          <strong>
                            {player.careerStats.wins}-
                            {player.careerStats.losses}
                          </strong>{" "}
                          W-L
                        </span>
                      )}
                    {player.careerStats.era && (
                      <span>
                        <strong>{player.careerStats.era}</strong> ERA
                      </span>
                    )}
                    {player.careerStats.strikeouts !== undefined && (
                      <span>
                        <strong>
                          {player.careerStats.strikeouts.toLocaleString()}
                        </strong>{" "}
                        K
                      </span>
                    )}
                    {player.careerStats.saves !== undefined && (
                      <span>
                        <strong>{player.careerStats.saves}</strong> SV
                      </span>
                    )}
                    {player.careerStats.inningsPitched && (
                      <span>
                        <strong>{player.careerStats.inningsPitched}</strong> IP
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    {player.careerStats.avg && (
                      <span>
                        <strong>{player.careerStats.avg}</strong> AVG
                      </span>
                    )}
                    {player.careerStats.hr !== undefined && (
                      <span>
                        <strong>
                          {player.careerStats.hr.toLocaleString()}
                        </strong>{" "}
                        HR
                      </span>
                    )}
                    {player.careerStats.rbi !== undefined && (
                      <span>
                        <strong>
                          {player.careerStats.rbi.toLocaleString()}
                        </strong>{" "}
                        RBI
                      </span>
                    )}
                    {player.careerStats.hits !== undefined && (
                      <span>
                        <strong>
                          {player.careerStats.hits.toLocaleString()}
                        </strong>{" "}
                        H
                      </span>
                    )}
                    {player.careerStats.sb !== undefined && (
                      <span>
                        <strong>
                          {player.careerStats.sb.toLocaleString()}
                        </strong>{" "}
                        SB
                      </span>
                    )}
                    {player.careerStats.games !== undefined && (
                      <span>
                        <strong>
                          {player.careerStats.games.toLocaleString()}
                        </strong>{" "}
                        G
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <Link
          href={`/mlb/players/${player.id}`}
          className="shrink-0 group relative overflow-hidden rounded-xl"
        >
          <Image
            src={getPlayerHeadshotUrl(player.id, "large")}
            alt={player.name}
            width={275}
            height={275}
            className="rounded-xl transition-transform group-hover:scale-105 w-[70px] sm:w-[200px] md:w-[250px] lg:w-[300px] h-auto"
            priority
          />
        </Link>
      </div>
    </div>
  );
}
