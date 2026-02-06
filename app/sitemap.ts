import type { MetadataRoute } from "next"
import { getTeams, getLeaders, getDefaultSeason } from "@/lib/mlb-api"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://majorleaguenumbers.com"
  const defaultSeason = getDefaultSeason()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/mlb`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mlb/players`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mlb/teams`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mlb/standings`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nfl`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nfl/players`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nfl/teams`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nfl/standings`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/uspbl`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/uspbl/players`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/uspbl/teams`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/uspbl/standings`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ]

  // Dynamic team pages
  let teamPages: MetadataRoute.Sitemap = []
  try {
    const teams = await getTeams()
    teamPages = teams.map((team: { id: number }) => ({
      url: `${baseUrl}/mlb/teams/${team.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error("Error fetching teams for sitemap:", error)
  }

  // Dynamic player pages - get top players from various categories
  let playerPages: MetadataRoute.Sitemap = []
  try {
    const [hrLeaders, avgLeaders, eraLeaders, winsLeaders] = await Promise.all([
      getLeaders("hitting", "homeRuns", defaultSeason, 50),
      getLeaders("hitting", "battingAverage", defaultSeason, 50),
      getLeaders("pitching", "earnedRunAverage", defaultSeason, 50),
      getLeaders("pitching", "wins", defaultSeason, 50),
    ])

    // Collect unique player IDs
    const playerIds = new Set<number>()
    for (const leader of [...hrLeaders, ...avgLeaders, ...eraLeaders, ...winsLeaders]) {
      if (leader.person?.id) {
        playerIds.add(leader.person.id)
      }
    }

    playerPages = Array.from(playerIds).map((id) => ({
      url: `${baseUrl}/mlb/players/${id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error("Error fetching players for sitemap:", error)
  }

  return [...staticPages, ...teamPages, ...playerPages]
}
