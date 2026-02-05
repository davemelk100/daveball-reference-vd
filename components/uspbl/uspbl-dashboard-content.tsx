"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { USPBLTriviaPanel } from "@/components/uspbl/uspbl-trivia-panel";
import { USPBLPlayerSpotlight } from "@/components/uspbl/uspbl-player-spotlight";
import type { USPBLTeam, USPBLStandingsEntry } from "@/lib/uspbl-api";

interface USPBLDashboardContentProps {
  standings: USPBLStandingsEntry[];
  teams: USPBLTeam[];
}

export function USPBLDashboardContent({ standings, teams }: USPBLDashboardContentProps) {
  return (
    <div className="container py-2">
      {/* Daily Trivia + Player of the Day */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <USPBLTriviaPanel />
        <USPBLPlayerSpotlight />
      </div>

      {/* Teams */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-league">Teams</h2>
          <Link href="/uspbl/teams" className="text-sm text-muted-foreground hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {teams.map((team) => (
            <Link key={team.slug} href={`/uspbl/teams/${team.slug}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4 text-center">
                  {team.logoUrl.startsWith("http") ? (
                    <Image
                      src={team.logoUrl}
                      alt={team.name}
                      width={64}
                      height={64}
                      className="mx-auto mb-3 h-16 w-auto"
                    />
                  ) : (
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: team.color }}
                    >
                      {team.abbreviation}
                    </div>
                  )}
                  <p className="font-medium text-sm">{team.name}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Standings */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-league">Standings</h2>
          <Link href="/uspbl/standings" className="text-sm text-muted-foreground hover:underline">
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
                    <th className="text-center py-2 px-2">PCT</th>
                    <th className="text-center py-2 px-2">GB</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((entry) => (
                    <tr key={entry.teamSlug} className="border-b last:border-0">
                      <td className="py-2 pr-4">
                        <Link
                          href={`/uspbl/teams/${entry.teamSlug}`}
                          className="flex items-center gap-2 hover:underline"
                        >
                          <span className="font-medium">{entry.team}</span>
                        </Link>
                      </td>
                      <td className="text-center py-2 px-2">{entry.w}</td>
                      <td className="text-center py-2 px-2">{entry.l}</td>
                      <td className="text-center py-2 px-2 font-bold">{entry.pct}</td>
                      <td className="text-center py-2 px-2">{entry.gb}</td>
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
