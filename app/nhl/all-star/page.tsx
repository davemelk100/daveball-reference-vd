import type { Metadata } from "next";
import { Star } from "lucide-react";
import { nhlAllStarGames, type NHLAllStarRoster, type NHLAllStarPlayer } from "@/lib/nhl-allstar-data";

export const metadata: Metadata = {
  title: "NHL All-Star Game",
  description: "NHL All-Star Game rosters and history.",
  alternates: {
    canonical: "/nhl/all-star",
  },
};

function PlayerRow({ player }: { player: NHLAllStarPlayer }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded bg-background/50">
      <span className="text-xs font-medium text-muted-foreground w-8">{player.position}</span>
      <span className="font-medium flex-1">{player.name}</span>
      <span className="text-sm text-muted-foreground">{player.team}</span>
    </div>
  );
}

function AllStarGameCard({ game }: { game: NHLAllStarRoster }) {
  return (
    <div className="bg-muted/30 rounded-lg border p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <h2 className="text-xl font-bold text-primary">{game.year} NHL All-Star Game</h2>
        <span className="text-sm text-muted-foreground">· {game.location}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{game.format}</p>
      {game.mvp && (
        <p className="text-sm mb-4">
          <span className="font-medium">MVP:</span> {game.mvp}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {game.teams.map((team) => (
          <div key={team.name} className="border rounded-lg p-3 bg-background/30">
            <h3 className="font-bold mb-2 text-sm uppercase tracking-wide">
              {team.name}
              {team.captain && (
                <span className="font-normal text-muted-foreground ml-2">
                  (C: {team.captain})
                </span>
              )}
            </h3>
            <div className="space-y-1">
              {team.players.map((player) => (
                <PlayerRow key={player.name} player={player} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NHLAllStarPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Star className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">NHL All-Star Game</h1>
          <p className="text-muted-foreground">Recent All-Star rosters</p>
        </div>
      </div>

      <div className="space-y-6">
        {nhlAllStarGames.map((game) => (
          <AllStarGameCard key={game.year} game={game} />
        ))}
      </div>
    </div>
  );
}
