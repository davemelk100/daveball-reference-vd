"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import type { USPBLPlayer } from "@/lib/uspbl-api";

interface USPBLPlayerContentProps {
  player: USPBLPlayer | null;
}

export function USPBLPlayerContent({ player }: USPBLPlayerContentProps) {
  if (!player) {
    return (
      <div className="container py-6">
        <Link
          href="/uspbl/players"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Players
        </Link>
        <p className="text-muted-foreground">Player not found.</p>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <Link
        href="/uspbl/players"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Players
      </Link>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Left: player bio */}
        <div>
          <div className="w-full aspect-square bg-muted/30 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground">
              {player.number ? `#${player.number}` : "—"}
            </span>
          </div>
          <h1 className="font-league mb-2">{player.name}</h1>
          <div className="flex gap-2 mb-3">
            <Badge variant="outline">{player.position}</Badge>
            {player.number && (
              <Badge variant="outline">#{player.number}</Badge>
            )}
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Team: <Link href={`/uspbl/teams/${player.teamSlug}`} className="hover:underline">{player.teamName}</Link></p>
            {player.height && <p>Height: {player.height}</p>}
            {player.weight && <p>Weight: {player.weight} lbs</p>}
            {player.bats && player.throws && (
              <p>Bats/Throws: {player.bats}/{player.throws}</p>
            )}
            {player.hometown && <p>Hometown: {player.hometown}</p>}
            {player.college && <p>College: {player.college}</p>}
          </div>
        </div>

        {/* Right: team info */}
        <div>
          <h2 className="font-league mb-4">Player Info</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Team</p>
                  <p className="font-medium">
                    <Link href={`/uspbl/teams/${player.teamSlug}`} className="hover:underline">
                      {player.teamName}
                    </Link>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Position</p>
                  <p className="font-medium">{player.position}</p>
                </div>
                {player.college && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">College</p>
                    <p className="font-medium">{player.college}</p>
                  </div>
                )}
                {player.hometown && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Hometown</p>
                    <p className="font-medium">{player.hometown}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
