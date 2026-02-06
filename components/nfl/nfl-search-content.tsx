"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface SearchTeam {
  id: string;
  abbreviation: string;
  displayName: string;
  logoUrl: string;
}

interface SearchPlayer {
  id: string;
  name: string;
  position: string;
  team: string;
  teamAbbrev: string;
  headshot: string;
}

export function NFLSearchContent() {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState<SearchPlayer[]>([]);
  const [teams, setTeams] = useState<SearchTeam[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setPlayers([]);
      setTeams([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/nfl/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        if (res.ok) {
          const data = await res.json();
          setPlayers(data.players || []);
          setTeams(data.teams || []);
        }
      } catch (e: any) {
        if (e.name !== "AbortError") console.error(e);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Search</h1>

      <div className="relative max-w-xl mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search players and teams..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
          autoFocus
        />
      </div>

      {query.length < 2 && (
        <p className="text-sm text-muted-foreground">
          Type at least 2 characters to search.
        </p>
      )}

      {query.length >= 2 && (
        <div className="space-y-8">
          {loading && (
            <p className="text-sm text-muted-foreground">Searching...</p>
          )}

          {/* Team Results */}
          {teams.length > 0 && (
            <div>
              <h2 className="font-league text-lg mb-3">Teams</h2>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {teams.map((team) => (
                  <Link key={team.id} href={`/nfl/teams/${team.id}`}>
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardContent className="p-4 flex items-center gap-3">
                        <Image
                          src={team.logoUrl}
                          alt={team.displayName}
                          width={40}
                          height={40}
                          className="flex-shrink-0"
                          unoptimized
                        />
                        <span className="text-sm font-medium">{team.displayName}</span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Player Results */}
          {players.length > 0 && (
            <div>
              <h2 className="font-league text-lg mb-3">Players</h2>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {players.map((player) => (
                  <Link key={player.id} href={`/nfl/players/${player.id}`}>
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardContent className="p-4 flex items-center gap-3">
                        {player.headshot ? (
                          <Image
                            src={player.headshot}
                            alt={player.name}
                            width={40}
                            height={40}
                            className="rounded-full flex-shrink-0"
                            unoptimized
                          />
                        ) : (
                          <div className="w-10 h-10 bg-muted rounded-full flex-shrink-0" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{player.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {player.teamAbbrev || player.team}
                            </span>
                            {player.position && (
                              <Badge variant="outline" className="text-xs">
                                {player.position}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!loading && teams.length === 0 && players.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No results for &quot;{query}&quot;.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
