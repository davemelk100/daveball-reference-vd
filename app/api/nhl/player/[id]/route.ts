import { type NextRequest, NextResponse } from "next/server"
import { getPlayer } from "@/lib/nhl-api"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const player = await getPlayer(id)
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }
    return NextResponse.json(player)
  } catch (error) {
    console.error("Error fetching NHL player:", error)
    return NextResponse.json({ error: "Failed to fetch player" }, { status: 500 })
  }
}
