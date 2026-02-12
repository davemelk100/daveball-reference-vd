"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Leader {
  id: number;
  firstName: { default: string };
  lastName: { default: string };
  sweaterNumber: number;
  teamAbbrev: string;
  headshot: string;
  position: string;
  value: number;
}

interface NHLPlayersContentProps {
  pointsLeaders: Leader[];
  goalsLeaders: Leader[];
  assistsLeaders: Leader[];
  winsLeaders: Leader[];
}

const TABS = [
  { key: "points", label: "Points" },
  { key: "goals", label: "Goals" },
  { key: "assists", label: "Assists" },
  { key: "wins", label: "Wins (G)" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function NHLPlayersContent({
  pointsLeaders,
  goalsLeaders,
  assistsLeaders,
  winsLeaders,
}: NHLPlayersContentProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("points");

  const leaderMap: Record<TabKey, Leader[]> = {
    points: pointsLeaders,
    goals: goalsLeaders,
    assists: assistsLeaders,
    wins: winsLeaders,
  };

  const statLabel: Record<TabKey, string> = {
    points: "PTS",
    goals: "G",
    assists: "A",
    wins: "W",
  };

  const leaders = leaderMap[activeTab];

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Players</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm rounded-lg border transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted/50 text-muted-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {leaders.map((player) => (
          <Link key={player.id} href={`/nhl/players/${player.id}`}>
            <Card className="hover:bg-secondary/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-1.5 pl-3">
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    <Image
                      src={player.headshot}
                      alt={`${player.firstName.default} ${player.lastName.default}`}
                      width={96}
                      height={96}
                      className="rounded-lg h-24"
                      style={{ width: "auto" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">
                      {player.firstName.default} {player.lastName.default}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">{player.teamAbbrev}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary">{player.position}</Badge>
                    </div>
                    <p className="text-sm font-bold mt-1">
                      {player.value} {statLabel[activeTab]}
                    </p>
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
