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
      <div className="flex flex-wrap gap-2 mb-6">
        {leaderCategories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-sm rounded-lg border transition-colors whitespace-nowrap ${
              activeTab === i
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            {cat.displayName}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {activeCategory?.leaders.map((player) => (
          <Link key={player.id} href={`/nfl/players/${player.id}`}>
            <Card className="hover:bg-secondary/80 transition-colors cursor-pointer h-full">
              <CardContent className="p-1.5 pl-3">
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    <Image
                      src={player.headshot}
                      alt={player.name}
                      width={96}
                      height={96}
                      className="rounded-lg h-24 w-auto"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{player.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{player.teamAbbrev}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary">{player.position}</Badge>
                    </div>
                    <p className="text-sm font-bold mt-1">{player.displayValue}</p>
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
