"use client";

import { useState, useEffect } from "react";
import { SeasonSelector } from "@/components/season-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, AlertCircle } from "lucide-react";
import type { Team } from "@/lib/mlb-api";

interface TeamsPageContentProps {
  initialTeams: Team[];
  initialSeason: number;
}

export function TeamsPageContent({
  initialTeams,
  initialSeason,
}: TeamsPageContentProps) {
  const [season, setSeason] = useState(initialSeason);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<"al" | "nl" | "all">(
    "al",
  );

  useEffect(() => {
    if (season === initialSeason) {
      setTeams(initialTeams);
      return;
    }

    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/teams?season=${season}`);
        const data = await response.json();
        setTeams(data.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [season, initialSeason, initialTeams]);

  // Group teams by division
  const divisions: Record<string, Team[]> = {};
  teams.forEach((team) => {
    const divName = team.division?.name || "Other";
    if (!divisions[divName]) divisions[divName] = [];
    divisions[divName].push(team);
  });

  // Sort divisions by league then by East, Central, West
  const sortedDivisions = Object.entries(divisions).sort(([a], [b]) => {
    const aIsAL = a.includes("American");
    const bIsAL = b.includes("American");
    if (aIsAL && !bIsAL) return -1;
    if (!aIsAL && bIsAL) return 1;
    // Sort by East, Central, West within league
    const order = ["East", "Central", "West"];
    const aIdx = order.findIndex((o) => a.includes(o));
    const bIdx = order.findIndex((o) => b.includes(o));
    return aIdx - bIdx;
  });

  // Filter divisions by selected league
  const filteredDivisions = sortedDivisions.filter(([divisionName]) => {
    if (selectedLeague === "all") return true;
    if (selectedLeague === "al") return divisionName.includes("American");
    if (selectedLeague === "nl") return divisionName.includes("National");
    return true;
  });

  return (
    <main className="container py-2">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="mb-0 shrink-0 whitespace-nowrap">Teams</h2>
        <SeasonSelector
          season={season}
          onSeasonChange={setSeason}
          isLoading={isLoading}
          className="w-auto py-0 hover:bg-transparent"
        />
        {!isLoading && teams.length > 0 && (
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
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : teams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <AlertCircle className="h-12 w-12 mb-4" />
          <p className="text-lg">Unable to load teams data for {season}</p>
          <p className="text-sm">Please try a different season</p>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredDivisions.map(([divisionName, divTeams]) => (
            <section key={divisionName}>
              <h2 className="mr-4 mb-4">{divisionName}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {divTeams
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((team) => (
                    <a
                      key={team.id}
                      href={`/mlb/teams/${team.id}?season=${season}`}
                      className="block h-full"
                    >
                      <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border bg-card hover:bg-[#b7b7b7] transition-colors h-full min-h-[100px]">
                        <img
                          src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
                          alt={team.name}
                          className="h-10 w-10 object-contain"
                          loading="lazy"
                        />
                        <p className="font-medium text-center">{team.name}</p>
                      </div>
                    </a>
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
