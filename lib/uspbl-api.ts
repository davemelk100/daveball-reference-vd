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

// ── Championship History ────────────────────────────────────

export interface USPBLChampionship {
  year: number;
  champion: string;
  championSlug: string;
  record: string;
  opponent?: string;
}

export const USPBL_CHAMPIONSHIPS: USPBLChampionship[] = [
  { year: 2025, champion: "Eastside Diamond Hoppers", championSlug: "eastside-diamond-hoppers", record: "", opponent: "Westside Woolly Mammoths" },
  { year: 2024, champion: "Birmingham Bloomfield Beavers", championSlug: "birmingham-bloomfield-beavers", record: "17-27" },
  { year: 2023, champion: "Utica Unicorns", championSlug: "utica-unicorns", record: "17-26" },
  { year: 2022, champion: "Birmingham Bloomfield Beavers", championSlug: "birmingham-bloomfield-beavers", record: "22-22" },
  { year: 2021, champion: "Utica Unicorns", championSlug: "utica-unicorns", record: "22-12" },
  { year: 2020, champion: "Utica Unicorns", championSlug: "utica-unicorns", record: "22-13" },
  { year: 2019, champion: "Utica Unicorns", championSlug: "utica-unicorns", record: "22-22" },
  { year: 2018, champion: "Birmingham Bloomfield Beavers", championSlug: "birmingham-bloomfield-beavers", record: "26-21" },
  { year: 2017, champion: "Birmingham Bloomfield Beavers", championSlug: "birmingham-bloomfield-beavers", record: "29-24" },
  { year: 2016, champion: "Utica Unicorns", championSlug: "utica-unicorns", record: "22-27" },
];

// ── MLB Alumni ──────────────────────────────────────────────

export interface USPBLMLBAlumni {
  name: string;
  uspblTeam: string;
  uspblTeamSlug: string;
  mlbOrganization: string;
  yearSigned: number;
  madeMLBRoster: boolean;
  mlbDebut?: string;
}

