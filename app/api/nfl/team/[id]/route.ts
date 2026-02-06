import { getNFLTeam, getNFLTeamRoster } from "@/lib/nfl-api"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const [team, roster] = await Promise.all([
      getNFLTeam(id),
      getNFLTeamRoster(id),
    ])
    return NextResponse.json({ team, roster })
  } catch (error) {
    console.error("Error fetching NFL team:", error)
    return NextResponse.json({ team: null, roster: [] }, { status: 500 })
  }
}
