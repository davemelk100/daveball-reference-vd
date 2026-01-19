"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Loader2, Users, Trophy, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getTeamLogoUrl } from "@/lib/mlb-api"
import { searchPlayers, getPlayerHeadshotUrl, getTeams, getAllPlayers, type Player, type Team } from "@/lib/mlb-api"
import { cn } from "@/lib/utils"
import Fuse from "fuse.js"

type SearchResult =
  | { type: "player"; data: Player }
  | { type: "team"; data: Team }

export function ExpandableSearch() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Local data for instant fuzzy matching
  const [localPlayers, setLocalPlayers] = useState<Player[]>([])
  const [localTeams, setLocalTeams] = useState<Team[]>([])

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

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
        setIsOpen(false)
        setQuery("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false)
        setIsOpen(false)
        setQuery("")
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
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
      const playerFuzzy = fusePlayers.search(searchQuery).slice(0, 5).map(r => ({ type: "player" as const, data: r.item }))
      const teamFuzzy = fuseTeams.search(searchQuery).slice(0, 3).map(r => ({ type: "team" as const, data: r.item }))

      let currentResults: SearchResult[] = [...teamFuzzy, ...playerFuzzy]
      setResults(currentResults)

      // 2. Background API search for historical players
      const apiPlayers = await searchPlayers(searchQuery)
      const uniqueApiPlayers = apiPlayers.filter(ap =>
        !playerFuzzy.some(pf => pf.data.id === ap.id)
      )

      if (uniqueApiPlayers.length > 0) {
        const additionalPlayers = uniqueApiPlayers.slice(0, 5).map(p => ({ type: "player" as const, data: p }))
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

  const handleClose = () => {
    setIsExpanded(false)
    setIsOpen(false)
    setQuery("")
  }

  return (
    <div ref={containerRef} className="relative flex items-center">
      {/* Search icon button */}
      <button
        onClick={() => setIsExpanded(true)}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 hover:bg-muted transition-all duration-300",
          isExpanded && "opacity-0 w-0 overflow-hidden"
        )}
        aria-label="Open search"
      >
        <Search className="h-5 w-5 text-muted-foreground" />
      </button>

      {/* Expandable search input */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          isExpanded ? "w-[280px] sm:w-[350px] opacity-100" : "w-0 opacity-0"
        )}
      >
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            ref={inputRef}
            placeholder="Search players or teams..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            className={cn(
              "pl-10 pr-10 w-full bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 focus:border-primary transition-all rounded-xl h-10 text-sm",
              isOpen && query.length > 0 && "rounded-b-none border-b-0 shadow-lg"
            )}
          />
          {isLoading ? (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-primary" />
          ) : (
            <button
              onClick={handleClose}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {isOpen && results.length > 0 && (
          <Card className="absolute top-full right-0 w-[280px] sm:w-[350px] z-[60] max-h-[70vh] overflow-hidden border-t-0 rounded-t-none shadow-2xl bg-background/95 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <CardContent className="p-0 overflow-auto max-h-[inherit]">
              {results.map((result) => {
                const isPlayer = result.type === "player"
                const key = isPlayer ? `p-${result.data.id}` : `t-${result.data.id}`
                const href = isPlayer ? `/players/${result.data.id}` : `/teams/${result.data.id}`

                return (
                  <Link
                    key={key}
                    href={href}
                    onClick={handleClose}
                    className="flex items-center gap-3 p-3 hover:bg-primary/10 transition-all border-b border-border/50 last:border-0 group cursor-pointer"
                  >
                    <div className="relative shrink-0 overflow-hidden rounded-lg bg-muted flex items-center justify-center w-[40px] h-[40px]">
                      {isPlayer ? (
                        <Image
                          src={getPlayerHeadshotUrl(result.data.id, "small")}
                          alt={result.data.fullName}
                          width={40}
                          height={40}
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <Image
                          src={getTeamLogoUrl(result.data.id)}
                          alt={result.data.name}
                          width={32}
                          height={32}
                          className="p-1 group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <p className="font-semibold text-sm truncate">{isPlayer ? result.data.fullName : result.data.name}</p>
                        {isPlayer ? (
                          <Users className="h-3 w-3 text-muted-foreground shrink-0" />
                        ) : (
                          <Trophy className="h-3 w-3 text-amber-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate uppercase tracking-wider">
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

        {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
          <Card className="absolute top-full right-0 w-[280px] sm:w-[350px] z-[60] border-t-0 rounded-t-none shadow-xl bg-background/95 backdrop-blur-sm">
            <CardContent className="p-6 text-center text-muted-foreground text-sm">
              <Search className="h-6 w-6 mx-auto mb-2 opacity-20" />
              <p>No matches for "{query}"</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
