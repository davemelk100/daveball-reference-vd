"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Suspense } from "react"
import { PlayerSearch } from "@/components/player-search"
import { PlayerCard } from "@/components/player-card"
import { SeasonSelector } from "@/components/season-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, ChevronDown } from "lucide-react"
import type { Player, Team } from "@/lib/mlb-api"
import { getTeams } from "@/lib/mlb-api"

type LeagueFilter = "ALL" | "AL" | "NL"

// AL = 103, NL = 104
const AL_LEAGUE_ID = 103
const NL_LEAGUE_ID = 104

interface PlayersPageContentProps {
  initialPlayers: Player[]
  initialSeason: number
}

export function PlayersPageContent({ initialPlayers, initialSeason }: PlayersPageContentProps) {
  const [season, setSeason] = useState(initialSeason)
  const [featuredPlayers, setFeaturedPlayers] = useState<Player[]>(initialPlayers)
  const [allPlayers, setAllPlayers] = useState<Player[]>([])
  const [displayedPlayers, setDisplayedPlayers] = useState<Player[]>([])
  const [showAll, setShowAll] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingAll, setIsFetchingAll] = useState(false)
  const [page, setPage] = useState(1)
  const [leagueFilter, setLeagueFilter] = useState<LeagueFilter>("ALL")
  const [teams, setTeams] = useState<Team[]>([])
  const itemsPerPage = 24

  // Fetch teams data for league filtering
  useEffect(() => {
    getTeams(season).then(setTeams).catch(console.error)
  }, [season])

  // Create a map of team ID to league ID
  const teamLeagueMap = useMemo(() => {
    const map = new Map<number, number>()
    teams.forEach(team => {
      if (team.league?.id) {
        map.set(team.id, team.league.id)
      }
    })
    return map
  }, [teams])

  // Filter players by league
  const filterByLeague = useCallback((players: Player[]) => {
    if (leagueFilter === "ALL") return players
    const targetLeagueId = leagueFilter === "AL" ? AL_LEAGUE_ID : NL_LEAGUE_ID
    return players.filter(player => {
      const teamId = player.currentTeam?.id
      if (!teamId) return false
      return teamLeagueMap.get(teamId) === targetLeagueId
    })
  }, [leagueFilter, teamLeagueMap])

  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true)
      setShowAll(false)
      setAllPlayers([])
      setDisplayedPlayers([])
      setPage(1)

      try {
        const response = await fetch(`/api/players?season=${season}`)
        const data = await response.json()
        setFeaturedPlayers(data.featuredPlayers)
      } catch (error) {
        console.error("Error fetching players:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (season !== initialSeason || featuredPlayers.length === 0) {
      fetchPlayers()
    } else {
      setFeaturedPlayers(initialPlayers)
      setShowAll(false)
      setPage(1)
    }
  }, [season, initialSeason, initialPlayers])

  const handleShowAll = async () => {
    if (allPlayers.length > 0) {
      setShowAll(true)
      const filtered = filterByLeague(allPlayers)
      setDisplayedPlayers(filtered.slice(0, itemsPerPage))
      setPage(1)
      return
    }

    setIsFetchingAll(true)
    try {
      const response = await fetch(`/api/players?season=${season}&type=all`)
      const data = await response.json()
      setAllPlayers(data.players)
      const filtered = filterByLeague(data.players)
      setDisplayedPlayers(filtered.slice(0, itemsPerPage))
      setShowAll(true)
      setPage(1)
    } catch (error) {
      console.error("Error fetching all players:", error)
    } finally {
      setIsFetchingAll(false)
    }
  }

  // Reset page when league filter changes
  useEffect(() => {
    setPage(1)
    if (showAll && allPlayers.length > 0) {
      const filtered = filterByLeague(allPlayers)
      setDisplayedPlayers(filtered.slice(0, itemsPerPage))
    }
  }, [filterByLeague, showAll, allPlayers])

  const loadMore = () => {
    const nextPage = page + 1
    const filtered = filterByLeague(allPlayers)
    const nextPlayers = filtered.slice(0, nextPage * itemsPerPage)
    setDisplayedPlayers(nextPlayers)
    setPage(nextPage)
  }

  const filteredFeatured = filterByLeague(featuredPlayers)
  const filteredAll = filterByLeague(allPlayers)
  const currentList = showAll ? displayedPlayers : filteredFeatured
  const hasMore = showAll && displayedPlayers.length < filteredAll.length

  return (
    <main className="container py-2">
      <div className="mb-6 flex flex-wrap md:flex-nowrap items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="mb-0 shrink-0 whitespace-nowrap">Players</h1>
          <SeasonSelector season={season} onSeasonChange={setSeason} />
          <Select value={leagueFilter} onValueChange={(value) => setLeagueFilter(value as LeagueFilter)}>
            <SelectTrigger
              className="w-auto border-0 shadow-none p-0 h-auto bg-transparent hover:bg-transparent focus:ring-0 focus-visible:ring-0"
              iconClassName="size-8 opacity-100"
            >
              <span className="font-league text-[40px] leading-none font-bold border-b-2 border-foreground">
                <SelectValue />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="AL">AL</SelectItem>
              <SelectItem value="NL">NL</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full order-last md:w-full md:max-w-xs md:ml-auto md:order-none">
          <Suspense fallback={<div className="h-10 bg-secondary rounded-md animate-pulse" />}>
            <PlayerSearch />
          </Suspense>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-league text-4xl font-semibold mr-4">
          {season} {showAll ? "Roster" : "Featured"}
          {(isLoading || isFetchingAll) && (
            <Loader2 className="inline-block ml-2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </h2>
        {!showAll ? (
          <Button variant="outline" size="sm" onClick={handleShowAll} disabled={isFetchingAll || isLoading}>
            {isFetchingAll ? "Loading..." : "See All Players"}
          </Button>
        ) : (
          <Button variant="ghost" size="sm" onClick={() => setShowAll(false)}>
            Show Featured Only
          </Button>
        )}
      </div>
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-secondary" />
                  <div className="flex-1">
                    <div className="h-4 w-24 bg-secondary rounded mb-2" />
                    <div className="h-3 w-32 bg-secondary rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentList.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" size="lg" onClick={loadMore} className="gap-2 bg-transparent">
                Load More Players
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}

          {showAll && !hasMore && filteredAll.length > 0 && (
            <p className="mt-8 text-center text-muted-foreground text-sm">
              Showing all {filteredAll.length} players
            </p>
          )}
        </>
      )}
    </main>
  )
}
