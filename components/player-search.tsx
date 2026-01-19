"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Loader2, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getTeamLogoUrl, type Player, type Team } from "@/lib/mlb-api";

interface SearchResults {
  players: Player[];
  teams: Team[];
}

export function PlayerSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({
    players: [],
    teams: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults({ players: [], teams: [] });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults({
        players: data.players || [],
        teams: data.teams || [],
      });
    } catch (error) {
      console.error("Search error:", error);
      setResults({ players: [], teams: [] });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search any player or team..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="pl-10 bg-white border-border"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin" />
        )}
      </div>

      {isOpen && (results.teams.length > 0 || results.players.length > 0) && (
        <Card className="absolute top-full mt-2 w-full z-50 max-h-80 overflow-auto">
          <CardContent className="p-2">
            {/* Teams */}
            {results.teams.length > 0 && (
              <>
                <p className="text-xs font-medium text-muted-foreground px-2 py-1">
                  Teams
                </p>
                {results.teams.map((team) => (
                  <Link
                    key={team.id}
                    href={`/teams/${team.id}`}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md hover:bg-secondary transition-colors",
                      "cursor-pointer"
                    )}
                  >
                    <Image
                      src={getTeamLogoUrl(team.id)}
                      alt={team.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{team.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {team.league?.name} • {team.division?.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </>
            )}

            {/* Players */}
            {results.players.length > 0 && (
              <>
                <p className="text-xs font-medium text-muted-foreground px-2 py-1 mt-2">
                  Players
                </p>
                {results.players.map((player) => (
                  <Link
                    key={player.id}
                    href={`/players/${player.id}`}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md hover:bg-secondary transition-colors",
                      "cursor-pointer"
                    )}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {player.primaryNumber || "#"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{player.fullName}</p>
                      <p className="text-xs text-muted-foreground">
                        {player.primaryPosition?.name} •{" "}
                        {player.currentTeam?.name || "Free Agent"}
                      </p>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      )}

      {isOpen &&
        query.length >= 2 &&
        results.teams.length === 0 &&
        results.players.length === 0 &&
        !isLoading && (
          <Card className="absolute top-full mt-2 w-full z-50">
            <CardContent className="p-4 text-center text-muted-foreground">
              No results found for "{query}"
            </CardContent>
          </Card>
        )}
    </div>
  );
}
