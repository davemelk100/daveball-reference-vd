// USPBL API utilities
// Scrapes data from uspbl.com
// United Shore Professional Baseball League (founded 2016, Utica MI)

const BASE_URL = "https://www.uspbl.com";

const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes
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

async function fetchHTML(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "MajorLeagueNumbers/1.0" },
  });
  if (!res.ok) throw new Error(`USPBL fetch error: ${res.status} ${url}`);
  return res.text();
}

// ── Interfaces ──────────────────────────────────────────────

export interface USPBLTeam {
  slug: string;
  name: string;
  abbreviation: string;
  color: string;
  logoUrl: string;
}

export interface USPBLPlayer {
  id: string;
  name: string;
  number?: string;
  position: string;
  bats?: string;
  throws?: string;
  height?: string;
  weight?: string;
  hometown?: string;
  college?: string;
  teamSlug: string;
  teamName: string;
}

export interface USPBLStandingsEntry {
  team: string;
  teamSlug: string;
  w: number;
  l: number;
  t: number;
  pct: string;
  gb: string;
  rs: number;
  ra: number;
  diff: number;
  l10: string;
  strk: string;
}

// ── Static Data ─────────────────────────────────────────────

export const USPBL_TEAMS: USPBLTeam[] = [
  {
    slug: "birmingham-bloomfield-beavers",
    name: "Birmingham Bloomfield Beavers",
    abbreviation: "BBB",
    color: "#00263e",
    logoUrl: "https://uspbl.com/wp-content/uploads/2016/01/lg-beaver-1.png",
  },
  {
    slug: "eastside-diamond-hoppers",
    name: "Eastside Diamond Hoppers",
    abbreviation: "EDH",
    color: "#c8102e",
    logoUrl: "https://uspbl.com/wp-content/uploads/2016/01/lg-hopper-1.png",
  },
  {
    slug: "utica-unicorns",
    name: "Utica Unicorns",
    abbreviation: "UU",
    color: "#6f2da8",
    logoUrl: "https://uspbl.com/wp-content/uploads/2016/01/lg-unicorn-2.png",
  },
  {
    slug: "westside-woolly-mammoths",
    name: "Westside Woolly Mammoths",
    abbreviation: "WWM",
    color: "#2d6a4f",
    logoUrl: "https://uspbl.com/wp-content/uploads/2016/12/logo.png",
  },
];

// ── Helper: parse HTML tables ───────────────────────────────

function parseTableRows(html: string): string[][] {
  const rows: string[][] = [];
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let rowMatch;
  while ((rowMatch = rowRegex.exec(html)) !== null) {
    const cells: string[] = [];
    const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowMatch[1])) !== null) {
      cells.push(cellMatch[1].replace(/<[^>]+>/g, "").trim());
    }
    if (cells.length > 0) rows.push(cells);
  }
  return rows;
}

// ── API Functions ───────────────────────────────────────────

export function getUSPBLTeams(): USPBLTeam[] {
  return USPBL_TEAMS;
}

export function getUSPBLTeam(slug: string): USPBLTeam | undefined {
  return USPBL_TEAMS.find((t) => t.slug === slug);
}

export function getUSPBLTeamByAbbrev(abbrev: string): USPBLTeam | undefined {
  return USPBL_TEAMS.find((t) => t.abbreviation === abbrev);
}

export async function getUSPBLTeamRoster(slug: string): Promise<USPBLPlayer[]> {
  const cacheKey = `uspbl-roster-${slug}`;
  const cached = getCached<USPBLPlayer[]>(cacheKey);
  if (cached) return cached;

  const team = getUSPBLTeam(slug);
  if (!team) return [];

  try {
    const html = await fetchHTML(`${BASE_URL}/teams/${slug}/roster`);
    const rows = parseTableRows(html);
    // Skip header row
    const players: USPBLPlayer[] = rows.slice(1).map((row, i) => ({
      id: `${slug}-${i}`,
      number: row[0] || undefined,
      name: row[1] || `Player ${i + 1}`,
      position: row[2] || "—",
      bats: row[3] || undefined,
      throws: row[4] || undefined,
      height: row[5] || undefined,
      weight: row[6] || undefined,
      hometown: row[7] || undefined,
      college: row[8] || undefined,
      teamSlug: slug,
      teamName: team.name,
    })).filter((p) => p.name && p.name !== "Player 1");

    setCache(cacheKey, players, CACHE_TTL_LONG);
    return players;
  } catch (error) {
    console.error(`Error fetching USPBL roster for ${slug}:`, error);
    return [];
  }
}

