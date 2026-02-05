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
                  <th className="text-center py-2 px-2 font-bold">{statLabel[activeTab]}</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((player, i) => (
                  <tr key={player.id} className="border-b last:border-0">
                    <td className="py-2 pr-2 text-muted-foreground">{i + 1}</td>
                    <td className="py-2 pr-4">
                      <Link
                        href={`/nhl/players/${player.id}`}
                        className="flex items-center gap-2 hover:underline"
                      >
                        <Image
                          src={player.headshot}
                          alt={`${player.firstName.default} ${player.lastName.default}`}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="font-medium">
                          {player.firstName.default} {player.lastName.default}
                        </span>
                      </Link>
                    </td>
                    <td className="py-2 px-2 text-muted-foreground">{player.teamAbbrev}</td>
                    <td className="text-center py-2 px-2">
                      <Badge variant="outline" className="text-xs">{player.position}</Badge>
                    </td>
                    <td className="text-center py-2 px-2 font-bold text-lg">{player.value}</td>
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
