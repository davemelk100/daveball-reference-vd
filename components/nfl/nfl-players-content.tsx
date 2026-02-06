"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NFLLeaderCategory } from "@/lib/nfl-api";

interface NFLPlayersContentProps {
  leaderCategories: NFLLeaderCategory[];
}

export function NFLPlayersContent({ leaderCategories }: NFLPlayersContentProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (leaderCategories.length === 0) {
    return (
      <div className="container py-6">
        <h1 className="font-league mb-6">Players</h1>
        <p className="text-muted-foreground">No leader data available.</p>
      </div>
    );
  }

  const activeCategory = leaderCategories[activeTab];

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Players</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
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

      {/* Leader table */}
      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-2 w-8">#</th>
                  <th className="text-left py-2 pr-4">Player</th>
                  <th className="text-left py-2 px-2">Team</th>
                  <th className="text-center py-2 px-2">Pos</th>
                  <th className="text-center py-2 px-2 font-bold">{activeCategory?.displayName || "Stat"}</th>
                </tr>
              </thead>
              <tbody>
                {activeCategory?.leaders.map((player, i) => (
                  <tr key={player.id} className="border-b last:border-0">
                    <td className="py-2 pr-2 text-muted-foreground">{i + 1}</td>
                    <td className="py-2 pr-4">
                      <Link
                        href={`/nfl/players/${player.id}`}
                        className="flex items-center gap-2 hover:underline"
                      >
                        <Image
                          src={player.headshot}
                          alt={player.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                          unoptimized
                        />
                        <span className="font-medium">{player.name}</span>
                      </Link>
                    </td>
                    <td className="py-2 px-2 text-muted-foreground">{player.teamAbbrev}</td>
                    <td className="text-center py-2 px-2">
                      <Badge variant="outline" className="text-xs">{player.position}</Badge>
                    </td>
                    <td className="text-center py-2 px-2 font-bold text-lg">{player.displayValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
