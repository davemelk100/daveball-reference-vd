"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Star } from "lucide-react";
import type { USPBLTeam, USPBLPlayer, USPBLStandingsEntry, USPBLMLBAlumni } from "@/lib/uspbl-api";

interface USPBLTeamContentProps {
  team: USPBLTeam | null;
  roster: USPBLPlayer[];
  standing: USPBLStandingsEntry | null;
  championshipCount: number;
  championshipYears: number[];
  mlbAlumni: USPBLMLBAlumni[];
}

export function USPBLTeamContent({ team, roster, standing, championshipCount, championshipYears, mlbAlumni }: USPBLTeamContentProps) {
  if (!team) {
    return (
      <div className="container py-6">
        <Link
          href="/uspbl/teams"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Teams
        </Link>
        <p className="text-muted-foreground">Team not found.</p>
      </div>
    );
  }

  const record = standing ? `${standing.w}-${standing.l}${standing.t > 0 ? `-${standing.t}` : ""}` : "0-0";

  return (
    <div className="container py-6">
      <Link
        href="/uspbl/teams"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Teams
      </Link>

      {/* Team Header */}
      <div className="flex items-center gap-4 mb-8">
        {team.logoUrl.startsWith("http") ? (
          <Image src={team.logoUrl} alt={team.name} width={80} height={80} className="h-20 w-auto" />
        ) : (
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: team.color }}
          >
            {team.abbreviation}
          </div>
        )}
        <div>
          <h1 className="font-league">{team.name}</h1>
          <p className="text-sm text-muted-foreground">UWM Field &middot; Utica, MI</p>
          {championshipCount > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <Trophy className="h-3.5 w-3.5 text-yellow-500" />
              <span className="text-sm text-muted-foreground">
                {championshipCount}x Champion ({championshipYears.join(", ")})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Season Stats */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mb-8">
        {[
          { label: "Record", value: record },
          { label: "PCT", value: standing?.pct || ".000" },
          { label: "Championships", value: String(championshipCount) },
          { label: "MLB Signees", value: String(mlbAlumni.length) },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MLB Alumni */}
      {mlbAlumni.length > 0 && (
        <>
          <h2 className="font-league mb-3">MLB Signees</h2>
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">Player</th>
                      <th className="text-left py-2 px-2">Organization</th>
                      <th className="text-center py-2 px-2">Year</th>
                      <th className="text-center py-2 px-2">MLB</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mlbAlumni.map((player) => (
                      <tr key={player.name} className="border-b last:border-0">
                        <td className="py-2 pr-4 font-medium">
                          <div className="flex items-center gap-2">
                            {player.madeMLBRoster && <Star className="h-3 w-3 text-yellow-500 flex-shrink-0" />}
                            {player.name}
                          </div>
                        </td>
                        <td className="py-2 px-2 text-muted-foreground">{player.mlbOrganization}</td>
                        <td className="text-center py-2 px-2">{player.yearSigned}</td>
                        <td className="text-center py-2 px-2">
                          {player.madeMLBRoster ? (
                            <Badge variant="secondary" className="text-[10px]">MLB</Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">MiLB</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Roster */}
      <h2 className="font-league mb-3">Roster</h2>
      {roster.length === 0 ? (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Roster not yet available. Check back when the season begins.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">#</th>
                    <th className="text-left py-2 pr-4">Name</th>
                    <th className="text-center py-2 px-2">Pos</th>
                    <th className="text-left py-2 px-2 hidden sm:table-cell">B/T</th>
                    <th className="text-left py-2 px-2 hidden md:table-cell">College</th>
                  </tr>
                </thead>
                <tbody>
                  {roster.map((player) => (
                    <tr key={player.id} className="border-b last:border-0">
                      <td className="py-2 pr-4">{player.number || "—"}</td>
                      <td className="py-2 pr-4 font-medium">
                        <Link href={`/uspbl/players/${player.id}`} className="hover:underline">
                          {player.name}
                        </Link>
                      </td>
                      <td className="text-center py-2 px-2">
                        <Badge variant="outline" className="text-xs">{player.position}</Badge>
                      </td>
                      <td className="py-2 px-2 text-muted-foreground hidden sm:table-cell">
                        {player.bats && player.throws ? `${player.bats}/${player.throws}` : "—"}
                      </td>
                      <td className="py-2 px-2 text-muted-foreground hidden md:table-cell">
                        {player.college || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
