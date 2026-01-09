import { type NextRequest, NextResponse } from "next/server"
import { searchPlayers } from "@/lib/mlb-api"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")

  if (!query || query.length < 2) {
    return NextResponse.json({ players: [] })
  }

  try {
    const players = await searchPlayers(query)
    return NextResponse.json({ players })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ players: [] })
  }
}
