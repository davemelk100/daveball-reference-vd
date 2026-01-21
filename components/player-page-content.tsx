"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayerStatsTable } from "@/components/player-stats-table";
import { BaseballCardGallery } from "@/components/baseball-card";
import { cn } from "@/lib/utils";

interface PlayerPageContentProps {
  playerName: string;
  playerId: number;
  hittingStats: any[];
  pitchingStats: any[];
  fieldingStats: any[];
  hasHittingStats: boolean;
  hasPitchingStats: boolean;
  hasFieldingStats: boolean;
}

export function PlayerPageContent({
  playerName,
  playerId,
  hittingStats,
  pitchingStats,
  fieldingStats,
  hasHittingStats,
  hasPitchingStats,
  hasFieldingStats,
}: PlayerPageContentProps) {
  // Determine default view
  const defaultView = hasHittingStats
    ? "batting"
    : hasPitchingStats
    ? "pitching"
    : hasFieldingStats
    ? "fielding"
    : "cards";

  const [activeView, setActiveView] = useState(defaultView);

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center rounded-lg bg-muted p-1 gap-1">
        {hasHittingStats && (
          <Button
            variant="ghost"
            onClick={() => setActiveView("batting")}
            className={cn(
              "rounded-md px-4 text-sm font-medium transition-colors",
              activeView === "batting"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Batting Stats
          </Button>
        )}
        {hasPitchingStats && (
          <Button
            variant="ghost"
            onClick={() => setActiveView("pitching")}
            className={cn(
              "rounded-md px-4 text-sm font-medium transition-colors",
              activeView === "pitching"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Pitching Stats
          </Button>
        )}
        {hasFieldingStats && (
          <Button
            variant="ghost"
            onClick={() => setActiveView("fielding")}
            className={cn(
              "rounded-md px-4 text-sm font-medium transition-colors",
              activeView === "fielding"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Fielding Stats
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={() => setActiveView("cards")}
          className={cn(
            "rounded-md px-4 text-sm font-medium transition-colors",
            activeView === "cards"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Baseball Cards
        </Button>
      </div>

      {activeView === "batting" && hasHittingStats && (
        <PlayerStatsTable stats={hittingStats} type="hitting" />
      )}

      {activeView === "pitching" && hasPitchingStats && (
        <PlayerStatsTable stats={pitchingStats} type="pitching" />
      )}

      {activeView === "fielding" && hasFieldingStats && (
        <PlayerStatsTable stats={fieldingStats} type="fielding" />
      )}

      {activeView === "cards" && (
        <BaseballCardGallery playerName={playerName} playerId={playerId} limit={4} />
      )}

      {!hasHittingStats && !hasPitchingStats && !hasFieldingStats && activeView !== "cards" && (
        <Card>
          <CardHeader>
            <CardTitle>Career Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              No career statistics available for this player.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
