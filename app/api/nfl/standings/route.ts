import { getNFLStandings } from "@/lib/nfl-api"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const standings = await getNFLStandings()
    return NextResponse.json({ standings })
  } catch (error) {
    console.error("Error fetching NFL standings:", error)
    return NextResponse.json({ standings: [] }, { status: 500 })
  }
}
