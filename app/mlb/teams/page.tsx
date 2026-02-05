import type { Metadata } from "next"
import { Suspense } from "react"
import { getTeams, getDefaultSeason } from "@/lib/mlb-api"
import { Skeleton } from "@/components/ui/skeleton"
import { TeamsPageContent } from "@/components/teams-page-content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "MLB Teams",
  description:
    "Browse all 30 Major League Baseball teams organized by division. View rosters, stats, and team history.",
  alternates: {
    canonical: "/teams",
  },
  openGraph: {
    title: "MLB Teams - All 30 Teams",
    description:
      "Browse all 30 Major League Baseball teams organized by division. View rosters, stats, and team history.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MLB Teams",
    description: "Browse all 30 MLB teams by division with rosters and stats.",
  },
}

function TeamsGridSkeleton() {
  return (
    <div className="space-y-10">
      {[1, 2, 3].map((i) => (
        <section key={i}>
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((j) => (
              <Skeleton key={j} className="h-16 w-full" />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

async function TeamsLoader() {
  const defaultSeason = getDefaultSeason()
  const teams = await getTeams(defaultSeason)

  return <TeamsPageContent initialTeams={teams} initialSeason={defaultSeason} />
}

export default function TeamsPage() {
  return (
    <Suspense
      fallback={
        <main className="container py-2">
          <Skeleton className="h-10 w-64 mb-8" />
          <TeamsGridSkeleton />
        </main>
      }
    >
      <TeamsLoader />
    </Suspense>
  )
}