export async function getUSPBLStandings(): Promise<USPBLStandingsEntry[]> {
  const cacheKey = "uspbl-standings";
  const cached = getCached<USPBLStandingsEntry[]>(cacheKey);
  if (cached) return cached;

  try {
    const html = await fetchHTML(`${BASE_URL}/standings`);
    const rows = parseTableRows(html);

    const standings: USPBLStandingsEntry[] = rows.slice(1).map((row) => {
      const teamName = row[0] || "";
      const matchedTeam = USPBL_TEAMS.find(
        (t) => teamName.toLowerCase().includes(t.name.toLowerCase().split(" ").pop()!)
          || t.name.toLowerCase().includes(teamName.toLowerCase())
      );
      return {
        team: matchedTeam?.name || teamName,
        teamSlug: matchedTeam?.slug || teamName.toLowerCase().replace(/\s+/g, "-"),
        w: parseInt(row[1]) || 0,
        l: parseInt(row[2]) || 0,
        t: parseInt(row[3]) || 0,
        pct: row[4] || ".000",
        gb: row[5] || "—",
        rs: parseInt(row[6]) || 0,
        ra: parseInt(row[7]) || 0,
        diff: parseInt(row[8]) || 0,
        l10: row[9] || "0-0",
        strk: row[10] || "—",
      };
    }).filter((s) => s.team);

    // If no standings scraped (offseason), return default empty standings
    if (standings.length === 0) {
      const defaultStandings = USPBL_TEAMS.map((t) => ({
        team: t.name,
        teamSlug: t.slug,
        w: 0, l: 0, t: 0, pct: ".000", gb: "—",
        rs: 0, ra: 0, diff: 0, l10: "0-0", strk: "—",
      }));
      setCache(cacheKey, defaultStandings, CACHE_TTL);
      return defaultStandings;
    }

    setCache(cacheKey, standings, CACHE_TTL);
    return standings;
  } catch (error) {
    console.error("Error fetching USPBL standings:", error);
    // Return default empty standings on error
    return USPBL_TEAMS.map((t) => ({
      team: t.name,
      teamSlug: t.slug,
      w: 0, l: 0, t: 0, pct: ".000", gb: "—",
      rs: 0, ra: 0, diff: 0, l10: "0-0", strk: "—",
    }));
  }
}

export async function getUSPBLPlayers(): Promise<USPBLPlayer[]> {
  const cacheKey = "uspbl-all-players";
  const cached = getCached<USPBLPlayer[]>(cacheKey);
  if (cached) return cached;

  try {
    const rosters = await Promise.all(
      USPBL_TEAMS.map((t) => getUSPBLTeamRoster(t.slug))
    );
    const allPlayers = rosters.flat();
    setCache(cacheKey, allPlayers, CACHE_TTL_LONG);
    return allPlayers;
  } catch (error) {
    console.error("Error fetching all USPBL players:", error);
    return [];
  }
}

export async function getUSPBLPlayer(id: string): Promise<USPBLPlayer | null> {
  const players = await getUSPBLPlayers();
  return players.find((p) => p.id === id) || null;
}

export async function searchUSPBL(query: string): Promise<{ players: USPBLPlayer[]; teams: USPBLTeam[] }> {
  const lowerQ = query.toLowerCase();

  const teams = USPBL_TEAMS.filter(
    (t) =>
      t.name.toLowerCase().includes(lowerQ) ||
      t.abbreviation.toLowerCase().includes(lowerQ)
  );

  const allPlayers = await getUSPBLPlayers();
  const players = allPlayers.filter(
    (p) => p.name.toLowerCase().includes(lowerQ)
  ).slice(0, 20);

  return { players, teams };
}
