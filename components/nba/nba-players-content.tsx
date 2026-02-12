"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NBALeaderCategory } from "@/lib/nba-api";
import { getPlayerHeadshotUrl } from "@/lib/nba-api";

interface NBAPlayersContentProps {
  leaderCategories: NBALeaderCategory[];
}

export function NBAPlayersContent({ leaderCategories }: NBAPlayersContentProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (leaderCategories.length === 0) {
    return (
      <div className="container py-6">
        <h1 className="font-league mb-6">Stat Leaders</h1>
        <p className="text-muted-foreground">No leader data available.</p>
      </div>
    );
  }

  const activeCategory = leaderCategories[activeTab];

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Stat Leaders</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {leaderCategories.slice(0, 8).map((cat, i) => (
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
        {activeCategory?.leaders.slice(0, 20).map((leader) => (
          <Link key={leader.id} href={`/nba/players/${leader.id}`}>
            <Card className="hover:bg-secondary/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-1.5 pl-3">
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    <Image
                      src={leader.headshot || getPlayerHeadshotUrl(leader.id)}
                      alt={leader.name}
                      width={96}
                      height={96}
                      className="rounded-lg h-24"
                      style={{ width: "auto" }}
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{leader.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{leader.teamAbbrev}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary">{leader.position}</Badge>
                    </div>
                    <p className="text-sm font-bold mt-1">{leader.displayValue}</p>
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
