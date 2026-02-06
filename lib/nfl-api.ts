// NFL API utilities (ESPN)
// Primary: https://site.api.espn.com/apis/site/v2/sports/football/nfl
// CDN:     https://a.espncdn.com

const BASE = "https://site.api.espn.com/apis/site/v2/sports/football/nfl";
const BASE_V3 = "https://site.api.espn.com/apis/site/v3/sports/football/nfl";
const PLAYER_BASE = "https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes";

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
  if (!res.ok) throw new Error(`NFL API error: ${res.status} ${url}`);
  const data = await res.json();
  setCache(url, data, ttl);
  return data;
}

// ── Interfaces ──────────────────────────────────────────────

export interface NFLTeam {
  id: string;
  name: string;
  abbreviation: string;
  displayName: string;
  location: string;
  color: string;
  alternateColor: string;
  logoUrl: string;
  conference: string;
  division: string;
}

export interface NFLPlayer {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  position: string;
  jersey: string;
  team: string;
  teamId: string;
  headshot: string;
  height: string;
  weight: string;
  experience: number;
  college: string;
  age: number;
  birthDate: string;
}

export interface NFLStandingsEntry {
  team: NFLTeam;
  wins: number;
  losses: number;
  ties: number;
  pct: string;
  pointsFor: number;
  pointsAgainst: number;
  streak: string;
  divisionRecord: string;
  conferenceRecord: string;
  playoffSeed: number;
}

export interface NFLDivisionStandings {
  division: string;
  conference: string;
  entries: NFLStandingsEntry[];
}

export interface NFLLeaderEntry {
  id: string;
  name: string;
  team: string;
  teamAbbrev: string;
  position: string;
  headshot: string;
  value: string;
  displayValue: string;
}

export interface NFLLeaderCategory {
  name: string;
  displayName: string;
  leaders: NFLLeaderEntry[];
}

export interface NFLRosterPlayer {
  id: string;
  fullName: string;
  jersey: string;
  position: string;
  headshot: string;
  height: string;
  weight: string;
  experience: string;
  college: string;
  age: number;
}

export interface NFLRosterGroup {
  name: string;
  players: NFLRosterPlayer[];
}

// ── Helper Parsers ──────────────────────────────────────────

function parseTeam(team: any): NFLTeam {
  return {
    id: team.id,
    name: team.name || team.displayName,
    abbreviation: team.abbreviation,
    displayName: team.displayName,
    location: team.location,
    color: team.color ? `#${team.color}` : "#333",
    alternateColor: team.alternateColor ? `#${team.alternateColor}` : "#666",
    logoUrl: team.logos?.[0]?.href || getTeamLogoUrl(team.abbreviation),
    conference: "",
    division: "",
  };
}

function parseRosterPlayer(athlete: any): NFLRosterPlayer {
  return {
    id: String(athlete.id),
    fullName: athlete.fullName || athlete.displayName || "Unknown",
    jersey: athlete.jersey || "—",
    position: athlete.position?.abbreviation || "—",
    headshot: athlete.headshot?.href || getPlayerHeadshotUrl(athlete.id),
    height: athlete.displayHeight || "—",
    weight: athlete.displayWeight || "—",
    experience: athlete.experience?.years != null ? `${athlete.experience.years} yr` : "R",
    college: athlete.college?.name || "—",
    age: athlete.age || 0,
  };
}

// ── API Functions ───────────────────────────────────────────

export async function getNFLTeams(): Promise<NFLTeam[]> {
  const data = await fetchJSON<any>(`${BASE}/teams`, CACHE_TTL_LONG);
  const teams: NFLTeam[] = [];

  for (const group of data.sports?.[0]?.leagues?.[0]?.teams || []) {
    const t = group.team;
    teams.push(parseTeam(t));
  }

  return teams;
}

export async function getNFLTeam(id: string): Promise<any> {
  const data = await fetchJSON<any>(`${BASE}/teams/${id}`, CACHE_TTL);
  return data.team;
}

export async function getNFLTeamRoster(id: string): Promise<NFLRosterGroup[]> {
  const data = await fetchJSON<any>(`${BASE}/teams/${id}/roster`, CACHE_TTL_LONG);
  const groups: NFLRosterGroup[] = [];

  for (const group of data.athletes || []) {
    groups.push({
      name: group.position || "Other",
      players: (group.items || []).map(parseRosterPlayer),
    });
  }

  return groups;
}

// Team abbreviation → division mapping
const TEAM_DIVISION_MAP: Record<string, string> = {
  // AFC East
  BUF: "AFC East", MIA: "AFC East", NE: "AFC East", NYJ: "AFC East",
  // AFC North
  BAL: "AFC North", CIN: "AFC North", CLE: "AFC North", PIT: "AFC North",
  // AFC South
  HOU: "AFC South", IND: "AFC South", JAX: "AFC South", TEN: "AFC South",
  // AFC West
  DEN: "AFC West", KC: "AFC West", LV: "AFC West", LAC: "AFC West",
  // NFC East
  DAL: "NFC East", NYG: "NFC East", PHI: "NFC East", WSH: "NFC East",
  // NFC North
  CHI: "NFC North", DET: "NFC North", GB: "NFC North", MIN: "NFC North",
  // NFC South
  ATL: "NFC South", CAR: "NFC South", NO: "NFC South", TB: "NFC South",
  // NFC West
  ARI: "NFC West", LAR: "NFC West", SF: "NFC West", SEA: "NFC West",
};

function getDivisionForTeam(abbrev: string): string {
  return TEAM_DIVISION_MAP[abbrev] || "Unknown";
}

function getConferenceForDivision(division: string): string {
  return division.startsWith("AFC") ? "American Football Conference" : "National Football Conference";
}

