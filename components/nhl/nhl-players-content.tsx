"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DUMMY_PLAYERS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: "Player Name",
  team: "TBD",
  position: i % 4 === 0 ? "G" : i % 3 === 0 ? "D" : i % 2 === 0 ? "LW" : "C",
  number: 0,
  gp: 0,
  goals: 0,
  assists: 0,
  points: 0,
}));

export function NHLPlayersContent() {
  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Players</h1>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {DUMMY_PLAYERS.map((player) => (
          <Card key={player.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-3 text-center">
              <div className="w-full aspect-square bg-muted/30 rounded-lg mb-2 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-muted/50" />
              </div>
              <p className="text-sm font-medium">{player.name}</p>
              <p className="text-xs text-muted-foreground">{player.team} &middot; #{player.number}</p>
              <Badge variant="outline" className="mt-1 text-xs">{player.position}</Badge>
              <div className="flex justify-center gap-3 mt-2 text-xs text-muted-foreground">
                <span>{player.goals} G</span>
                <span>{player.assists} A</span>
                <span>{player.points} P</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
