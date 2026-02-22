// PGA Golf API utilities (ESPN)
// Primary: https://site.api.espn.com/apis/site/v2/sports/golf/pga
// Leaders: https://site.api.espn.com/apis/site/v3/sports/golf/pga/leaders
// CDN:     https://a.espncdn.com

const BASE = "https://site.api.espn.com/apis/site/v2/sports/golf/pga";
const BASE_V3 = "https://site.api.espn.com/apis/site/v3/sports/golf/pga";
const PLAYER_BASE = "https://site.web.api.espn.com/apis/common/v3/sports/golf/pga/athletes";

const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const CACHE_TTL_LONG = 24 * 60 * 60 * 1000; // 24 hours

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.data as T;
  }
  return null;
}

function setCache(key: string, data: any, ttl: number = CACHE_TTL): void {
  cache.set(key, { data, timestamp: Date.now(), ttl });
}

async function fetchJSON<T>(url: string, ttl: number = CACHE_TTL): Promise<T> {
  const cached = getCached<T>(url);
  if (cached) return cached;

  const res = await fetch(url, {
    headers: { "User-Agent": "MajorLeagueNumbers/1.0" },
  });
  if (!res.ok) throw new Error(`PGA API error: ${res.status} ${url}`);
  const data = await res.json();
  setCache(url, data, ttl);
  return data;
}

// ── Interfaces ──────────────────────────────────────────────

export interface PGALeaderEntry {
  id: string;
  name: string;
  team: string;
  teamAbbrev: string;
  position: string;
  headshot: string;
  value: string;
  displayValue: string;
}

export interface PGALeaderCategory {
  name: string;
  displayName: string;
  leaders: PGALeaderEntry[];
}

export interface PGACompetitor {
  id: string;
  name: string;
  position: string;
  score: string;
  totalScore: string;
  thru: string;
  round: string;
  headshot: string;
  country: string;
}

export interface PGATournament {
  id: string;
  name: string;
  shortName: string;
  startDate: string;
  endDate: string;
  venue: string;
  city: string;
  state: string;
  status: string;
  purse: string;
  competitors: PGACompetitor[];
}

// ── API Functions ───────────────────────────────────────────

export async function getPGAScoreboard(): Promise<any> {
  const url = `${BASE}/scoreboard`;
  return fetchJSON<any>(url, CACHE_TTL);
}

export async function getPGALeaders(): Promise<PGALeaderCategory[]> {
  const data = await fetchJSON<any>(`${BASE_V3}/leaders`, CACHE_TTL);
  const categories: PGALeaderCategory[] = [];

  const cats = data.leaders?.categories || data.leaders || [];
  const catArray = Array.isArray(cats) ? cats : [];

  for (const cat of catArray) {
    const leaders: PGALeaderEntry[] = [];

    for (const entry of cat.leaders || []) {
      const athlete = entry.athlete;
      if (!athlete) continue;

      leaders.push({
        id: String(athlete.id),
        name: athlete.displayName || athlete.fullName || "Unknown",
        team: athlete.team?.abbreviation || athlete.team?.displayName || "",
        teamAbbrev: athlete.team?.abbreviation || "",
        position: athlete.position?.abbreviation || "—",
        headshot: athlete.headshot?.href || getPlayerHeadshotUrl(athlete.id),
        value: String(entry.value ?? ""),
        displayValue: entry.displayValue || String(entry.value ?? ""),
      });
    }

    categories.push({
      name: cat.name || "",
      displayName: cat.displayName || cat.name || "",
      leaders,
    });
  }

  return categories;
}

export async function getPGAPlayer(id: string): Promise<any> {
  const athleteUrl = `https://sports.core.api.espn.com/v2/sports/golf/leagues/pga/athletes/${id}`;
  const statsUrl = `${PLAYER_BASE}/${id}/overview`;

  const [athleteData, statsData] = await Promise.all([
    fetchJSON<any>(athleteUrl, CACHE_TTL).catch(() => null),
    fetchJSON<any>(statsUrl, CACHE_TTL).catch(() => ({})),
  ]);

  return {
    athlete: athleteData,
    stats: statsData?.statistics ? [statsData.statistics] : [],
    news: statsData?.news,
    recentResults: statsData?.recentCompetitions || statsData?.gameLog,
  };
}

export async function getPGAPlayerOverview(id: string): Promise<any> {
  const url = `${PLAYER_BASE}/${id}/overview`;
  return fetchJSON<any>(url, CACHE_TTL).catch(() => ({}));
}

export async function searchPGA(query: string): Promise<{ players: any[] }> {
  let players: any[] = [];
  try {
    const url = `https://site.api.espn.com/apis/common/v3/search?query=${encodeURIComponent(query)}&limit=20&type=player&sport=golf&league=pga`;
    const data = await fetchJSON<any>(url, CACHE_TTL);
    players = (data.items || data.results || []).map((item: any) => ({
      id: String(item.id || item.$ref?.split("/").pop() || ""),
      name: item.displayName || item.name || "",
      position: item.position || "",
      team: item.team?.displayName || "",
      teamAbbrev: item.team?.abbreviation || "",
      headshot: item.headshot?.href || "",
    }));
  } catch {
    // search endpoint may not work, that's ok
  }

  return { players };
}

