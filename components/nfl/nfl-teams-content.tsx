"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { NFLDivisionStandings } from "@/lib/nfl-api";

interface NFLTeamsContentProps {
  standings: NFLDivisionStandings[];
}

export function NFLTeamsContent({ standings }: NFLTeamsContentProps) {
  // Group by conference
  const afc = standings.filter((d) =>
    d.conference.toUpperCase().includes("AFC") ||
    d.conference.toUpperCase().includes("AMERICAN")
  );
  const nfc = standings.filter((d) =>
    d.conference.toUpperCase().includes("NFC") ||
    d.conference.toUpperCase().includes("NATIONAL")
  );

  const renderConference = (name: string, divisions: NFLDivisionStandings[]) => (
    <div className="mb-8">
      <h2 className="font-league text-xl mb-4">{name}</h2>
      {divisions.map((division) => (
        <div key={division.division} className="mb-6">
          <h3 className="font-league text-lg mb-3">
            {division.division}
          </h3>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {division.entries.map((entry) => (
              <Link key={entry.team.id} href={`/nfl/teams/${entry.team.id}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Image
                      src={entry.team.logoUrl}
                      alt={entry.team.displayName}
                      width={40}
                      height={40}
                      className="flex-shrink-0"
                      unoptimized
                    />
                    <span className="text-sm font-medium">{entry.team.displayName}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Teams</h1>
      {renderConference("AFC", afc)}
      {renderConference("NFC", nfc)}
    </div>
  );
}
