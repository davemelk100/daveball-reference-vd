import { type NextRequest, NextResponse } from "next/server"
import { getPlayer } from "@/lib/mlb-api"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const player = await getPlayer(Number(id))
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }
    return NextResponse.json(player)
  } catch (error) {
    console.error("Error fetching player data:", error)
    return NextResponse.json({ error: "Failed to fetch player" }, { status: 500 })
  }
}
