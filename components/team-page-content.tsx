"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { ArrowLeft, Loader2, AlertCircle, ChevronDown, ChevronUp, Trophy } from "lucide-react"
import { getDefaultSeason, type TeamPostseasonHistory } from "@/lib/mlb-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SeasonSelector } from "@/components/season-selector"
import { Skeleton } from "@/components/ui/skeleton"

const RosterTable = dynamic(
  () =>
    import("@/components/roster-table").then((mod) => ({
      default: mod.RosterTable,
    })),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
    ssr: false,
  },
)

const HistoricalChart = dynamic(
  () =>
    import("@/components/historical-chart").then((mod) => ({
      default: mod.HistoricalChart,
    })),
  {
    loading: () => <Skeleton className="h-80 w-full" />,
    ssr: false,
  },
)

const HistoricalTable = dynamic(
  () =>
    import("@/components/historical-table").then((mod) => ({
      default: mod.HistoricalTable,
    })),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
    ssr: false,
  },
)

const TeamLogos = dynamic(
  () =>
    import("@/components/team-logos").then((mod) => ({
      default: mod.TeamLogos,
    })),
  {
    loading: () => <Skeleton className="h-48 w-full" />,
  },
)

const HistoricalUniforms = dynamic(
  () =>
    import("@/components/historical-uniforms").then((mod) => ({
      default: mod.HistoricalUniforms,
    })),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
  },
)

interface TeamPageContentProps {
  teamId: number
  initialData: {
    team: any
    roster: any[]
    teamRecord: any
  }
}

