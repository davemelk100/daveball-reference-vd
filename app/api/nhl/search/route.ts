import { NextResponse } from "next/server"
import { searchPlayers, getStandings } from "@/lib/nhl-api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""

  if (query.length < 2) {
    return NextResponse.json({ players: [], teams: [] })
  }

  try {
    const [players, standings] = await Promise.all([
      searchPlayers(query),
      getStandings(),
    ])

    const lowerQ = query.toLowerCase()
    const teams = standings
      .filter(
        (t) =>
          t.teamName.default.toLowerCase().includes(lowerQ) ||
          t.teamAbbrev.default.toLowerCase().includes(lowerQ) ||
          t.teamCommonName.default.toLowerCase().includes(lowerQ)
      )
      .map((t) => ({
        abbrev: t.teamAbbrev.default,
        name: t.teamName.default,
        logo: t.teamLogo,
      }))

    return NextResponse.json({ players, teams })
  } catch (error) {
    console.error("Error searching NHL:", error)
    return NextResponse.json({ players: [], teams: [] }, { status: 500 })
  }
}
