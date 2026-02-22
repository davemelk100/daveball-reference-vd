"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PGAPlayerHeadshot } from "@/components/pga/pga-player-headshot";
import type { PGALeaderCategory, PGALeaderEntry } from "@/lib/pga-api";

const ALL_PLAYERS_TAB = -1;

interface PGAPlayersContentProps {
  leaderCategories: PGALeaderCategory[];
  allPlayers: PGALeaderEntry[];
}

export function PGAPlayersContent({ leaderCategories, allPlayers: serverPlayers }: PGAPlayersContentProps) {
  const [activeTab, setActiveTab] = useState(ALL_PLAYERS_TAB);

  // Merge server all-players with leader entries (leaders may have players not in current tournament)
  const allPlayers = useMemo(() => {
    const map = new Map<string, PGALeaderEntry>();
    for (const p of serverPlayers) map.set(p.id, p);
    for (const cat of leaderCategories) {
      for (const p of cat.leaders) {
        if (!map.has(p.id)) map.set(p.id, p);
      }
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [serverPlayers, leaderCategories]);

  if (leaderCategories.length === 0) {
    return (
      <div className="container py-6">
        <h1 className="font-league mb-6">Players</h1>
        <p className="text-muted-foreground">No leader data available.</p>
      </div>
    );
  }

  const activeCategory = activeTab === ALL_PLAYERS_TAB ? null : leaderCategories[activeTab];
  const displayPlayers = activeTab === ALL_PLAYERS_TAB ? allPlayers : (activeCategory?.leaders ?? []);

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Players</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab(ALL_PLAYERS_TAB)}
          className={`px-4 py-2 text-sm rounded-lg border transition-colors whitespace-nowrap ${
            activeTab === ALL_PLAYERS_TAB
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted/50 text-muted-foreground"
          }`}
        >
          All Players ({allPlayers.length})
        </button>
        {leaderCategories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-sm rounded-lg border transition-colors whitespace-nowrap ${
              activeTab === i
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted/50 text-muted-foreground"
            }`}
          >
            {cat.displayName}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayPlayers.map((player) => (
          <Link key={player.id} href={`/pga/players/${player.id}`}>
            <Card className="hover:bg-secondary/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-1.5 pl-3">
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    <PGAPlayerHeadshot src={player.headshot} alt={player.name} size={96} className="rounded-lg h-24" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{player.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary">Golf</Badge>
                    </div>
                    {activeTab !== ALL_PLAYERS_TAB && (
                      <p className="text-sm font-bold mt-1">{player.displayValue}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
