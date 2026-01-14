"use client"

import { useState, useEffect } from "react"
import { StandingsTable } from "@/components/standings-table"
import { SeasonSelector } from "@/components/season-selector"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, AlertCircle } from "lucide-react"

interface StandingsPageContentProps {
  initialStandings: any[]
  initialSeason: number
}

export function StandingsPageContent({ initialStandings, initialSeason }: StandingsPageContentProps) {
  const [season, setSeason] = useState(initialSeason)
  const [standings, setStandings] = useState<any[]>(initialStandings)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLeague, setSelectedLeague] = useState<"al" | "nl" | "all">("al")

  useEffect(() => {
    if (season === initialSeason) {
      setStandings(initialStandings)
      return
    }

    const fetchStandings = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/standings?season=${season}`)
        const data = await response.json()
        setStandings(data.standings)
      } catch (error) {
        console.error("Error fetching standings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStandings()
  }, [season, initialSeason, initialStandings])

  // Filter by league
  const alDivisions = standings.filter((d: any) => d.league?.id === 103)
  const nlDivisions = standings.filter((d: any) => d.league?.id === 104)

  // Sort divisions by name (East, Central, West)
  const sortDivisions = (divisions: typeof standings) => {
    return [...divisions].sort((a, b) => {
      const order = ["East", "Central", "West"]
      const getDivName = (d: any) => d.division?.name || ""
      const aIdx = order.findIndex((o) => getDivName(a).includes(o))
      const bIdx = order.findIndex((o) => getDivName(b).includes(o))
      return aIdx - bIdx
    })
  }

  const sortedAL = sortDivisions(alDivisions)
  const sortedNL = sortDivisions(nlDivisions)
  const hasData = sortedAL.length > 0 || sortedNL.length > 0

  return (
    <main className="container py-2">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-1">
          <h2 className="mb-0 shrink-0 whitespace-nowrap">Standings</h2>
          <SeasonSelector
            season={season}
            onSeasonChange={setSeason}
            className="w-auto py-0 hover:bg-transparent"
          />
          {!isLoading && standings && standings.length > 0 && hasData && (
            <Select value={selectedLeague} onValueChange={(val) => setSelectedLeague(val as "al" | "nl" | "all")}>
              <SelectTrigger className="w-auto border-0 shadow-none p-0 h-auto bg-transparent hover:bg-transparent focus:ring-0 focus-visible:ring-0">
                <span className="font-league text-[40px] leading-none font-bold border-b-2 border-foreground">
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
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : !standings || standings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <AlertCircle className="h-12 w-12 mb-4" />
          <p className="text-lg">Unable to load standings data for {season}</p>
          <p className="text-sm">Please try a different season</p>
        </div>
      ) : !hasData ? (
        <div className="space-y-6">
          {standings.map((division: any, idx: number) => (
            <StandingsTable key={division.division?.id || idx} division={division} />
          ))}
        </div>
      ) : (
        <>
          {selectedLeague === "al" && (
            <div className="space-y-6">
              {sortedAL.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center">No American League standings available</p>
              ) : (
                sortedAL.map((division, idx) => <StandingsTable key={division.division?.id || idx} division={division} />)
              )}
            </div>
          )}

          {selectedLeague === "nl" && (
            <div className="space-y-6">
              {sortedNL.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center">No National League standings available</p>
              ) : (
                sortedNL.map((division, idx) => <StandingsTable key={division.division?.id || idx} division={division} />)
              )}
            </div>
          )}

          {selectedLeague === "all" && (
            <div className="grid gap-6 xl:grid-cols-2">
              <div className="space-y-6">
                <h2 className="font-league text-4xl font-semibold mr-4">American League</h2>
                {sortedAL.map((division, idx) => (
                  <StandingsTable key={division.division?.id || idx} division={division} />
                ))}
              </div>
              <div className="space-y-6">
                <h2 className="font-league text-4xl font-semibold mr-4">National League</h2>
                {sortedNL.map((division, idx) => (
                  <StandingsTable key={division.division?.id || idx} division={division} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  )
}
