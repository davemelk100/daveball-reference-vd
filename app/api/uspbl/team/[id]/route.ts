import { type NextRequest, NextResponse } from "next/server"
import { getUSPBLTeam, getUSPBLTeamRoster, getUSPBLStandings } from "@/lib/uspbl-api"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const [team, roster, standings] = await Promise.all([
      Promise.resolve(getUSPBLTeam(id)),
      getUSPBLTeamRoster(id),
      getUSPBLStandings(),
    ])
    const standing = standings.find((s) => s.teamSlug === id)
    return NextResponse.json({ team: team || null, roster, standing: standing || null })
  } catch (error) {
    console.error("Error fetching USPBL team:", error)
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 })
  }
}
