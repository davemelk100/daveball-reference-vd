"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getPlayerHeadshotUrl, getTeamLogoUrl } from "@/lib/nba-api";
import { NBATriviaPanel } from "@/components/nba/nba-trivia-panel";
import { NBAJerseyPanel } from "@/components/nba/nba-jersey-panel";
import { NBAPlayerSpotlight } from "@/components/nba/nba-player-spotlight";

interface LeaderItem {
  label: string;
  leader: {
    id: string;
    name: string;
    team: string;
    teamAbbrev: string;
    headshot: string;
    displayValue: string;
  } | null;
}

interface StandingsItem {
  team: string;
  abbrev: string;
  logo: string;
  w: number;
  l: number;
  conference: string;
}

interface NBADashboardContentProps {
  leaders: LeaderItem[];
  standings: StandingsItem[];
}

export function NBADashboardContent({ leaders, standings }: NBADashboardContentProps) {
  const eastStandings = standings.filter((s) => s.conference.toLowerCase().includes("east"));
  const westStandings = standings.filter((s) => s.conference.toLowerCase().includes("west"));

  return (
    <div className="container py-2 space-y-8">
      {/* Daily Trivia + Player of the Day + Jersey Numbers */}
      <div className="grid gap-6 lg:grid-cols-2">
        <NBATriviaPanel />
        <NBAPlayerSpotlight />
        <NBAJerseyPanel />
      </div>

      {/* Leaders Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2>League Leaders</h2>
          <Link href="/nba/players" className="text-sm text-muted-foreground hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {leaders.map((item) => (
            <Card key={item.label}>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-2">{item.label}</p>
                {item.leader ? (
                  <Link href={`/nba/players/${item.leader.id}`} className="flex items-center gap-3 group">
                    <Image
                      src={item.leader.headshot || getPlayerHeadshotUrl(item.leader.id)}
                      alt={item.leader.name}
                      width={48}
                      height={48}
                      className="rounded-full bg-muted"
                      unoptimized
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate group-hover:underline">{item.leader.name}</p>
                      <p className="text-xs text-muted-foreground">{item.leader.teamAbbrev}</p>
                      <p className="text-sm font-bold text-primary">{item.leader.displayValue}</p>
                    </div>
                  </Link>
                ) : (
                  <p className="text-sm text-muted-foreground">No data</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Standings Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2>Standings</h2>
          <Link href="/nba/standings" className="text-sm text-muted-foreground hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Eastern Conference */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Eastern Conference</h3>
              <div className="space-y-2">
                {eastStandings.slice(0, 8).map((team, idx) => (
                  <Link
                    key={team.abbrev}
                    href={`/nba/teams/${team.abbrev.toLowerCase()}`}
                    className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm text-muted-foreground w-4">{idx + 1}</span>
                    <Image
                      src={team.logo || getTeamLogoUrl(team.abbrev)}
                      alt={team.team}
                      width={24}
                      height={24}
                      unoptimized
                    />
                    <span className="text-sm font-medium flex-1 truncate">{team.team}</span>
                    <span className="text-sm text-muted-foreground">
                      {team.w}-{team.l}
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Western Conference */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Western Conference</h3>
              <div className="space-y-2">
                {westStandings.slice(0, 8).map((team, idx) => (
                  <Link
                    key={team.abbrev}
                    href={`/nba/teams/${team.abbrev.toLowerCase()}`}
                    className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm text-muted-foreground w-4">{idx + 1}</span>
                    <Image
                      src={team.logo || getTeamLogoUrl(team.abbrev)}
                      alt={team.team}
                      width={24}
                      height={24}
                      unoptimized
                    />
                    <span className="text-sm font-medium flex-1 truncate">{team.team}</span>
                    <span className="text-sm text-muted-foreground">
                      {team.w}-{team.l}
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