export function parseScoreboardTournament(data: any): PGATournament | null {
  const events = data?.events || [];
  if (events.length === 0) return null;

  const event = events[0];
  const competition = event.competitions?.[0];
  if (!competition) return null;

  const competitors: PGACompetitor[] = (competition.competitors || [])
    .slice(0, 80)
    .map((c: any) => {
      const athlete = c.athlete || {};
      const status = c.status || {};
      const linescores = c.linescores || [];
      const currentRound = linescores.length > 0 ? linescores[linescores.length - 1] : null;

      const playerId = String(athlete.id || c.id || "");
      return {
        id: playerId,
        name: athlete.displayName || athlete.fullName || "Unknown",
        position: c.status?.position?.displayName || String(c.sortOrder || "—"),
        score: c.score?.displayValue || c.score?.value?.toString() || "E",
        totalScore: c.linescores?.reduce((sum: number, r: any) => sum + (r.value || 0), 0)?.toString() || "—",
        thru: status.thru?.toString() || status.displayValue || "—",
        round: currentRound?.displayValue || currentRound?.value?.toString() || "—",
        headshot: athlete.headshot?.href || getPlayerHeadshotUrl(playerId),
        country: athlete.flag?.href || "",
      };
    });

  const venue = competition.venue || {};
  const address = venue.address || {};

  return {
    id: String(event.id),
    name: event.name || event.shortName || "Tournament",
    shortName: event.shortName || event.name || "Tournament",
    startDate: event.date || competition.date || "",
    endDate: event.endDate || "",
    venue: venue.fullName || "",
    city: address.city || "",
    state: address.state || "",
    status: competition.status?.type?.description || "Scheduled",
    purse: competition.purse?.displayValue || event.purse?.displayValue || "",
    competitors,
  };
}

export async function getPGAAllPlayers(): Promise<PGALeaderEntry[]> {
  // 1. Get player IDs from FedEx Cup season leaders (most comprehensive list)
  const CORE = "https://sports.core.api.espn.com/v2/sports/golf/leagues/pga";
  const leadersUrl = `${CORE}/seasons/2025/types/2/leaders?limit=300`;
  const leadersData = await fetchJSON<any>(leadersUrl, CACHE_TTL_LONG).catch(() => null);

  const idSet = new Set<string>();

  if (leadersData?.categories) {
    for (const cat of leadersData.categories) {
      for (const entry of cat.leaders || []) {
        const ref: string = entry.athlete?.$ref || "";
        const match = ref.match(/athletes\/(\d+)/);
        if (match) idSet.add(match[1]);
      }
    }
  }

  // 2. Also pull IDs from current scoreboard
  const scoreboard = await getPGAScoreboard().catch(() => null);
  for (const event of scoreboard?.events || []) {
    for (const comp of event.competitions || []) {
      for (const c of comp.competitors || []) {
        const id = String(c.athlete?.id || c.id || "");
        if (id) idSet.add(id);
      }
    }
  }

  // 3. Fetch each athlete's name (with 24h cache per athlete)
  const ids = Array.from(idSet);
  const BATCH = 20;
  const playerMap = new Map<string, PGALeaderEntry>();

  for (let i = 0; i < ids.length; i += BATCH) {
    const batch = ids.slice(i, i + BATCH);
    const results = await Promise.all(
      batch.map(async (id) => {
        try {
          const data = await fetchJSON<any>(`${CORE}/athletes/${id}`, CACHE_TTL_LONG);
          return {
            id,
            name: data.displayName || data.fullName || "Unknown",
            team: data.flag?.alt || data.citizenship || "",
            teamAbbrev: "",
            position: "—",
            headshot: data.headshot?.href || getPlayerHeadshotUrl(id),
            value: "",
            displayValue: "",
          } satisfies PGALeaderEntry;
        } catch {
          return null;
        }
      })
    );
    for (const p of results) {
      if (p) playerMap.set(p.id, p);
    }
  }

  // Also merge scoreboard competitors that have inline data
  for (const event of scoreboard?.events || []) {
    for (const comp of event.competitions || []) {
      for (const c of comp.competitors || []) {
        const athlete = c.athlete || {};
        const id = String(athlete.id || c.id || "");
        if (id && !playerMap.has(id) && athlete.displayName) {
          playerMap.set(id, {
            id,
            name: athlete.displayName || athlete.fullName || "Unknown",
            team: athlete.flag?.alt || "",
            teamAbbrev: "",
            position: "—",
            headshot: athlete.headshot?.href || getPlayerHeadshotUrl(id),
            value: "",
            displayValue: "",
          });
        }
      }
    }
  }

  return Array.from(playerMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

// ── Helpers ─────────────────────────────────────────────────

export function getPlayerHeadshotUrl(id: string | number): string {
  return `https://a.espncdn.com/i/headshots/golf/players/full/${id}.png`;
}
