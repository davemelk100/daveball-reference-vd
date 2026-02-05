import { getUSPBLStandings } from "@/lib/uspbl-api"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const standings = await getUSPBLStandings()
    return NextResponse.json({ standings })
  } catch (error) {
    console.error("Error fetching USPBL standings:", error)
    return NextResponse.json({ standings: [] }, { status: 500 })
  }
}
