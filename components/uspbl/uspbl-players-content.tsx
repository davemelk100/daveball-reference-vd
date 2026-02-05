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
      <div className="flex gap-2 mb-6 overflow-x-auto">
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
        <Card>
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-2 w-8">#</th>
                    <th className="text-left py-2 pr-4">Player</th>
                    <th className="text-center py-2 px-2">Pos</th>
                    <th className="text-left py-2 px-2">Team</th>
                    <th className="text-left py-2 px-2 hidden sm:table-cell">College</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((player) => (
                    <tr key={player.id} className="border-b last:border-0">
                      <td className="py-2 pr-2 text-muted-foreground">{player.number || "—"}</td>
                      <td className="py-2 pr-4">
                        <Link
                          href={`/uspbl/players/${player.id}`}
                          className="font-medium hover:underline"
                        >
                          {player.name}
                        </Link>
                      </td>
                      <td className="text-center py-2 px-2">
                        <Badge variant="outline" className="text-xs">{player.position}</Badge>
                      </td>
                      <td className="py-2 px-2 text-muted-foreground text-sm">
                        {player.teamName.split(" ").pop()}
                      </td>
                      <td className="py-2 px-2 text-muted-foreground hidden sm:table-cell">
                        {player.college || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
