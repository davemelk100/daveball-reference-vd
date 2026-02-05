"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { USPBLMLBAlumni } from "@/lib/uspbl-api";

interface USPBLAlumniContentProps {
  alumni: USPBLMLBAlumni[];
}

export function USPBLAlumniContent({ alumni }: USPBLAlumniContentProps) {
  const mlbRoster = alumni.filter((a) => a.madeMLBRoster);
  const minorLeague = alumni.filter((a) => !a.madeMLBRoster);

  return (
    <div className="container py-6">
      <h1 className="font-league mb-2">Road to the Majors</h1>
      <p className="text-sm text-muted-foreground mb-8">
        {alumni.length} USPBL players have been signed by MLB organizations, with {mlbRoster.length} reaching Major League rosters.
      </p>

      {/* MLB Roster Players */}
      <h2 className="font-league text-xl mb-4">Made the Majors</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {mlbRoster.map((player) => (
          <Card key={player.name} className="border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{player.name}</p>
                  <p className="text-sm text-muted-foreground">{player.mlbOrganization}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">MLB Roster</Badge>
                    <span className="text-xs text-muted-foreground">Signed {player.yearSigned}</span>
                  </div>
                  {player.mlbDebut && (
                    <p className="text-xs text-muted-foreground mt-1">MLB Debut: {player.mlbDebut}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    USPBL: <Link href={`/uspbl/teams/${player.uspblTeamSlug}`} className="hover:underline">{player.uspblTeam}</Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Minor League Signees */}
      <h2 className="font-league text-xl mb-4">Signed by MLB Organizations</h2>
      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">Player</th>
                  <th className="text-left py-2 px-2">MLB Organization</th>
                  <th className="text-left py-2 px-2 hidden sm:table-cell">USPBL Team</th>
                  <th className="text-center py-2 px-2">Year</th>
                </tr>
              </thead>
              <tbody>
                {minorLeague.map((player) => (
                  <tr key={player.name} className="border-b last:border-0">
                    <td className="py-2 pr-4 font-medium">{player.name}</td>
                    <td className="py-2 px-2 text-muted-foreground">{player.mlbOrganization}</td>
                    <td className="py-2 px-2 text-muted-foreground hidden sm:table-cell">
                      <Link href={`/uspbl/teams/${player.uspblTeamSlug}`} className="hover:underline">
                        {player.uspblTeam}
                      </Link>
                    </td>
                    <td className="text-center py-2 px-2">{player.yearSigned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
