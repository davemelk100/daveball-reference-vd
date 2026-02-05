"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { USPBLTeam } from "@/lib/uspbl-api";

interface USPBLTeamsContentProps {
  teams: USPBLTeam[];
}

export function USPBLTeamsContent({ teams }: USPBLTeamsContentProps) {
  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Teams</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {teams.map((team) => (
          <Link key={team.slug} href={`/uspbl/teams/${team.slug}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-6 flex items-center gap-4">
                {team.logoUrl.startsWith("http") ? (
                  <Image
                    src={team.logoUrl}
                    alt={team.name}
                    width={64}
                    height={64}
                    className="flex-shrink-0 h-16 w-auto"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: team.color }}
                  >
                    {team.abbreviation}
                  </div>
                )}
                <div>
                  <p className="font-medium text-lg">{team.name}</p>
                  <p className="text-sm text-muted-foreground">UWM Field &middot; Utica, MI</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
