"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import type { NHLRoster, NHLRosterPlayer, NHLTeam } from "@/lib/nhl-api";

interface NHLTeamContentProps {
  teamAbbrev: string;
  roster: NHLRoster;
  team: NHLTeam | null;
}

export function NHLTeamContent({ teamAbbrev, roster, team }: NHLTeamContentProps) {
  const teamName = team?.teamName.default || teamAbbrev;
  const division = team?.divisionName || "—";
  const conference = team?.conferenceName || "—";
  const record = team ? `${team.wins}-${team.losses}-${team.otLosses}` : "0-0-0";
  const points = team?.points ?? 0;
  const gf = team?.goalFor ?? 0;
  const ga = team?.goalAgainst ?? 0;
  const logo = team?.teamLogo;

  return (
    <div className="container py-6">
      <Link
        href="/nhl/teams"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Teams
      </Link>

      {/* Team Header */}
      <div className="flex items-center gap-4 mb-8">
        {logo ? (
          <Image src={logo} alt={teamName} width={80} height={80} />
        ) : (
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">{teamAbbrev}</span>
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
          { label: "Points", value: String(points) },
          { label: "GF", value: String(gf) },
          { label: "GA", value: String(ga) },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Forwards */}
      <h2 className="font-league mb-3">Forwards</h2>
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">#</th>
                  <th className="text-left py-2 pr-4">Name</th>
                  <th className="text-center py-2 px-2">Pos</th>
                </tr>
              </thead>
              <tbody>
                {roster.forwards.map((p) => (
                  <PlayerRow key={p.id} player={p} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Defensemen */}
      <h2 className="font-league mb-3">Defensemen</h2>
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">#</th>
                  <th className="text-left py-2 pr-4">Name</th>
                  <th className="text-center py-2 px-2">Pos</th>
                </tr>
              </thead>
              <tbody>
                {roster.defensemen.map((p) => (
                  <PlayerRow key={p.id} player={p} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Goalies */}
      <h2 className="font-league mb-3">Goaltenders</h2>
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">#</th>
                  <th className="text-left py-2 pr-4">Name</th>
                  <th className="text-center py-2 px-2">Pos</th>
                </tr>
              </thead>
              <tbody>
                {roster.goalies.map((p) => (
                  <PlayerRow key={p.id} player={p} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PlayerRow({ player }: { player: NHLRosterPlayer }) {
  return (
    <tr className="border-b last:border-0">
      <td className="py-2 pr-4">{player.sweaterNumber}</td>
      <td className="py-2 pr-4 font-medium">
        <Link href={`/nhl/players/${player.id}`} className="flex items-center gap-2 hover:underline">
          <Image
            src={player.headshot}
            alt={`${player.firstName.default} ${player.lastName.default}`}
            width={28}
            height={28}
            className="rounded-full"
          />
          {player.firstName.default} {player.lastName.default}
        </Link>
      </td>
      <td className="text-center py-2 px-2">
        <Badge variant="outline" className="text-xs">{player.positionCode}</Badge>
      </td>
    </tr>
  );
}
