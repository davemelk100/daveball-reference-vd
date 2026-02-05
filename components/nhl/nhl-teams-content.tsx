"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { NHLTeam } from "@/lib/nhl-api";

const DIVISION_ORDER = ["Atlantic", "Metropolitan", "Central", "Pacific"];
const CONFERENCE_MAP: Record<string, string> = {
  Atlantic: "Eastern",
  Metropolitan: "Eastern",
  Central: "Western",
  Pacific: "Western",
};

interface NHLTeamsContentProps {
  standings: NHLTeam[];
}

export function NHLTeamsContent({ standings }: NHLTeamsContentProps) {
  const divisions = DIVISION_ORDER.map((name) => ({
    name,
    conference: CONFERENCE_MAP[name],
    teams: standings
      .filter((t) => t.divisionName === name)
      .sort((a, b) => a.teamName.default.localeCompare(b.teamName.default)),
  }));

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Teams</h1>

      {divisions.map((division) => (
        <div key={division.name} className="mb-8">
          <h2 className="font-league text-xl mb-3">
            {division.name} Division
            <span className="text-sm text-muted-foreground ml-2 font-normal normal-case">
              {division.conference} Conference
            </span>
          </h2>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {division.teams.map((team) => (
              <Link key={team.teamAbbrev.default} href={`/nhl/teams/${team.teamAbbrev.default}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Image
                      src={team.teamLogo}
                      alt={team.teamName.default}
                      width={40}
                      height={40}
                      className="flex-shrink-0"
                    />
                    <span className="text-sm font-medium">{team.teamName.default}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
