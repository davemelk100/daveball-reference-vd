"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import type { NFLRosterGroup, NFLStandingsEntry } from "@/lib/nfl-api";
import { getPlayerHeadshotUrl } from "@/lib/nfl-api";

interface NFLTeamContentProps {
  team: any;
  roster: NFLRosterGroup[];
  standing: NFLStandingsEntry | null;
}

export function NFLTeamContent({ team, roster, standing }: NFLTeamContentProps) {
  const teamName = team?.displayName || "Unknown Team";
  const logo = team?.logos?.[0]?.href;
  const record = standing
    ? `${standing.wins}-${standing.losses}${standing.ties > 0 ? `-${standing.ties}` : ""}`
    : "—";
  const conference = standing?.team.conference || "—";
  const division = standing?.team.division || "—";
  const pf = standing?.pointsFor ?? "—";
  const pa = standing?.pointsAgainst ?? "—";

  return (
    <div className="container py-6">
      <Link
        href="/nfl/teams"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Teams
      </Link>

      {/* Team Header */}
      <div className="flex items-center gap-4 mb-8">
        {logo ? (
          <Image src={logo} alt={teamName} width={80} height={80} unoptimized />
        ) : (
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">{team?.abbreviation || "?"}</span>
          </div>
        )}
        <div>
          <h1 className="font-league">{teamName}</h1>
          <p className="text-sm text-muted-foreground">{division} &middot; {conference}</p>
        </div>
      </div>

      {/* Season Stats */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mb-8">
        {[
          { label: "Record", value: record },
          { label: "PF", value: String(pf) },
          { label: "PA", value: String(pa) },
          { label: "Streak", value: standing?.streak || "—" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Roster by position group */}
      {roster.map((group) => (
        <div key={group.name} className="mb-6">
          <h2 className="font-league mb-3">{group.name}</h2>
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">#</th>
                      <th className="text-left py-2 pr-4">Name</th>
                      <th className="text-center py-2 px-2">Pos</th>
                      <th className="text-center py-2 px-2 hidden sm:table-cell">Ht</th>
                      <th className="text-center py-2 px-2 hidden sm:table-cell">Wt</th>
                      <th className="text-center py-2 px-2 hidden md:table-cell">Exp</th>
                      <th className="text-left py-2 px-2 hidden md:table-cell">College</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.players.map((p) => (
                      <tr key={p.id} className="border-b last:border-0">
                        <td className="py-2 pr-4">{p.jersey}</td>
                        <td className="py-2 pr-4 font-medium">
                          <Link href={`/nfl/players/${p.id}`} className="flex items-center gap-2 hover:underline">
                            <Image
                              src={p.headshot || getPlayerHeadshotUrl(p.id)}
                              alt={p.fullName}
                              width={28}
                              height={28}
                              className="rounded-full"
                              unoptimized
                            />
                            {p.fullName}
                          </Link>
                        </td>
                        <td className="text-center py-2 px-2">
                          <Badge variant="outline" className="text-xs">{p.position}</Badge>
                        </td>
                        <td className="text-center py-2 px-2 hidden sm:table-cell">{p.height}</td>
                        <td className="text-center py-2 px-2 hidden sm:table-cell">{p.weight}</td>
                        <td className="text-center py-2 px-2 hidden md:table-cell">{p.experience}</td>
                        <td className="text-left py-2 px-2 hidden md:table-cell">{p.college}</td>
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
  );
}