export const USPBL_MLB_ALUMNI: USPBLMLBAlumni[] = [
  // Players who reached MLB rosters
  { name: "Dugan Darnell", uspblTeam: "Diamond Hoppers", uspblTeamSlug: "eastside-diamond-hoppers", mlbOrganization: "Colorado Rockies", yearSigned: 2025, madeMLBRoster: true },
  { name: "Luis Contreras", uspblTeam: "Diamond Hoppers", uspblTeamSlug: "eastside-diamond-hoppers", mlbOrganization: "Houston Astros", yearSigned: 2024, madeMLBRoster: true },
  { name: "Randy Wynne", uspblTeam: "Beavers", uspblTeamSlug: "birmingham-bloomfield-beavers", mlbOrganization: "Cincinnati Reds", yearSigned: 2023, madeMLBRoster: true },
  { name: "Joey Wiemer", uspblTeam: "Beavers", uspblTeamSlug: "birmingham-bloomfield-beavers", mlbOrganization: "Milwaukee Brewers", yearSigned: 2023, madeMLBRoster: true },
  { name: "Jared Koenig", uspblTeam: "Unicorns", uspblTeamSlug: "utica-unicorns", mlbOrganization: "Oakland Athletics", yearSigned: 2022, madeMLBRoster: true, mlbDebut: "2022" },
  { name: "Logan Gillaspie", uspblTeam: "Diamond Hoppers", uspblTeamSlug: "eastside-diamond-hoppers", mlbOrganization: "Baltimore Orioles", yearSigned: 2022, madeMLBRoster: true, mlbDebut: "May 17, 2022" },
  { name: "Randy Dobnak", uspblTeam: "Unicorns", uspblTeamSlug: "utica-unicorns", mlbOrganization: "Minnesota Twins", yearSigned: 2017, madeMLBRoster: true, mlbDebut: "August 9, 2019" },
  // Players signed to minor league deals
  { name: "Andrew Huffman", uspblTeam: "Beavers", uspblTeamSlug: "birmingham-bloomfield-beavers", mlbOrganization: "Minnesota Twins", yearSigned: 2024, madeMLBRoster: false },
  { name: "Duncan Hewitt", uspblTeam: "Unicorns", uspblTeamSlug: "utica-unicorns", mlbOrganization: "Minnesota Twins", yearSigned: 2023, madeMLBRoster: false },
  { name: "Jake Wosinski", uspblTeam: "Diamond Hoppers", uspblTeamSlug: "eastside-diamond-hoppers", mlbOrganization: "Minnesota Twins", yearSigned: 2023, madeMLBRoster: false },
  { name: "Ricardo Velez", uspblTeam: "Mammoths", uspblTeamSlug: "westside-woolly-mammoths", mlbOrganization: "Minnesota Twins", yearSigned: 2021, madeMLBRoster: false },
  { name: "Jackson Hicks", uspblTeam: "Beavers", uspblTeamSlug: "birmingham-bloomfield-beavers", mlbOrganization: "Minnesota Twins", yearSigned: 2021, madeMLBRoster: false },
  { name: "Jordan Carr", uspblTeam: "Unicorns", uspblTeamSlug: "utica-unicorns", mlbOrganization: "Minnesota Twins", yearSigned: 2021, madeMLBRoster: false },
  { name: "Malik Barrington", uspblTeam: "Diamond Hoppers", uspblTeamSlug: "eastside-diamond-hoppers", mlbOrganization: "New York Mets", yearSigned: 2021, madeMLBRoster: false },
  { name: "Collin Ledbetter", uspblTeam: "Beavers", uspblTeamSlug: "birmingham-bloomfield-beavers", mlbOrganization: "San Francisco Giants", yearSigned: 2020, madeMLBRoster: false },
  { name: "Noah Childress", uspblTeam: "Unicorns", uspblTeamSlug: "utica-unicorns", mlbOrganization: "Tampa Bay Rays", yearSigned: 2022, madeMLBRoster: false },
  { name: "Ethan Wiskur", uspblTeam: "Beavers", uspblTeamSlug: "birmingham-bloomfield-beavers", mlbOrganization: "Oakland Athletics", yearSigned: 2019, madeMLBRoster: false },
  { name: "Austin Athmann", uspblTeam: "Mammoths", uspblTeamSlug: "westside-woolly-mammoths", mlbOrganization: "Minnesota Twins", yearSigned: 2018, madeMLBRoster: false },
  { name: "Cooper Johnson", uspblTeam: "Beavers", uspblTeamSlug: "birmingham-bloomfield-beavers", mlbOrganization: "Detroit Tigers", yearSigned: 2019, madeMLBRoster: false },
  { name: "Thomas Mariani", uspblTeam: "Diamond Hoppers", uspblTeamSlug: "eastside-diamond-hoppers", mlbOrganization: "Chicago White Sox", yearSigned: 2016, madeMLBRoster: false },
  { name: "Donnie Wegner", uspblTeam: "Unicorns", uspblTeamSlug: "utica-unicorns", mlbOrganization: "Oakland Athletics", yearSigned: 2017, madeMLBRoster: false },
  { name: "Dan Ward", uspblTeam: "Beavers", uspblTeamSlug: "birmingham-bloomfield-beavers", mlbOrganization: "Minnesota Twins", yearSigned: 2017, madeMLBRoster: false },
  { name: "Jimmy Latona", uspblTeam: "Diamond Hoppers", uspblTeamSlug: "eastside-diamond-hoppers", mlbOrganization: "Kansas City Royals", yearSigned: 2018, madeMLBRoster: false },
];

export function getUSPBLChampionships(): USPBLChampionship[] {
  return USPBL_CHAMPIONSHIPS;
}

export function getUSPBLMLBAlumni(): USPBLMLBAlumni[] {
  return USPBL_MLB_ALUMNI;
}

export function getUSPBLMLBRosterAlumni(): USPBLMLBAlumni[] {
  return USPBL_MLB_ALUMNI.filter((a) => a.madeMLBRoster);
}

export function getTeamChampionshipCount(teamSlug: string): number {
  return USPBL_CHAMPIONSHIPS.filter((c) => c.championSlug === teamSlug).length;
}

export function getTeamMLBAlumni(teamSlug: string): USPBLMLBAlumni[] {
  return USPBL_MLB_ALUMNI.filter((a) => a.uspblTeamSlug === teamSlug);
}

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
