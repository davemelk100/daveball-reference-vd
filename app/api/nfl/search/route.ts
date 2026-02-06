import { NextResponse } from "next/server"
import { searchNFL } from "@/lib/nfl-api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""

  if (query.length < 2) {
    return NextResponse.json({ players: [], teams: [] })
  }

  try {
    const results = await searchNFL(query)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Error searching NFL:", error)
    return NextResponse.json({ players: [], teams: [] }, { status: 500 })
  }
}
