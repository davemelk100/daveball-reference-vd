"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { StatCard } from "@/components/stat-card"
import { LeadersTable } from "@/components/leaders-table"
import { SeasonSelector } from "@/components/season-selector"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AwardWinner } from "@/lib/awards-data"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Lazy load heavy components
const LeadersBarChart = dynamic(
  () =>
    import("@/components/leaders-bar-chart").then((mod) => ({
      default: mod.LeadersBarChart,
    })),
  {
    loading: () => <Skeleton className="h-[300px] w-full" />,
    ssr: false,
  },
)

const AwardsCard = dynamic(
  () =>
    import("@/components/awards-card").then((mod) => ({
      default: mod.AwardsCard,
    })),
  {
    loading: () => <Skeleton className="h-[200px] w-full" />,
  },
)

const TriviaPanel = dynamic(
  () =>
    import("@/components/trivia-card").then((mod) => ({
      default: mod.TriviaPanel,
    })),
  {
    loading: () => <Skeleton className="h-[300px] w-full" />,
    ssr: false,
  },
)

const PlayerSpotlight = dynamic(
  () =>
    import("@/components/player-spotlight").then((mod) => ({
      default: mod.PlayerSpotlight,
    })),
  {
    loading: () => <Skeleton className="h-[80px] w-full" />,
  },
)

interface LeagueLeader {
  value: string | number
  person?: { id: number; fullName: string }
}

interface DashboardData {
  hrLeaders: any[]
  avgLeaders: any[]
  eraLeaders: any[]
  kLeaders: any[]
  standings: any[]
  leagueLeaders?: {
    hr: { al: LeagueLeader; nl: LeagueLeader }
    avg: { al: LeagueLeader; nl: LeagueLeader }
    era: { al: LeagueLeader; nl: LeagueLeader }
  }
  chartLeaders?: {
    hr: { al: any[]; nl: any[] }
    k: { al: any[]; nl: any[] }
  }
  tableLeaders?: {
    hr: { al: any[]; nl: any[] }
    avg: { al: any[]; nl: any[] }
    era: { al: any[]; nl: any[] }
    k: { al: any[]; nl: any[] }
  }
}

const MLB_API_BASE = "https://statsapi.mlb.com/api/v1"

async function fetchLeaders(statGroup: string, leaderCategory: string, season: number, limit = 10) {
  try {
    const url = `${MLB_API_BASE}/stats/leaders?leaderCategories=${leaderCategory}&season=${season}&sportId=1&limit=${limit}&statGroup=${statGroup}`
    const response = await fetch(url)
    if (!response.ok) return []
    const data = await response.json()
    return data.leagueLeaders?.[0]?.leaders || []
  } catch {
    return []
  }
}

async function fetchLeadersByLeague(
  statGroup: string,
  leaderCategory: string,
  season: number,
  leagueId: number,
  limit = 10,
) {
  try {
    const url = `${MLB_API_BASE}/stats/leaders?leaderCategories=${leaderCategory}&season=${season}&sportId=1&limit=${limit}&statGroup=${statGroup}&leagueId=${leagueId}`
    const response = await fetch(url)
    if (!response.ok) return []
    const data = await response.json()
    return data.leagueLeaders?.[0]?.leaders || []
  } catch {
    return []
  }
}

async function fetchClientData(season: number): Promise<DashboardData & { error?: string }> {
  try {
    const AL_LEAGUE_ID = 103
    const NL_LEAGUE_ID = 104

    const [
      hrLeaders,
      avgLeaders,
      eraLeaders,
      kLeaders,
      hrLeadersAL,
      hrLeadersNL,
      avgLeadersAL,
      avgLeadersNL,
      eraLeadersAL,
      eraLeadersNL,
      kLeadersAL,
      kLeadersNL,
    ] = await Promise.all([
      fetchLeaders("hitting", "homeRuns", season, 10),
      fetchLeaders("hitting", "battingAverage", season, 10),
      fetchLeaders("pitching", "earnedRunAverage", season, 10),
      fetchLeaders("pitching", "strikeouts", season, 10),
      fetchLeadersByLeague("hitting", "homeRuns", season, AL_LEAGUE_ID, 10),
      fetchLeadersByLeague("hitting", "homeRuns", season, NL_LEAGUE_ID, 10),
      fetchLeadersByLeague("hitting", "battingAverage", season, AL_LEAGUE_ID, 10),
      fetchLeadersByLeague("hitting", "battingAverage", season, NL_LEAGUE_ID, 10),
      fetchLeadersByLeague("pitching", "earnedRunAverage", season, AL_LEAGUE_ID, 10),
      fetchLeadersByLeague("pitching", "earnedRunAverage", season, NL_LEAGUE_ID, 10),
      fetchLeadersByLeague("pitching", "strikeouts", season, AL_LEAGUE_ID, 10),
      fetchLeadersByLeague("pitching", "strikeouts", season, NL_LEAGUE_ID, 10),
    ])

    return {
      hrLeaders,
      avgLeaders,
      eraLeaders,
      kLeaders,
      standings: [],
      leagueLeaders: {
        hr: { al: hrLeadersAL[0], nl: hrLeadersNL[0] },
        avg: { al: avgLeadersAL[0], nl: avgLeadersNL[0] },
        era: { al: eraLeadersAL[0], nl: eraLeadersNL[0] },
      },
      chartLeaders: {
        hr: { al: hrLeadersAL, nl: hrLeadersNL },
        k: { al: kLeadersAL, nl: kLeadersNL },
      },
      tableLeaders: {
        hr: { al: hrLeadersAL, nl: hrLeadersNL },
        avg: { al: avgLeadersAL, nl: avgLeadersNL },
        era: { al: eraLeadersAL, nl: eraLeadersNL },
        k: { al: kLeadersAL, nl: kLeadersNL },
      },
    }
  } catch (error) {
    return {
      hrLeaders: [],
      avgLeaders: [],
      eraLeaders: [],
      kLeaders: [],
      standings: [],
      error: "Failed to load MLB data. Please refresh the page.",
    }
  }
}

