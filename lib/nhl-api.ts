// NHL API utilities
// Primary: https://api-web.nhle.com/v1 (web API)
// Stats:   https://api.nhle.com/stats/rest/en (stats API)
// Ref:     https://www.hockey-reference.com/

const WEB_BASE = "https://api-web.nhle.com/v1";
const STATS_BASE = "https://api.nhle.com/stats/rest/en";

const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const CACHE_TTL_LONG = 24 * 60 * 60 * 1000; // 24 hours
const CACHE_TTL_HISTORY = 7 * 24 * 60 * 60 * 1000; // 7 days

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
  if (!res.ok) throw new Error(`NHL API error: ${res.status} ${url}`);
  const data = await res.json();
  setCache(url, data, ttl);
  return data;
}

// ── Interfaces ──────────────────────────────────────────────

export interface NHLTeam {
  teamAbbrev: { default: string };
  teamName: { default: string; fr?: string };
  teamCommonName: { default: string };
  teamLogo: string;
  divisionName: string;
  divisionAbbrev: string;
  conferenceName: string;
  conferenceAbbrev: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  otLosses: number;
  points: number;
  goalFor: number;
  goalAgainst: number;
  goalDifferential: number;
  streakCode: string;
  streakCount: number;
  l10Wins: number;
  l10Losses: number;
  l10OtLosses: number;
  placeName?: { default: string };
}

export interface NHLStandingsResponse {
  standings: NHLTeam[];
}

export interface NHLPlayerLanding {
  playerId: number;
  firstName: { default: string };
  lastName: { default: string };
  fullTeamName?: { default: string };
  teamAbbrev?: string;
  position: string;
  headshot: string;
  sweaterNumber?: number;
  heightInInches?: number;
  weightInPounds?: number;
  birthDate?: string;
  birthCity?: { default: string };
  birthCountry?: string;
  shootsCatches?: string;
  draftDetails?: {
    year: number;
    round: number;
    pickInRound: number;
    overallPick: number;
    teamAbbrev: string;
  };
  featuredStats?: {
    season: number;
    regularSeason?: {
      subSeason: NHLSkaterStats | NHLGoalieStats;
      career: NHLSkaterStats | NHLGoalieStats;
    };
  };
  last5Games?: any[];
  seasonTotals?: any[];
  currentTeamRoster?: any[];
}

export interface NHLSkaterStats {
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  pim: number;
  gameWinningGoals: number;
  powerPlayGoals: number;
  shorthandedGoals: number;
  shots: number;
  shootingPctg: number;
}

export interface NHLGoalieStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  otLosses: number;
  goalsAgainstAvg: number;
  savePctg: number;
  shutouts: number;
}

export interface NHLRosterPlayer {
  id: number;
  firstName: { default: string };
  lastName: { default: string };
  sweaterNumber: number;
  positionCode: string;
  headshot: string;
}

export interface NHLRoster {
  forwards: NHLRosterPlayer[];
  defensemen: NHLRosterPlayer[];
  goalies: NHLRosterPlayer[];
}

export interface NHLSkaterLeader {
  id: number;
  firstName: { default: string };
  lastName: { default: string };
  sweaterNumber: number;
  teamAbbrev: string;
  headshot: string;
  position: string;
  value: number;
}

// ── API Functions ───────────────────────────────────────────

export async function getStandings(season?: string): Promise<NHLTeam[]> {
  const url = season
    ? `${WEB_BASE}/standings/${season}`
    : `${WEB_BASE}/standings/now`;
  const data = await fetchJSON<NHLStandingsResponse>(url, CACHE_TTL);
  return data.standings || [];
}

export async function getPlayer(id: string | number): Promise<NHLPlayerLanding> {
  const url = `${WEB_BASE}/player/${id}/landing`;
  return fetchJSON<NHLPlayerLanding>(url, CACHE_TTL);
}

export async function getTeamRoster(teamAbbrev: string, season?: string): Promise<NHLRoster> {
  const url = season
    ? `${WEB_BASE}/roster/${teamAbbrev}/${season}`
    : `${WEB_BASE}/roster/${teamAbbrev}/current`;
  return fetchJSON<NHLRoster>(url, CACHE_TTL_LONG);
}

export async function getSkaterLeaders(
  category: string = "points",
  limit: number = 10,
): Promise<any> {
  const url = `${WEB_BASE}/skater-stats-leaders/current?categories=${category}&limit=${limit}`;
  return fetchJSON(url, CACHE_TTL);
}

export async function getGoalieLeaders(
  category: string = "wins",
  limit: number = 10,
): Promise<any> {
  const url = `${WEB_BASE}/goalie-stats-leaders/current?categories=${category}&limit=${limit}`;
  return fetchJSON(url, CACHE_TTL);
}

export async function getSchedule(date?: string): Promise<any> {
  const url = date
    ? `${WEB_BASE}/schedule/${date}`
    : `${WEB_BASE}/schedule/now`;
  return fetchJSON(url, CACHE_TTL);
}

export async function getScores(date?: string): Promise<any> {
  const url = date
    ? `${WEB_BASE}/score/${date}`
    : `${WEB_BASE}/score/now`;
  return fetchJSON(url, CACHE_TTL);
}

export async function searchPlayers(query: string): Promise<any[]> {
  const url = `https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=20&q=${encodeURIComponent(query)}&active=true`;
  const data = await fetchJSON<any[]>(url, CACHE_TTL);
  return data;
}

// ── Helpers ─────────────────────────────────────────────────

export function getTeamLogoUrl(teamAbbrev: string): string {
  return `https://assets.nhle.com/logos/nhl/svg/${teamAbbrev}_dark.svg`;
}

export function getPlayerHeadshotUrl(playerId: number, teamAbbrev: string, season: string = "20242025"): string {
  return `https://assets.nhle.com/mugs/nhl/${season}/${teamAbbrev}/${playerId}.png`;
}

export function isNHLRoute(pathname?: string | null): boolean {
  if (!pathname) return false;
  return pathname.startsWith("/nhl");
}

// NHL divisions and conferences
export const NHL_DIVISIONS = {
  ATL: { name: "Atlantic", conference: "Eastern" },
  MET: { name: "Metropolitan", conference: "Eastern" },
  CEN: { name: "Central", conference: "Western" },
  PAC: { name: "Pacific", conference: "Western" },
} as const;

export const NHL_CONFERENCES = ["Eastern", "Western"] as const;
