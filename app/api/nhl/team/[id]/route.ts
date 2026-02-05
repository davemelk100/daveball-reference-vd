import { type NextRequest, NextResponse } from "next/server"
import { getTeamRoster, getStandings } from "@/lib/nhl-api"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const [roster, standings] = await Promise.all([
      getTeamRoster(id),
      getStandings(),
    ])
    const team = standings.find(
      (t) => t.teamAbbrev.default === id
    )
    return NextResponse.json({ roster, team: team || null })
  } catch (error) {
    console.error("Error fetching NHL team:", error)
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 })
  }
}
