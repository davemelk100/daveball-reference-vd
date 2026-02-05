import type { Metadata } from "next"
import { Suspense } from "react"
import { SearchPageContent } from "@/components/search-page-content"

export const metadata: Metadata = {
  title: "Search - MLB Players & Teams",
  description: "Search for MLB players and teams. Find current and historical players, team information, and statistics.",
  alternates: {
    canonical: "/search",
  },
  openGraph: {
    title: "Search MLB Players & Teams",
    description: "Search for MLB players and teams. Find current and historical players, team information, and statistics.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search MLB Players & Teams",
    description: "Search for MLB players and teams.",
  },
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageContent />
    </Suspense>
  )
}
