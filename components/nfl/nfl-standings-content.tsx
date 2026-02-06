"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import type { NFLDivisionStandings } from "@/lib/nfl-api";

interface NFLStandingsContentProps {
  standings: NFLDivisionStandings[];
}

export function NFLStandingsContent({ standings }: NFLStandingsContentProps) {
  const [activeConference, setActiveConference] = useState<"all" | "afc" | "nfc">("all");

  const afc = standings.filter((d) =>
    d.conference.toUpperCase().includes("AFC") ||
    d.conference.toUpperCase().includes("AMERICAN")
  );
  const nfc = standings.filter((d) =>
    d.conference.toUpperCase().includes("NFC") ||
    d.conference.toUpperCase().includes("NATIONAL")
  );

  const displayDivisions =
    activeConference === "afc" ? afc :
    activeConference === "nfc" ? nfc :
    standings;

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Standings</h1>

      {/* Conference tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "all", label: "All" },
          { key: "afc", label: "AFC" },
          { key: "nfc", label: "NFC" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveConference(tab.key as any)}
            className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
              activeConference === tab.key
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted/50 text-muted-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {displayDivisions.map((division) => (
          <div key={division.division}>
            <h2 className="font-league text-lg mb-3">
              {division.division}
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
                        <th className="text-center py-2 px-2">T</th>
                        <th className="text-center py-2 px-2 font-bold">PCT</th>
                        <th className="text-center py-2 px-2">PF</th>
                        <th className="text-center py-2 px-2">PA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {division.entries.map((entry, i) => (
                        <tr key={entry.team.id} className="border-b last:border-0">
                          <td className="py-2 pr-4">
                            <Link
                              href={`/nfl/teams/${entry.team.id}`}
                              className="flex items-center gap-2 hover:underline"
                            >
                              <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                              <Image
                                src={entry.team.logoUrl}
                                alt={entry.team.displayName}
                                width={24}
                                height={24}
                                className="flex-shrink-0"
                                unoptimized
                              />
                              <span className="font-medium">{entry.team.displayName}</span>
                            </Link>
                          </td>
                          <td className="text-center py-2 px-2">{entry.wins}</td>
                          <td className="text-center py-2 px-2">{entry.losses}</td>
                          <td className="text-center py-2 px-2">{entry.ties}</td>
                          <td className="text-center py-2 px-2 font-bold">
                            {parseFloat(entry.pct) ? parseFloat(entry.pct).toFixed(3) : entry.pct}
                          </td>
                          <td className="text-center py-2 px-2">{entry.pointsFor}</td>
                          <td className="text-center py-2 px-2">{entry.pointsAgainst}</td>
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
