"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { NHLTriviaPanel } from "@/components/nhl/nhl-trivia-panel";
import { NHLPlayerSpotlight } from "@/components/nhl/nhl-player-spotlight";

interface LeaderEntry {
  label: string;
  player: {
    id: number;
    firstName: { default: string };
    lastName: { default: string };
    sweaterNumber: number;
    teamAbbrev: string;
    headshot: string;
    position: string;
    value: number;
  } | null;
}

interface StandingsEntry {
  team: string;
  abbrev: string;
  logo: string;
  w: number;
  l: number;
  otl: number;
  pts: number;
  division: string;
}

interface NHLDashboardContentProps {
  leaders: LeaderEntry[];
  standings: StandingsEntry[];
}

export function NHLDashboardContent({ leaders, standings }: NHLDashboardContentProps) {
  return (
    <div className="container py-2">
      {/* Daily Trivia + Player of the Day */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <NHLTriviaPanel />
        <NHLPlayerSpotlight />
      </div>

      {/* Leaders */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-league">League Leaders</h2>
          <Link href="/nhl/players" className="text-sm text-muted-foreground hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {leaders.map((leader) => (
            <Card key={leader.label}>
              <CardContent className="p-4 text-center">
                {leader.player ? (
                  <Link href={`/nhl/players/${leader.player.id}`}>
                    <Image
                      src={leader.player.headshot}
                      alt={`${leader.player.firstName.default} ${leader.player.lastName.default}`}
                      width={64}
                      height={64}
                      className="rounded-full mx-auto mb-3"
                    />
                    <p className="font-medium text-sm">
                      {leader.player.firstName.default} {leader.player.lastName.default}
                    </p>
                    <p className="text-xs text-muted-foreground">{leader.player.teamAbbrev}</p>
                    <p className="text-2xl font-bold mt-2">{leader.player.value}</p>
                  </Link>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-3" />
                    <p className="font-medium text-sm">—</p>
                    <p className="text-2xl font-bold mt-2">0</p>
                  </>
                )}
                <p className="text-xs text-muted-foreground">{leader.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Standings Preview */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-league">Standings</h2>
          <Link href="/nhl/standings" className="text-sm text-muted-foreground hover:underline">
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
                    <th className="text-center py-2 px-2">OTL</th>
                    <th className="text-center py-2 px-2">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((team) => (
                    <tr key={team.abbrev} className="border-b last:border-0">
                      <td className="py-2 pr-4">
                        <Link
                          href={`/nhl/teams/${team.abbrev}`}
                          className="flex items-center gap-2 hover:underline"
                        >
                          <Image
                            src={team.logo}
                            alt={team.team}
                            width={24}
                            height={24}
                            className="flex-shrink-0"
                          />
                          <span className="font-medium">{team.team}</span>
                          <span className="text-xs text-muted-foreground">{team.division}</span>
                        </Link>
                      </td>
                      <td className="text-center py-2 px-2">{team.w}</td>
                      <td className="text-center py-2 px-2">{team.l}</td>
                      <td className="text-center py-2 px-2">{team.otl}</td>
                      <td className="text-center py-2 px-2 font-bold">{team.pts}</td>
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
