"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { getPlayerHeadshotUrl, type AwardWinner } from "@/lib/mlb-api";
import { SeasonSelector } from "@/components/season-selector";

interface AllStarPageContentProps {
  initialSeason: number;
  rosters: {
    al: AwardWinner[];
    nl: AwardWinner[];
  };
}

export function AllStarPageContent({
  initialSeason,
  rosters,
}: AllStarPageContentProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedLeague, setSelectedLeague] = useState<"al" | "nl" | "all">(
    "al",
  );

  const handleSeasonChange = (season: number) => {
    startTransition(() => {
      router.push(`/all-star?season=${season}`);
    });
  };

  const currentRoster =
    selectedLeague === "al"
      ? rosters.al
      : selectedLeague === "nl"
        ? rosters.nl
        : [...rosters.al, ...rosters.nl];
  const leagueTitle =
    selectedLeague === "al"
      ? "American League"
      : selectedLeague === "nl"
        ? "National League"
        : "All-Star";

  const RosterGrid = ({ players }: { players: AwardWinner[] }) => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {players.length > 0 ? (
        players.map((player) => (
          <Link
            key={`${player.playerId}-${player.id}`}
            href={`/players/${player.playerId}`}
          >
            <Card className="hover:bg-secondary/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-2 pl-4">
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    <Image
                      src={
                        getPlayerHeadshotUrl(player.playerId, "small") ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt={player.playerName}
                      width={96}
                      height={96}
                      className="rounded-lg h-24 w-auto"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">
                      {player.playerName}
                    </h3>
                    {player.team && (
                      <p className="text-sm text-muted-foreground truncate">
                        {player.team.name}
                      </p>
                    )}
                    {player.notes && (
                      <p className="text-xs text-muted-foreground italic mt-1 truncate">
                        {player.notes}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <div className="col-span-full py-12 text-center text-muted-foreground">
          No All-Star data available for this league/season.
        </div>
      )}
    </div>
  );

  const RosterGridSkeleton = () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-2 pl-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-24 w-24 rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <main className="container py-2">
      <div className="mb-6 flex flex-wrap md:flex-nowrap items-center gap-4">
        <div className="flex items-center gap-4">
          <h2 className="mb-0 shrink-0 whitespace-nowrap">
            All-Star Game Rosters
          </h2>
          <SeasonSelector
            season={initialSeason}
            onSeasonChange={handleSeasonChange}
            isLoading={isPending}
            startYear={1933}
          />
          <Select
            value={selectedLeague}
            onValueChange={(val) =>
              setSelectedLeague(val as "al" | "nl" | "all")
            }
          >
            <SelectTrigger className="w-auto border-0 shadow-none p-0 h-auto bg-transparent hover:bg-transparent focus:ring-0 focus-visible:ring-0">
              <span className="font-league text-[40px] leading-none border-b-2 border-foreground">
                <SelectValue />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="al">AL</SelectItem>
              <SelectItem value="nl">NL</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isPending ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <RosterGridSkeleton />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{leagueTitle} Roster</span>
              <span className="text-sm font-normal text-muted-foreground">
                {currentRoster.length} Players
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RosterGrid players={currentRoster} />
          </CardContent>
        </Card>
      )}
    </main>
  );
}
