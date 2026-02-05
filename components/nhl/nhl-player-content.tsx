"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import type { NHLPlayerLanding } from "@/lib/nhl-api";

interface NHLPlayerContentProps {
  player: NHLPlayerLanding;
}

function formatHeight(inches?: number): string {
  if (!inches) return "—";
  const ft = Math.floor(inches / 12);
  const rem = inches % 12;
  return `${ft}'${rem}"`;
}

function formatSeason(seasonId: number): string {
  const s = String(seasonId);
  if (s.length !== 8) return s;
  return `${s.slice(0, 4)}-${s.slice(6)}`;
}

export function NHLPlayerContent({ player }: NHLPlayerContentProps) {
  const fullName = `${player.firstName.default} ${player.lastName.default}`;
  const isGoalie = player.position === "G";

  // Filter to NHL regular season stats only
  const nhlSeasons = (player.seasonTotals || []).filter(
    (s: any) => s.leagueAbbrev === "NHL" && s.gameTypeId === 2
  );

  return (
    <div className="container py-6">
      <Link
        href="/nhl/players"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Players
      </Link>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Left: player photo + bio */}
        <div>
          <div className="w-full aspect-square bg-muted/30 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            <Image
              src={player.headshot}
              alt={fullName}
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
          <h1 className="font-league mb-2">{fullName}</h1>
          <div className="flex gap-2 mb-3">
            <Badge variant="outline">{player.position}</Badge>
            {player.sweaterNumber != null && (
              <Badge variant="outline">#{player.sweaterNumber}</Badge>
            )}
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            {player.fullTeamName && <p>Team: {player.fullTeamName.default}</p>}
            <p>Height: {formatHeight(player.heightInInches)}</p>
            {player.weightInPounds && <p>Weight: {player.weightInPounds} lbs</p>}
            {player.birthDate && <p>Born: {player.birthDate}</p>}
            {player.birthCity && (
              <p>
                Birthplace: {player.birthCity.default}
                {player.birthCountry ? `, ${player.birthCountry}` : ""}
              </p>
            )}
            {player.shootsCatches && (
              <p>{isGoalie ? "Catches" : "Shoots"}: {player.shootsCatches}</p>
            )}
            {player.draftDetails && (
              <p>
                Draft: {player.draftDetails.year} R{player.draftDetails.round} #{player.draftDetails.overallPick} ({player.draftDetails.teamAbbrev})
              </p>
            )}
          </div>
        </div>

        {/* Right: stats tables */}
        <div>
          <h2 className="font-league mb-4">Career Statistics</h2>
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                {isGoalie ? (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4">Season</th>
                        <th className="text-left py-2 pr-4">Team</th>
                        <th className="text-center py-2 px-2">GP</th>
                        <th className="text-center py-2 px-2">W</th>
                        <th className="text-center py-2 px-2">L</th>
                        <th className="text-center py-2 px-2">OTL</th>
                        <th className="text-center py-2 px-2">GAA</th>
                        <th className="text-center py-2 px-2">SV%</th>
                        <th className="text-center py-2 px-2">SO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nhlSeasons.map((s: any, i: number) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="py-2 pr-4 font-medium">{formatSeason(s.season)}</td>
                          <td className="py-2 pr-4">{s.teamName?.default || "—"}</td>
                          <td className="text-center py-2 px-2">{s.gamesPlayed}</td>
                          <td className="text-center py-2 px-2">{s.wins}</td>
                          <td className="text-center py-2 px-2">{s.losses}</td>
                          <td className="text-center py-2 px-2">{s.otLosses ?? "—"}</td>
                          <td className="text-center py-2 px-2">{s.goalsAgainstAvg?.toFixed(2) ?? "—"}</td>
                          <td className="text-center py-2 px-2">{s.savePctg != null ? (s.savePctg).toFixed(3) : "—"}</td>
                          <td className="text-center py-2 px-2">{s.shutouts ?? 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4">Season</th>
                        <th className="text-left py-2 pr-4">Team</th>
                        <th className="text-center py-2 px-2">GP</th>
                        <th className="text-center py-2 px-2">G</th>
                        <th className="text-center py-2 px-2">A</th>
                        <th className="text-center py-2 px-2">PTS</th>
                        <th className="text-center py-2 px-2">+/-</th>
                        <th className="text-center py-2 px-2">PIM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nhlSeasons.map((s: any, i: number) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="py-2 pr-4 font-medium">{formatSeason(s.season)}</td>
                          <td className="py-2 pr-4">{s.teamName?.default || "—"}</td>
                          <td className="text-center py-2 px-2">{s.gamesPlayed}</td>
                          <td className="text-center py-2 px-2">{s.goals}</td>
                          <td className="text-center py-2 px-2">{s.assists}</td>
                          <td className="text-center py-2 px-2 font-bold">{s.points}</td>
                          <td className="text-center py-2 px-2">{s.plusMinus ?? "—"}</td>
                          <td className="text-center py-2 px-2">{s.pim ?? 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
