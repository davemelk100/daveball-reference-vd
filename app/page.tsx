import { DashboardContent } from "@/components/dashboard-content"
import { getMVPWinnersStatic, getCyYoungWinnersStatic } from "@/lib/awards-data"
import { getDefaultSeason } from "@/lib/mlb-api"

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  const defaultSeason = getDefaultSeason()
  const mvpWinners = getMVPWinnersStatic()
  const cyYoungWinners = getCyYoungWinnersStatic()

  return <DashboardContent initialSeason={defaultSeason} mvpWinners={mvpWinners} cyYoungWinners={cyYoungWinners} />
}
