import { NextResponse } from "next/server"
import { searchUSPBL } from "@/lib/uspbl-api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""

  if (query.length < 2) {
    return NextResponse.json({ players: [], teams: [] })
  }

  try {
    const results = await searchUSPBL(query)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Error searching USPBL:", error)
    return NextResponse.json({ players: [], teams: [] }, { status: 500 })
  }
}
