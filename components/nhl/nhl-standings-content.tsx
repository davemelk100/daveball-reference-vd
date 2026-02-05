"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import type { NHLTeam } from "@/lib/nhl-api";

const DIVISION_ORDER = ["Atlantic", "Metropolitan", "Central", "Pacific"];
const CONFERENCE_MAP: Record<string, string> = {
  Atlantic: "Eastern",
  Metropolitan: "Eastern",
  Central: "Western",
  Pacific: "Western",
};

interface NHLStandingsContentProps {
  initialStandings: NHLTeam[];
}

export function NHLStandingsContent({ initialStandings }: NHLStandingsContentProps) {
  const divisions = DIVISION_ORDER.map((name) => ({
    name,
    conference: CONFERENCE_MAP[name],
    teams: initialStandings
      .filter((t) => t.divisionName === name)
      .sort((a, b) => b.points - a.points),
  }));

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Standings</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {divisions.map((division) => (
          <div key={division.name}>
            <h2 className="font-league text-lg mb-3">
              {division.name}
              <span className="text-sm text-muted-foreground ml-2 font-normal normal-case">
                {division.conference}
              </span>
            </h2>
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
                        <th className="text-center py-2 px-2 font-bold">PTS</th>
                        <th className="text-center py-2 px-2">GF</th>
                        <th className="text-center py-2 px-2">GA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {division.teams.map((team, i) => (
                        <tr key={team.teamAbbrev.default} className="border-b last:border-0">
                          <td className="py-2 pr-4">
                            <Link
                              href={`/nhl/teams/${team.teamAbbrev.default}`}
                              className="flex items-center gap-2 hover:underline"
                            >
                              <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                              <Image
                                src={team.teamLogo}
                                alt={team.teamName.default}
                                width={24}
                                height={24}
                                className="flex-shrink-0"
                              />
                              <span className="font-medium">{team.teamName.default}</span>
                            </Link>
                          </td>
                          <td className="text-center py-2 px-2">{team.wins}</td>
                          <td className="text-center py-2 px-2">{team.losses}</td>
                          <td className="text-center py-2 px-2">{team.otLosses}</td>
                          <td className="text-center py-2 px-2 font-bold">{team.points}</td>
                          <td className="text-center py-2 px-2">{team.goalFor}</td>
                          <td className="text-center py-2 px-2">{team.goalAgainst}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
