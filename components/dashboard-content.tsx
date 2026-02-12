"use client";

import { useState, useEffect } from "react";
import dynamicImport from "next/dynamic";
import { StatCard } from "@/components/stat-card";
import { LeadersTable } from "@/components/leaders-table";
import { SeasonSelector } from "@/components/season-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

// Lazy load heavy components
const TriviaPanel = dynamicImport(
  () =>
    import("@/components/trivia-card").then((mod) => ({
      default: mod.TriviaPanel,
    })),
  {
    loading: () => <Skeleton className="h-[300px] w-full" />,
    ssr: false,
  },
);

const PlayerSpotlight = dynamicImport(
  () =>
    import("@/components/player-spotlight").then((mod) => ({
      default: mod.PlayerSpotlight,
    })),
  {
    loading: () => <Skeleton className="h-[80px] w-full" />,
  },
);

interface LeagueLeader {
  value: string | number;
  person?: { id: number; fullName: string };
}

interface DashboardData {
  hrLeaders: any[];
  avgLeaders: any[];
  eraLeaders: any[];
  kLeaders: any[];
  standings: any[];
  leagueLeaders?: {
    hr: { al: LeagueLeader; nl: LeagueLeader };
    avg: { al: LeagueLeader; nl: LeagueLeader };
    era: { al: LeagueLeader; nl: LeagueLeader };
  };
  tableLeaders?: {
    hr: { al: any[]; nl: any[] };
    avg: { al: any[]; nl: any[] };
    era: { al: any[]; nl: any[] };
    k: { al: any[]; nl: any[] };
  };
}

async function fetchClientData(
  season: number,
): Promise<DashboardData & { error?: string }> {
  try {
    const response = await fetch(`/api/dashboard?season=${season}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    return {
      hrLeaders: [],
      avgLeaders: [],
      eraLeaders: [],
      kLeaders: [],
      standings: [],
      error:
        "Failed to load MLB data. The MLB Stats API may be temporarily unavailable.",
    };
  }
}

export function DashboardContent({ initialSeason }: { initialSeason: number }) {
  const [season, setSeason] = useState(initialSeason);
  const [selectedLeague, setSelectedLeague] = useState<"AL" | "NL">("AL");
  const [tableLeague, setTableLeague] = useState<"AL" | "NL">("AL");

  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchClientData(season)
      .then((result) => {
        if (result.error) {
          setError(result.error);
        }
        setData(result);
      })
      .finally(() => setIsLoading(false));
  }, [season]);

  const hrLeaders = data?.hrLeaders || [];
  const avgLeaders = data?.avgLeaders || [];
  const eraLeaders = data?.eraLeaders || [];
  const kLeaders = data?.kLeaders || [];
  const leagueLeaders = data?.leagueLeaders;
  const tableLeaders = data?.tableLeaders;

  const formatLeader = (
    al: LeagueLeader | undefined,
    nl: LeagueLeader | undefined,
  ) => {
    const leader = selectedLeague === "AL" ? al : nl;
    if (!leader) return undefined;
    return [
      {
        league: selectedLeague,
        value: leader?.value || "—",
        name: leader?.person?.fullName || "No data",
        playerId: leader?.person?.id,
      },
    ];
  };

  return (
    <main className="container py-2">
      {/* Hero Section */}
      <div className="mb-0 flex items-center gap-4">
        <h1 className="hidden mb-0 shrink-0 whitespace-nowrap">
          MLB Stats. At your fingertips.
        </h1>
      </div>

      {isLoading && !data && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Loading dashboard data...
          </p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <Alert variant="destructive" className="my-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Data Unavailable</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Daily Trivia & Player of the Day Row */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8 mt-6">
        <TriviaPanel />
        <PlayerSpotlight />
      </div>

      {/* Quick Stats */}
      {/* <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="mr-4">League Best</h2>
          <Tabs value={selectedLeague} onValueChange={(value) => setSelectedLeague(value as "AL" | "NL")}>
            <TabsList>
              <TabsTrigger value="AL">AL</TabsTrigger>
              <TabsTrigger value="NL">NL</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <StatCard
            title="Home Run Leader"
            leaders={isLoading ? undefined : formatLeader(leagueLeaders?.hr?.al, leagueLeaders?.hr?.nl)}
            value={isLoading ? "..." : undefined}
            description={isLoading ? "Loading..." : undefined}
          />
          <StatCard
            title="Batting Avg Leader"
            leaders={isLoading ? undefined : formatLeader(leagueLeaders?.avg?.al, leagueLeaders?.avg?.nl)}
            value={isLoading ? "..." : undefined}
            description={isLoading ? "Loading..." : undefined}
          />
          <StatCard
            title="ERA Leader"
            leaders={isLoading ? undefined : formatLeader(leagueLeaders?.era?.al, leagueLeaders?.era?.nl)}
            value={isLoading ? "..." : undefined}
            description={isLoading ? "Loading..." : undefined}
          />
        </div>
      </div> */}

      {/* Leaders Grid */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <h2 className="mr-4">League Leaders</h2>
          <div className="flex items-center gap-4">
            <SeasonSelector season={season} onSeasonChange={setSeason} />
            <Select
              value={tableLeague}
              onValueChange={(val) => setTableLeague(val as "AL" | "NL")}
            >
              <SelectTrigger className="w-auto border-0 shadow-none p-0 h-auto bg-transparent hover:bg-transparent focus:ring-0 focus-visible:ring-0">
                <span className="text-2xl text-bold leading-none border-b-2 border-foreground">
                  <SelectValue />
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AL">AL</SelectItem>
                <SelectItem value="NL">NL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <LeadersTable
            title="Home Runs"
            leaders={
              tableLeague === "AL"
                ? tableLeaders?.hr?.al || hrLeaders
                : tableLeaders?.hr?.nl || hrLeaders
            }
            statLabel="HR"
          />
          <LeadersTable
            title="Batting Average"
            leaders={
              tableLeague === "AL"
                ? tableLeaders?.avg?.al || avgLeaders
                : tableLeaders?.avg?.nl || avgLeaders
            }
            statLabel="AVG"
          />
          <LeadersTable
            title="ERA"
            leaders={
              tableLeague === "AL"
                ? tableLeaders?.era?.al || eraLeaders
                : tableLeaders?.era?.nl || eraLeaders
            }
            statLabel="ERA"
          />
          <LeadersTable
            title="Strikeouts"
            leaders={
              tableLeague === "AL"
                ? tableLeaders?.k?.al || kLeaders
                : tableLeaders?.k?.nl || kLeaders
            }
            statLabel="K"
          />
        </div>
      </div>
    </main>
  );
}
