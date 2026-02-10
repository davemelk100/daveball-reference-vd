// NBA API utilities (ESPN)
// Primary: https://site.api.espn.com/apis/site/v2/sports/basketball/nba
// CDN:     https://a.espncdn.com

const BASE = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba";
const BASE_V3 = "https://site.api.espn.com/apis/site/v3/sports/basketball/nba";
const PLAYER_BASE = "https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes";

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
  if (!res.ok) throw new Error(`NBA API error: ${res.status} ${url}`);
  const data = await res.json();
  setCache(url, data, ttl);
  return data;
}

// ── Interfaces ──────────────────────────────────────────────

export interface NBATeam {
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

export interface NBAPlayer {
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

export interface NBAStandingsEntry {
  team: NBATeam;
  wins: number;
  losses: number;
  pct: string;
  gamesBehind: string;
  streak: string;
  lastTen: string;
  pointsFor: number;
  pointsAgainst: number;
  conferenceRecord: string;
  divisionRecord: string;
  homeRecord: string;
  awayRecord: string;
  playoffSeed: number;
}

export interface NBAConferenceStandings {
  conference: string;
  entries: NBAStandingsEntry[];
}

export interface NBALeaderEntry {
  id: string;
  name: string;
  team: string;
  teamAbbrev: string;
  position: string;
  headshot: string;
  value: string;
  displayValue: string;
}

export interface NBALeaderCategory {
  name: string;
  displayName: string;
  leaders: NBALeaderEntry[];
}

export interface NBARosterPlayer {
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

export interface NBARosterGroup {
  name: string;
  players: NBARosterPlayer[];
}

// ── Helper Parsers ──────────────────────────────────────────

function parseTeam(team: any): NBATeam {
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

function parseRosterPlayer(athlete: any): NBARosterPlayer {
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

export async function getNBATeams(): Promise<NBATeam[]> {
  const data = await fetchJSON<any>(`${BASE}/teams`, CACHE_TTL_LONG);
  const teams: NBATeam[] = [];

  for (const group of data.sports?.[0]?.leagues?.[0]?.teams || []) {
    const t = group.team;
    teams.push(parseTeam(t));
  }

  return teams;
}

export async function getNBATeam(id: string): Promise<any> {
  const data = await fetchJSON<any>(`${BASE}/teams/${id}`, CACHE_TTL);
  return data.team;
}

export async function getNBATeamRoster(id: string): Promise<NBARosterGroup[]> {
  const data = await fetchJSON<any>(`${BASE}/teams/${id}/roster`, CACHE_TTL_LONG);
  const groups: NBARosterGroup[] = [];

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
  // Atlantic Division
  BOS: "Atlantic", BKN: "Atlantic", NY: "Atlantic", PHI: "Atlantic", TOR: "Atlantic",
  // Central Division
  CHI: "Central", CLE: "Central", DET: "Central", IND: "Central", MIL: "Central",
  // Southeast Division
  ATL: "Southeast", CHA: "Southeast", MIA: "Southeast", ORL: "Southeast", WSH: "Southeast",
  // Northwest Division
  DEN: "Northwest", MIN: "Northwest", OKC: "Northwest", POR: "Northwest", UTA: "Northwest",
  // Pacific Division
  GS: "Pacific", LAC: "Pacific", LAL: "Pacific", PHX: "Pacific", SAC: "Pacific",
  // Southwest Division
  DAL: "Southwest", HOU: "Southwest", MEM: "Southwest", NO: "Southwest", SA: "Southwest",
};

const DIVISION_CONFERENCE_MAP: Record<string, string> = {
  "Atlantic": "Eastern Conference",
  "Central": "Eastern Conference",
  "Southeast": "Eastern Conference",
  "Northwest": "Western Conference",
  "Pacific": "Western Conference",
  "Southwest": "Western Conference",
};

function getDivisionForTeam(abbrev: string): string {
  return TEAM_DIVISION_MAP[abbrev] || "Unknown";
}

function getConferenceForTeam(abbrev: string): string {
  const division = getDivisionForTeam(abbrev);
  return DIVISION_CONFERENCE_MAP[division] || "Unknown";
}

export async function getNBAStandings(season?: number): Promise<NBAConferenceStandings[]> {
  // NBA season spans October-June. If we're in July-September, use previous calendar year
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const currentYear = now.getFullYear();
  const nbaSeason = season || (month < 10 ? currentYear : currentYear + 1);

  const url = `https://site.api.espn.com/apis/v2/sports/basketball/nba/standings?season=${nbaSeason}`;

  let data: any;
  try {
    data = await fetchJSON<any>(url, CACHE_TTL);
  } catch (error) {
    console.error("[NBA] Error fetching standings:", error);
    return [];
  }

  // Collect entries by conference
  const conferences: NBAConferenceStandings[] = [];

  for (const child of data.children || []) {
    const conferenceName = child.name || child.abbreviation || "";
    const entries: NBAStandingsEntry[] = [];

    for (const entry of child.standings?.entries || []) {
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

      entries.push({
        team: {
          id: String(team.id),
          name: team.name || team.displayName,
          abbreviation: abbrev,
          displayName: team.displayName || team.name,
          location: team.location || "",
          color: team.color ? `#${team.color}` : "#333",
          alternateColor: team.alternateColor ? `#${team.alternateColor}` : "#666",
          logoUrl: team.logos?.[0]?.href || getTeamLogoUrl(abbrev),
          conference: conferenceName,
          division,
        },
        wins: Number(getStatValue("wins")),
        losses: Number(getStatValue("losses")),
        pct: String(getStat("winPercent") || "0"),
        gamesBehind: String(getStat("gamesBehind") || "—"),
        streak: String(getStat("streak") || "—"),
        lastTen: String(getStat("last10Record") || "—"),
        pointsFor: Number(getStatValue("pointsFor")),
        pointsAgainst: Number(getStatValue("pointsAgainst")),
        conferenceRecord: String(getStat("vsConference") || "—"),
        divisionRecord: String(getStat("vsDivision") || "—"),
        homeRecord: String(getStat("home") || "—"),
        awayRecord: String(getStat("away") || "—"),
        playoffSeed: Number(getStatValue("playoffSeed") || 0),
      });
    }

    // Sort by wins descending
    entries.sort((a, b) => {
      const pctA = parseFloat(a.pct) || 0;
      const pctB = parseFloat(b.pct) || 0;
      if (pctB !== pctA) return pctB - pctA;
      return b.wins - a.wins;
    });

    conferences.push({
      conference: conferenceName,
      entries,
    });
  }

  return conferences;
}

export async function getNBALeaders(): Promise<NBALeaderCategory[]> {
  const data = await fetchJSON<any>(`${BASE_V3}/leaders`, CACHE_TTL);
  const categories: NBALeaderCategory[] = [];

  const cats = data.leaders?.categories || data.leaders || [];
  const catArray = Array.isArray(cats) ? cats : [];

  for (const cat of catArray) {
    const leaders: NBALeaderEntry[] = [];

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

export async function getNBAPlayer(id: string): Promise<any> {
  // Fetch athlete info, stats overview, and full career stats
  const athleteUrl = `https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/athletes/${id}`;
  const statsUrl = `${PLAYER_BASE}/${id}/overview`;
  const careerUrl = `${PLAYER_BASE}/${id}/stats`;

  const [athleteData, statsData, careerData] = await Promise.all([
    fetchJSON<any>(athleteUrl, CACHE_TTL).catch(() => null),
    fetchJSON<any>(statsUrl, CACHE_TTL).catch(() => ({})),
    fetchJSON<any>(careerUrl, CACHE_TTL).catch(() => ({})),
  ]);

  return {
    athlete: athleteData,
    stats: statsData?.statistics ? [statsData.statistics] : [],
    gameLog: statsData?.gameLog,
    news: statsData?.news,
    careerStats: careerData?.categories || [],
    careerTeams: careerData?.teams || {},
  };
}

export async function getNBAScoreboard(): Promise<any> {
  const url = `${BASE}/scoreboard`;
  return fetchJSON<any>(url, CACHE_TTL);
}

export async function searchNBA(query: string): Promise<{ players: any[]; teams: any[] }> {
  const [teamsData] = await Promise.all([getNBATeams()]);

  const lowerQ = query.toLowerCase();
  const matchingTeams = teamsData.filter(
    (t) =>
      t.displayName.toLowerCase().includes(lowerQ) ||
      t.abbreviation.toLowerCase().includes(lowerQ) ||
      t.name.toLowerCase().includes(lowerQ) ||
      t.location.toLowerCase().includes(lowerQ)
  );

  // ESPN player search
  let players: any[] = [];
  try {
    const url = `https://site.api.espn.com/apis/common/v3/search?query=${encodeURIComponent(query)}&limit=20&type=player&sport=basketball&league=nba`;
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
  return `https://a.espncdn.com/i/headshots/nba/players/full/${id}.png`;
}

export function getTeamLogoUrl(abbrev: string): string {
  return `https://a.espncdn.com/i/teamlogos/nba/500/${abbrev.toLowerCase()}.png`;
}

// NBA conferences and divisions
export const NBA_CONFERENCES = ["Eastern Conference", "Western Conference"] as const;

export const NBA_DIVISIONS = {
  "Atlantic": { conference: "Eastern Conference" },
  "Central": { conference: "Eastern Conference" },
  "Southeast": { conference: "Eastern Conference" },
  "Northwest": { conference: "Western Conference" },
  "Pacific": { conference: "Western Conference" },
  "Southwest": { conference: "Western Conference" },
} as const;
