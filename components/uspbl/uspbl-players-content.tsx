"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { USPBLPlayer } from "@/lib/uspbl-api";

interface USPBLPlayersContentProps {
  players: USPBLPlayer[];
}

export function USPBLPlayersContent({ players }: USPBLPlayersContentProps) {
  const [filter, setFilter] = useState<string>("all");

  const teamNames = [...new Set(players.map((p) => p.teamName))].sort();
  const filtered = filter === "all" ? players : players.filter((p) => p.teamName === filter);

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Players</h1>

      {/* Team filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 text-sm rounded-lg border transition-colors whitespace-nowrap ${
            filter === "all"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted/50 text-muted-foreground"
          }`}
        >
          All Teams
        </button>
        {teamNames.map((name) => (
          <button
            key={name}
            onClick={() => setFilter(name)}
            className={`px-4 py-2 text-sm rounded-lg border transition-colors whitespace-nowrap ${
              filter === name
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted/50 text-muted-foreground"
            }`}
          >
            {name.split(" ").pop()}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              No players available yet. Check back when the season begins.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((player) => (
            <Link key={player.id} href={`/uspbl/players/${player.id}`}>
              <Card className="hover:bg-secondary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-1.5 pl-3">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 h-24 w-20 rounded-lg bg-muted/30 flex items-center justify-center">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {player.number || "—"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{player.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {player.teamName.split(" ").pop()}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="secondary">{player.position}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