export function TeamPageContent({ teamId, initialData }: TeamPageContentProps) {
  const defaultSeason = getDefaultSeason()
  const [season, setSeason] = useState(defaultSeason)
  const [team, setTeam] = useState(initialData?.team || null)
  const [roster, setRoster] = useState(initialData?.roster || [])
  const [teamRecord, setTeamRecord] = useState(initialData?.teamRecord || null)
  const [history, setHistory] = useState<any[]>([])
  const [postseasonHistory, setPostseasonHistory] = useState<TeamPostseasonHistory | null>(null)
  const [historyLoaded, setHistoryLoaded] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set())

  // Fetch history and postseason data on mount
  useEffect(() => {
    if (!historyLoaded && !historyLoading) {
      setHistoryLoading(true)
      fetch(`/api/team/${teamId}/history`)
        .then((res) => res.json())
        .then((data) => {
          setHistory(data.history || [])
          setPostseasonHistory(data.postseasonHistory || null)
          setHistoryLoaded(true)
        })
        .catch((err) => {
          console.error("Error fetching history:", err)
        })
        .finally(() => {
          setHistoryLoading(false)
        })
    }
  }, [teamId, historyLoaded, historyLoading])

  useEffect(() => {
    if (season === defaultSeason) {
      setTeam(initialData?.team || null)
      setRoster(initialData?.roster || [])
      setTeamRecord(initialData?.teamRecord || null)
      setError(null)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/team/${teamId}?season=${season}`)
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`)
        }
        const data = await res.json()
        setTeam(data.team || null)
        setRoster(data.roster || [])
        setTeamRecord(data.teamRecord || null)
      } catch (err) {
        console.error("Error fetching team data:", err)
        setError("Failed to load team data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [season, teamId, defaultSeason, initialData])

  if (!team) {
    return (
      <main className="container py-2">
        <Link
          href="/teams"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Teams
        </Link>
        <Card>
          <CardContent className="py-12 flex flex-col items-center gap-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground text-center">
              {error || "Unable to load team data. The API may be temporarily unavailable."}
            </p>
          </CardContent>
        </Card>
      </main>
    )
  }

  const pitchers = roster.filter((p) => p.primaryPosition?.type === "Pitcher")
  const catchers = roster.filter((p) => p.primaryPosition?.abbreviation === "C")
  const infielders = roster.filter((p) => ["1B", "2B", "3B", "SS"].includes(p.primaryPosition?.abbreviation || ""))
  const outfielders = roster.filter((p) => ["LF", "CF", "RF", "OF"].includes(p.primaryPosition?.abbreviation || ""))
  const dh = roster.filter((p) => p.primaryPosition?.abbreviation === "DH")

  return (
    <main className="container py-2">
      <Link
        href="/teams"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Teams
      </Link>

      {error && (
        <Card className="mb-6 border-destructive">
          <CardContent className="py-4 flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4" />
            {error}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-row gap-3 md:gap-6 mb-4 items-start">
        <div className="relative h-14 w-14 md:h-24 md:w-24 shrink-0">
          <Image
            src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
            alt={`${team.name} logo`}
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="mb-0">{team.name}</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">Location: {team.locationName}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <SeasonSelector season={season} onSeasonChange={setSeason} className="w-auto py-0 hover:bg-transparent" />
        {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
      </div>

      <p className="text-muted-foreground text-sm md:text-base mb-4">
        {team.league?.name} &middot; {team.division?.name}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {teamRecord ? (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Record</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {teamRecord.wins}-{teamRecord.losses}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Win %</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{teamRecord.winningPercentage}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Games Back</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{teamRecord.gamesBack || "-"}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Run Diff</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={`text-2xl font-bold ${teamRecord.runDifferential > 0
                      ? "text-green-500"
                      : teamRecord.runDifferential < 0
                        ? "text-red-500"
                        : ""
                    }`}
                >
                  {teamRecord.runDifferential > 0 ? "+" : ""}
                  {teamRecord.runDifferential}
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="col-span-2 sm:col-span-4">
            <CardContent className="py-6 text-center text-muted-foreground">
              No standings data available for {season}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Postseason History Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">World Series</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {postseasonHistory ? postseasonHistory.worldSeriesWins : "-"}
            </p>
            {postseasonHistory && postseasonHistory.worldSeriesAppearances > 0 && (
              <p className="text-xs text-muted-foreground">
                {postseasonHistory.worldSeriesAppearances} appearance{postseasonHistory.worldSeriesAppearances !== 1 ? "s" : ""}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pennants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {postseasonHistory ? postseasonHistory.pennants : "-"}
            </p>
            <p className="text-xs text-muted-foreground">League titles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Playoff Apps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {postseasonHistory ? postseasonHistory.playoffAppearances : "-"}
            </p>
            <p className="text-xs text-muted-foreground">Since 1995</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {postseasonHistory?.appearances?.find(a => a.round === "World Series" && a.won)?.season || "-"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roster" className="space-y-6">
        <TabsList>
          <TabsTrigger value="roster">Roster</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="postseason">Postseason</TabsTrigger>
          <TabsTrigger value="logos">Logos</TabsTrigger>
          <TabsTrigger value="uniforms">Uniforms</TabsTrigger>
        </TabsList>

        {/* Roster Tab */}
        <TabsContent value="roster" className="space-y-8">
          <h2 className="font-league text-4xl font-bold">{season} Roster</h2>
          {roster.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RosterTable players={pitchers} title="Pitchers" />
              <div className="space-y-8">
                <RosterTable players={catchers} title="Catchers" />
                <RosterTable players={infielders} title="Infielders" />
                <RosterTable players={outfielders} title="Outfielders" />
                {dh.length > 0 && <RosterTable players={dh} title="Designated Hitters" />}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No roster data available for {season}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Data Tab */}
        <TabsContent value="data" className="space-y-6">
          <h2 className="font-league text-4xl font-bold">Historical Data (1960-Present)</h2>
          {historyLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          ) : history.length > 0 ? (
            <>
              <HistoricalChart data={history} teamName={team.name} />
              <HistoricalTable data={history} />
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                {historyLoaded ? "No historical data available for this team." : "Loading historical data..."}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Postseason Tab */}
        <TabsContent value="postseason" className="space-y-6">
          <h2 className="font-league text-4xl font-bold">Postseason History (Since 1995)</h2>
          {historyLoading ? (
            <Skeleton className="h-96 w-full" />
          ) : postseasonHistory && postseasonHistory.appearances.length > 0 ? (
            <div className="space-y-2">
              {(() => {
                // Group appearances by year
                const yearGroups = postseasonHistory.appearances.reduce((acc, appearance) => {
                  if (!acc[appearance.season]) {
                    acc[appearance.season] = []
                  }
                  acc[appearance.season].push(appearance)
                  return acc
                }, {} as Record<number, typeof postseasonHistory.appearances>)

                // Sort years descending
                const sortedYears = Object.keys(yearGroups)
                  .map(Number)
                  .sort((a, b) => b - a)

                return sortedYears.map((year) => {
                  const yearAppearances = yearGroups[year]
                  // Sort by round importance: World Series > LCS > LDS > Wild Card
                  const roundOrder = ["World Series", "LCS", "LDS", "Wild Card"]
                  yearAppearances.sort((a, b) => roundOrder.indexOf(a.round) - roundOrder.indexOf(b.round))

                  const bestResult = yearAppearances[0]
                  const wonWorldSeries = yearAppearances.some(a => a.round === "World Series" && a.won)
                  const isExpanded = expandedYears.has(year)

                  // Determine the final result text
                  let resultText = ""
                  if (wonWorldSeries) {
                    resultText = "World Series Champions"
                  } else if (bestResult.round === "World Series") {
                    resultText = "Lost World Series"
                  } else if (bestResult.round === "LCS" && !bestResult.won) {
                    resultText = "Lost LCS"
                  } else if (bestResult.round === "LCS" && bestResult.won) {
                    resultText = "Won LCS, Lost World Series"
                  } else if (bestResult.round === "LDS" && !bestResult.won) {
                    resultText = "Lost LDS"
                  } else if (bestResult.round === "Wild Card" && !bestResult.won) {
                    resultText = "Lost Wild Card"
                  } else {
                    resultText = `${bestResult.won ? "Won" : "Lost"} ${bestResult.round}`
                  }

                  return (
                    <Card key={year} className={wonWorldSeries ? "border-green-500/50" : ""}>
                      <CardContent className="py-0">
                        <button
                          onClick={() => {
                            const newExpanded = new Set(expandedYears)
                            if (isExpanded) {
                              newExpanded.delete(year)
                            } else {
                              newExpanded.add(year)
                            }
                            setExpandedYears(newExpanded)
                          }}
                          className="w-full py-4 flex items-center justify-between text-left"
                        >
                          <div className="flex items-center gap-3">
                            {wonWorldSeries && <Trophy className="h-5 w-5 text-yellow-500" />}
                            <span className="font-bold text-lg">{year}</span>
                            <span className={`text-sm ${wonWorldSeries ? "text-green-500 font-medium" : "text-muted-foreground"}`}>
                              {resultText}
                            </span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="pb-4 space-y-2">
                            {yearAppearances.map((appearance, idx) => (
                              <div
                                key={`${appearance.round}-${idx}`}
                                className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-md"
                              >
                                <div>
                                  <p className="font-medium">{appearance.round}</p>
                                  <p className="text-sm text-muted-foreground">vs {appearance.opponent}</p>
                                </div>
                                <p className={`font-bold ${appearance.won ? "text-green-500" : "text-red-500"}`}>
                                  {appearance.won ? "Won" : "Lost"} {appearance.result}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })
              })()}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                {historyLoaded ? "No postseason data available for this team." : "Loading postseason data..."}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Logos Tab */}
        <TabsContent value="logos">
          <TeamLogos teamId={team.id} teamName={team.name} />
        </TabsContent>

        {/* Uniforms Tab */}
        <TabsContent value="uniforms">
          <HistoricalUniforms teamId={team.id} teamName={team.name} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
