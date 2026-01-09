import { NextResponse } from "next/server"

export async function GET() {
  const results: Record<string, { success: boolean; status?: number; error?: string }> = {}

  // Test 1: Public API that should always work
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    results.jsonplaceholder = { success: res.ok, status: res.status }
  } catch (e) {
    results.jsonplaceholder = { success: false, error: String(e) }
  }

  // Test 2: MLB Teams API (simpler endpoint)
  try {
    const res = await fetch("https://statsapi.mlb.com/api/v1/teams?sportId=1")
    results.mlb_teams = { success: res.ok, status: res.status }
  } catch (e) {
    results.mlb_teams = { success: false, error: String(e) }
  }

  // Test 3: MLB Leaders API (the one failing)
  try {
    const res = await fetch(
      "https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories=homeRuns&season=2025&sportId=1&limit=10&statGroup=hitting",
    )
    results.mlb_leaders = { success: res.ok, status: res.status }
  } catch (e) {
    results.mlb_leaders = { success: false, error: String(e) }
  }

  return NextResponse.json(results)
}
