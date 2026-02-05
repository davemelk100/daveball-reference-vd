import { getStandings } from "@/lib/nhl-api"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const standings = await getStandings()
    return NextResponse.json({ standings })
  } catch (error) {
    console.error("Error fetching NHL standings:", error)
    return NextResponse.json({ standings: [] }, { status: 500 })
  }
}