export async function getNFLStandings(season?: number): Promise<NFLDivisionStandings[]> {
  // NFL season spans August-February. If we're in Jan-July, use previous calendar year
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const currentYear = now.getFullYear();
  const nflSeason = season || (month < 8 ? currentYear - 1 : currentYear);

  const url = `https://site.api.espn.com/apis/v2/sports/football/nfl/standings?season=${nflSeason}`;

  let data: any;
  try {
    data = await fetchJSON<any>(url, CACHE_TTL);
  } catch (error) {
    console.error("[NFL] Error fetching standings:", error);
    return [];
  }

  // Collect all entries from both conferences
  const allEntries: NFLStandingsEntry[] = [];

  for (const child of data.children || []) {
    const conference = child.name || child.abbreviation || "";
    const entries = child.standings?.entries || [];

    for (const entry of entries) {
      const team = entry.team;
      const stats = entry.stats || [];
      const getStat = (name: string) => {
        const s = stats.find((st: any) => st.name === name);
        return s?.displayValue ?? s?.value ?? 0;
      };
      const getStatValue = (name: string) => {
        const s = stats.find((st: any) => st.name === name);
        return s?.value ?? 0;
      };

      const abbrev = team.abbreviation || "";
      const division = getDivisionForTeam(abbrev);

      allEntries.push({
        team: {
          id: String(team.id),
          name: team.name || team.displayName,
          abbreviation: abbrev,
          displayName: team.displayName || team.name,
          location: team.location || "",
          color: team.color ? `#${team.color}` : "#333",
          alternateColor: team.alternateColor ? `#${team.alternateColor}` : "#666",
          logoUrl: team.logos?.[0]?.href || getTeamLogoUrl(abbrev),
          conference,
          division,
        },
        wins: Number(getStatValue("wins")),
        losses: Number(getStatValue("losses")),
        ties: Number(getStatValue("ties")),
        pct: String(getStat("winPercent") || "0"),
        pointsFor: Number(getStatValue("pointsFor")),
        pointsAgainst: Number(getStatValue("pointsAgainst")),
        streak: String(getStat("streak") || "—"),
        divisionRecord: String(getStat("divisionRecord") || "—"),
        conferenceRecord: String(getStat("conferenceRecord") || "—"),
        playoffSeed: Number(getStatValue("playoffSeed") || 0),
      });
    }
  }

  // Group by division
  const divisionOrder = [
    "AFC East", "AFC North", "AFC South", "AFC West",
    "NFC East", "NFC North", "NFC South", "NFC West",
  ];

  const divisions: NFLDivisionStandings[] = divisionOrder.map((divName) => {
    const entries = allEntries
      .filter((e) => e.team.division === divName)
      .sort((a, b) => {
        const pctA = parseFloat(a.pct) || 0;
        const pctB = parseFloat(b.pct) || 0;
        if (pctB !== pctA) return pctB - pctA;
        return b.wins - a.wins;
      });

    return {
      division: divName,
      conference: getConferenceForDivision(divName),
      entries,
    };
  });

  return divisions.filter((d) => d.entries.length > 0);
}

export async function getNFLLeaders(): Promise<NFLLeaderCategory[]> {
  const data = await fetchJSON<any>(`${BASE_V3}/leaders`, CACHE_TTL);
  const categories: NFLLeaderCategory[] = [];

  const cats = data.leaders?.categories || data.leaders || [];
  const catArray = Array.isArray(cats) ? cats : [];

  for (const cat of catArray) {
    const leaders: NFLLeaderEntry[] = [];

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

export async function getNFLPlayer(id: string): Promise<any> {
  const url = `${PLAYER_BASE}/${id}/overview`;
  return fetchJSON<any>(url, CACHE_TTL);
}

export async function getNFLScoreboard(): Promise<any> {
  const url = `${BASE}/scoreboard`;
  return fetchJSON<any>(url, CACHE_TTL);
}

export async function searchNFL(query: string): Promise<{ players: any[]; teams: any[] }> {
  const [teamsData] = await Promise.all([getNFLTeams()]);

  const lowerQ = query.toLowerCase();
  const matchingTeams = teamsData.filter(
    (t) =>
      t.displayName.toLowerCase().includes(lowerQ) ||
      t.abbreviation.toLowerCase().includes(lowerQ) ||
      t.name.toLowerCase().includes(lowerQ) ||
      t.location.toLowerCase().includes(lowerQ)
  );

  // ESPN doesn't have a direct player search, so we'll search via the site API
  let players: any[] = [];
  try {
    const url = `https://site.api.espn.com/apis/common/v3/search?query=${encodeURIComponent(query)}&limit=20&type=player&sport=football&league=nfl`;
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

  return { players, teams: matchingTeams };
}

// ── Helpers ─────────────────────────────────────────────────

export function getPlayerHeadshotUrl(id: string | number): string {
  return `https://a.espncdn.com/i/headshots/nfl/players/full/${id}.png`;
}

export function getTeamLogoUrl(abbrev: string): string {
  return `https://a.espncdn.com/i/teamlogos/nfl/500/${abbrev.toLowerCase()}.png`;
}

// NFL conferences and divisions
export const NFL_CONFERENCES = ["AFC", "NFC"] as const;

export const NFL_DIVISIONS = {
  "AFC East": { conference: "AFC" },
  "AFC North": { conference: "AFC" },
  "AFC South": { conference: "AFC" },
  "AFC West": { conference: "AFC" },
  "NFC East": { conference: "NFC" },
  "NFC North": { conference: "NFC" },
  "NFC South": { conference: "NFC" },
  "NFC West": { conference: "NFC" },
} as const;