export function DashboardContent({
  initialSeason,
  mvpWinners,
  cyYoungWinners,
}: {
  initialSeason: number
  mvpWinners: { al: AwardWinner[]; nl: AwardWinner[] }
  cyYoungWinners: { al: AwardWinner[]; nl: AwardWinner[] }
}) {
  const [season, setSeason] = useState(initialSeason)
  const [selectedLeague, setSelectedLeague] = useState<"AL" | "NL">("AL")
  const [chartLeague, setChartLeague] = useState<"AL" | "NL">("AL")
  const [tableLeague, setTableLeague] = useState<"AL" | "NL">("AL")
  const [awardsLeague, setAwardsLeague] = useState<"AL" | "NL">("AL")

  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    fetchClientData(season)
      .then((result) => {
        if (result.error) {
          setError(result.error)
        }
        setData(result)
      })
      .finally(() => setIsLoading(false))
  }, [season])

  const hrLeaders = data?.hrLeaders || []
  const avgLeaders = data?.avgLeaders || []
  const eraLeaders = data?.eraLeaders || []
  const kLeaders = data?.kLeaders || []
  const leagueLeaders = data?.leagueLeaders
  const chartLeaders = data?.chartLeaders
  const tableLeaders = data?.tableLeaders

  const formatLeader = (al: LeagueLeader | undefined, nl: LeagueLeader | undefined) => {
    const leader = selectedLeague === "AL" ? al : nl
    if (!leader) return undefined
    return [
      {
        league: selectedLeague,
        value: leader?.value || "—",
        name: leader?.person?.fullName || "No data",
        playerId: leader?.person?.id,
      },
    ]
  }

  return (
    <main className="container py-8">
      {/* Hero Section */}
      <div className="mb-0 flex items-center gap-4">
        <h1 className="mb-0 shrink-0 whitespace-nowrap">Home</h1>
        <SeasonSelector season={season} onSeasonChange={setSeason} isLoading={isLoading} />
      </div>

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
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">League Best</h2>
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
      </div>

      {/* Award Winners */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Award Winners</h2>
          <Tabs value={awardsLeague} onValueChange={(value) => setAwardsLeague(value as "AL" | "NL")}>
            <TabsList>
              <TabsTrigger value="AL">AL</TabsTrigger>
              <TabsTrigger value="NL">NL</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <AwardsCard title="MVP Winners" winners={awardsLeague === "AL" ? mvpWinners.al : mvpWinners.nl} limit={5} />
          <AwardsCard
            title="Cy Young Winners"
            winners={awardsLeague === "AL" ? cyYoungWinners.al : cyYoungWinners.nl}
            limit={5}
          />
        </div>
      </div>

      {/* Data Visualizations Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Data Visualizations</h2>
          <Tabs value={chartLeague} onValueChange={(value) => setChartLeague(value as "AL" | "NL")}>
            <TabsList>
              <TabsTrigger value="AL">AL</TabsTrigger>
              <TabsTrigger value="NL">NL</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <LeadersBarChart
            title="Home Run Leaders"
            leaders={chartLeague === "AL" ? chartLeaders?.hr?.al || hrLeaders : chartLeaders?.hr?.nl || hrLeaders}
            color="#ef4444"
          />
          <LeadersBarChart
            title="Strikeout Leaders (Pitching)"
            leaders={chartLeague === "AL" ? chartLeaders?.k?.al || kLeaders : chartLeaders?.k?.nl || kLeaders}
            color="#3b82f6"
          />
        </div>
      </div>

      {/* Leaders Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">League Leaders</h2>
          <div className="flex items-center gap-4">
            <Tabs value={tableLeague} onValueChange={(value) => setTableLeague(value as "AL" | "NL")}>
              <TabsList>
                <TabsTrigger value="AL">AL</TabsTrigger>
                <TabsTrigger value="NL">NL</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <LeadersTable
            title="Home Runs"
            leaders={tableLeague === "AL" ? tableLeaders?.hr?.al || hrLeaders : tableLeaders?.hr?.nl || hrLeaders}
            statLabel="HR"
          />
          <LeadersTable
            title="Batting Average"
            leaders={tableLeague === "AL" ? tableLeaders?.avg?.al || avgLeaders : tableLeaders?.avg?.nl || avgLeaders}
            statLabel="AVG"
          />
          <LeadersTable
            title="ERA"
            leaders={tableLeague === "AL" ? tableLeaders?.era?.al || eraLeaders : tableLeaders?.era?.nl || eraLeaders}
            statLabel="ERA"
          />
          <LeadersTable
            title="Strikeouts"
            leaders={tableLeague === "AL" ? tableLeaders?.k?.al || kLeaders : tableLeaders?.k?.nl || kLeaders}
            statLabel="K"
          />
        </div>
      </div>
    </main>
  )
}
