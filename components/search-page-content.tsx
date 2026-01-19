"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Loader2, Users, Trophy } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getTeamLogoUrl } from "@/lib/mlb-api"
import { searchPlayers, getPlayerHeadshotUrl, getTeams, getAllPlayers, type Player, type Team } from "@/lib/mlb-api"
import { cn } from "@/lib/utils"
import Fuse from "fuse.js"

type SearchResult =
  | { type: "player"; data: Player }
  | { type: "team"; data: Team }

export function SearchPageContent() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Local data for instant fuzzy matching
  const [localPlayers, setLocalPlayers] = useState<Player[]>([])
  const [localTeams, setLocalTeams] = useState<Team[]>([])

  useEffect(() => {
    // Auto-focus the search input on mount
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [players, teams] = await Promise.all([
          getAllPlayers(),
          getTeams()
        ])
        setLocalPlayers(players)
        setLocalTeams(teams)
      } catch (err) {
        console.error("Failed to load search data:", err)
      }
    }
    loadData()
  }, [])

  const fusePlayers = useMemo(() => new Fuse(localPlayers, {
    keys: ["fullName", "firstName", "lastName"],
    threshold: 0.3,
    distance: 100,
  }), [localPlayers])

  const fuseTeams = useMemo(() => new Fuse(localTeams, {
    keys: ["name", "teamName", "locationName", "abbreviation"],
    threshold: 0.3,
  }), [localTeams])

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      // 1. Instant local fuzzy search
      const playerFuzzy = fusePlayers.search(searchQuery).slice(0, 10).map(r => ({ type: "player" as const, data: r.item }))
      const teamFuzzy = fuseTeams.search(searchQuery).slice(0, 5).map(r => ({ type: "team" as const, data: r.item }))

      let currentResults: SearchResult[] = [...teamFuzzy, ...playerFuzzy]
      setResults(currentResults)

      // 2. Background API search for historical players or those not in the active list
      const apiPlayers = await searchPlayers(searchQuery)
      const uniqueApiPlayers = apiPlayers.filter(ap =>
        !playerFuzzy.some(pf => pf.data.id === ap.id)
      )

      if (uniqueApiPlayers.length > 0) {
        const additionalPlayers = uniqueApiPlayers.slice(0, 10).map(p => ({ type: "player" as const, data: p }))
        setResults([...currentResults, ...additionalPlayers])
      }
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }, [fusePlayers, fuseTeams])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        performSearch(query)
      } else {
        setResults([])
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [query, performSearch])

  return (
    <div className="container py-6">
      <h2 className="text-4xl font-bold mb-6">Search</h2>

      <div className="relative max-w-2xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            ref={inputRef}
            placeholder="Search players or teams..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-10 w-full bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 focus:border-primary transition-all rounded-md h-14 text-lg"
          />
          {isLoading && <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-primary" />}
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 max-w-2xl">
        {results.length > 0 && (
          <Card>
            <CardContent className="p-0">
              {results.map((result) => {
                const isPlayer = result.type === "player"
                const key = isPlayer ? `p-${result.data.id}` : `t-${result.data.id}`
                const href = isPlayer ? `/players/${result.data.id}` : `/teams/${result.data.id}`

                return (
                  <Link
                    key={key}
                    href={href}
                    className={cn(
                      "flex items-center gap-4 p-4 hover:bg-primary/10 transition-all border-b border-border/50 last:border-0 group",
                      "cursor-pointer"
                    )}
                  >
                    <div className="relative shrink-0 overflow-hidden rounded-lg bg-muted flex items-center justify-center w-[60px] h-[60px]">
                      {isPlayer ? (
                        <Image
                          src={getPlayerHeadshotUrl(result.data.id, "small")}
                          alt={result.data.fullName}
                          width={60}
                          height={60}
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <Image
                          src={getTeamLogoUrl(result.data.id)}
                          alt={result.data.name}
                          width={50}
                          height={50}
                          className="p-1 group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <p className="font-semibold text-base truncate">{isPlayer ? result.data.fullName : result.data.name}</p>
                        {isPlayer ? (
                          <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                        ) : (
                          <Trophy className="h-4 w-4 text-amber-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {isPlayer ? (
                          <>
                            {result.data.primaryPosition?.name || "Player"}
                            {result.data.currentTeam?.name ? ` • ${result.data.currentTeam.name}` : result.data.active ? "" : " • Historical"}
                          </>
                        ) : (
                          <>
                            {result.data.abbreviation} • {result.data.division?.name || "MLB"}
                          </>
                        )}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </CardContent>
          </Card>
        )}

        {query.length >= 2 && results.length === 0 && !isLoading && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p className="text-lg">No matches for "{query}"</p>
              <p className="text-sm mt-1 opacity-60">Try searching for a player name or team name</p>
            </CardContent>
          </Card>
        )}

        {query.length === 0 && (
          <p className="text-muted-foreground text-sm">
            Search for MLB players and teams by name
          </p>
        )}
      </div>
    </div>
  )
}
