"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { NFLTriviaPanel } from "@/components/nfl/nfl-trivia-panel";
import { NFLPlayerSpotlight } from "@/components/nfl/nfl-player-spotlight";
import type { NFLLeaderEntry } from "@/lib/nfl-api";

interface LeaderItem {
  label: string;
  leader: NFLLeaderEntry | null;
}

interface StandingsEntry {
  team: string;
  abbrev: string;
  logo: string;
  w: number;
  l: number;
  t: number;
  division: string;
  conference: string;
}

interface NFLDashboardContentProps {
  leaders: LeaderItem[];
  standings: StandingsEntry[];
}

export function NFLDashboardContent({ leaders, standings }: NFLDashboardContentProps) {
  return (
    <div className="container py-2">
      {/* Daily Trivia + Player of the Day */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <NFLTriviaPanel />
        <NFLPlayerSpotlight />
      </div>

      {/* Leaders */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-league">League Leaders</h2>
          <Link href="/nfl/players" className="text-sm text-muted-foreground hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {leaders.map((item) => (
            <Card key={item.label}>
              <CardContent className="p-4 text-center">
                {item.leader ? (
                  <Link href={`/nfl/players/${item.leader.id}`}>
                    <Image
                      src={item.leader.headshot}
                      alt={item.leader.name}
                      width={64}
                      height={64}
                      className="rounded-full mx-auto mb-3"
                      unoptimized
                    />
                    <p className="font-medium text-sm">{item.leader.name}</p>
                    <p className="text-xs text-muted-foreground">{item.leader.teamAbbrev}</p>
                    <p className="text-2xl font-bold mt-2">{item.leader.displayValue}</p>
                  </Link>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-3" />
                    <p className="font-medium text-sm">—</p>
                    <p className="text-2xl font-bold mt-2">0</p>
                  </>
                )}
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Standings Preview */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-league">Standings</h2>
          <Link href="/nfl/standings" className="text-sm text-muted-foreground hover:underline">
            View full
          </Link>
        </div>
        <Card>
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">Team</th>
                    <th className="text-center py-2 px-2">W</th>
                    <th className="text-center py-2 px-2">L</th>
                    <th className="text-center py-2 px-2">T</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((team) => (
                    <tr key={`${team.abbrev}-${team.division}`} className="border-b last:border-0">
                      <td className="py-2 pr-4">
                        <Link
                          href={`/nfl/teams`}
                          className="flex items-center gap-2 hover:underline"
                        >
                          <Image
                            src={team.logo}
                            alt={team.team}
                            width={24}
                            height={24}
                            className="flex-shrink-0"
                            unoptimized
                          />
                          <span className="font-medium">{team.team}</span>
                          <span className="text-xs text-muted-foreground">{team.division}</span>
                        </Link>
                      </td>
                      <td className="text-center py-2 px-2">{team.w}</td>
                      <td className="text-center py-2 px-2">{team.l}</td>
                      <td className="text-center py-2 px-2">{team.t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
