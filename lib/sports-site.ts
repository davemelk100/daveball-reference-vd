import type { LucideIcon } from "lucide-react";
import {
  Home,
  Users,
  Trophy,
  BarChart3,
  Star,
  Award,
} from "lucide-react";

export type SportsSiteId = "mlb" | "nhl" | "nfl" | "nba" | "uspbl";

export interface SportsNavItem {
  name: string;
  href: string;
  icon?: LucideIcon;
  image?: string;
  mobileHidden?: boolean;
}

export interface SourceGroup {
  category: string;
  items: { label: string; url: string }[];
}

export interface SportsSiteConfig {
  id: SportsSiteId;
  basePath: string;
  title: string;
  logoSrc: string;
  logoAlt: string;
  titleColorClass: string;
  chatLabel: string;
  chatPath: string;
  chatIconSrc?: string;
  searchLabel: string;
  navItems: SportsNavItem[];
  mobileHiddenNames: string[];
  dataSources: SourceGroup[];
}

const mlbSite: SportsSiteConfig = {
  id: "mlb",
  basePath: "/mlb",
  title: "Major League Numbers",
  logoSrc: "https://www.mlbstatic.com/team-logos/league-on-dark/1.svg",
  logoAlt: "MLB",
  titleColorClass: "text-[#f4232b]",
  chatLabel: "ChatMLB",
  chatPath: "/mlb/ask",
  chatIconSrc: "/chat-mlb-2.svg",
  searchLabel: "Search MLB",
  navItems: [
    { name: "ChatMLB", href: "/mlb/ask", image: "/chat-mlb-2.svg" },
    { name: "Home", href: "/mlb", icon: Home },
    { name: "Players", href: "/mlb/players", icon: Users },
    { name: "Teams", href: "/mlb/teams", icon: Trophy },
    { name: "Standings", href: "/mlb/standings", icon: BarChart3 },
    { name: "All Stars", href: "/mlb/all-star", icon: Star },
    { name: "HOF", href: "/mlb/hof", icon: Award },
  ],
  mobileHiddenNames: ["All Stars", "HOF", "Home"],
  dataSources: [
    {
      category: "Data",
      items: [
        { label: "MLB Stats API", url: "https://statsapi.mlb.com/" },
        { label: "Baseball Savant", url: "https://baseballsavant.mlb.com/" },
        { label: "Baseball-Reference", url: "https://www.baseball-reference.com/" },
        { label: "FanGraphs", url: "https://www.fangraphs.com/" },
        { label: "Retrosheet", url: "https://www.retrosheet.org/" },
        { label: "Wikipedia", url: "https://en.wikipedia.org/" },
      ],
    },
    {
      category: "Images",
      items: [
        { label: "MLB", url: "https://www.mlb.com/" },
        { label: "MLB Static", url: "https://www.mlbstatic.com/" },
        { label: "Baseball-Reference", url: "https://www.baseball-reference.com/" },
        { label: "FanGraphs", url: "https://www.fangraphs.com/" },
      ],
    },
  ],
};

const nhlSite: SportsSiteConfig = {
  id: "nhl",
  basePath: "/nhl",
  title: "NHL Numbers",
  logoSrc: "/nhl-logo.svg",
  logoAlt: "NHL",
  titleColorClass: "",
  chatLabel: "ChatNHL",
  chatPath: "/nhl/ask",
  chatIconSrc: "/nhl-logo.svg",
  searchLabel: "Search NHL",
  navItems: [
    { name: "ChatNHL", href: "/nhl/ask", image: "/nhl-logo.svg" },
    { name: "Home", href: "/nhl", icon: Home },
    { name: "Players", href: "/nhl/players", icon: Users },
    { name: "Teams", href: "/nhl/teams", icon: Trophy },
    { name: "Standings", href: "/nhl/standings", icon: BarChart3 },
    { name: "All Stars", href: "/nhl/all-star", icon: Star },
    { name: "HOF", href: "/nhl/hof", icon: Award },
  ],
  mobileHiddenNames: ["All Stars", "HOF", "Home"],
  dataSources: [
    {
      category: "Data",
      items: [
        { label: "NHL Web API", url: "https://api-web.nhle.com/" },
        { label: "NHL Stats API", url: "https://api.nhle.com/stats/" },
        { label: "Hockey-Reference", url: "https://www.hockey-reference.com/" },
        { label: "NHL.com", url: "https://www.nhl.com/" },
        { label: "Wikipedia", url: "https://en.wikipedia.org/" },
      ],
    },
    {
      category: "Images",
      items: [
        { label: "NHL", url: "https://www.nhl.com/" },
        { label: "NHLE Assets", url: "https://assets.nhle.com/" },
        { label: "Hockey-Reference", url: "https://www.hockey-reference.com/" },
      ],
    },
  ],
};

const nflSite: SportsSiteConfig = {
  id: "nfl",
  basePath: "/nfl",
  title: "NFL Numbers",
  logoSrc: "/nfl-logo.svg",
  logoAlt: "NFL",
  titleColorClass: "",
  chatLabel: "ChatNFL",
  chatPath: "/nfl/ask",
  chatIconSrc: "/nfl-logo.svg",
  searchLabel: "Search NFL",
  navItems: [
    { name: "ChatNFL", href: "/nfl/ask", image: "/nfl-logo.svg" },
    { name: "Home", href: "/nfl", icon: Home },
    { name: "Players", href: "/nfl/players", icon: Users },
    { name: "Teams", href: "/nfl/teams", icon: Trophy },
    { name: "Standings", href: "/nfl/standings", icon: BarChart3 },
    { name: "All Stars", href: "/nfl/all-star", icon: Star },
    { name: "HOF", href: "/nfl/hof", icon: Award },
  ],
  mobileHiddenNames: ["All Stars", "HOF", "Home"],
  dataSources: [
    {
      category: "Data",
      items: [
        { label: "ESPN API", url: "https://site.api.espn.com/" },
        { label: "Pro-Football-Reference", url: "https://www.pro-football-reference.com/" },
        { label: "NFL.com", url: "https://www.nfl.com/" },
        { label: "Wikipedia", url: "https://en.wikipedia.org/" },
      ],
    },
    {
      category: "Images",
      items: [
        { label: "ESPN CDN", url: "https://a.espncdn.com/" },
        { label: "NFL.com", url: "https://www.nfl.com/" },
      ],
    },
  ],
};

const nbaSite: SportsSiteConfig = {
  id: "nba",
  basePath: "/nba",
  title: "NBA Numbers",
  logoSrc: "/nba-logo.svg",
  logoAlt: "NBA",
  titleColorClass: "",
  chatLabel: "ChatNBA",
  chatPath: "/nba/ask",
  chatIconSrc: "/nba-logo.svg",
  searchLabel: "Search NBA",
  navItems: [
    { name: "ChatNBA", href: "/nba/ask", image: "/nba-logo.svg" },
    { name: "Home", href: "/nba", icon: Home },
    { name: "Players", href: "/nba/players", icon: Users },
    { name: "Teams", href: "/nba/teams", icon: Trophy },
    { name: "Standings", href: "/nba/standings", icon: BarChart3 },
    { name: "All Stars", href: "/nba/all-star", icon: Star },
    { name: "HOF", href: "/nba/hof", icon: Award },
  ],
  mobileHiddenNames: ["All Stars", "HOF", "Home"],
  dataSources: [
    {
      category: "Data",
      items: [
        { label: "ESPN API", url: "https://site.api.espn.com/" },
        { label: "Basketball-Reference", url: "https://www.basketball-reference.com/" },
        { label: "NBA.com", url: "https://www.nba.com/" },
        { label: "Wikipedia", url: "https://en.wikipedia.org/" },
      ],
    },
    {
      category: "Images",
      items: [
        { label: "ESPN CDN", url: "https://a.espncdn.com/" },
        { label: "NBA.com", url: "https://www.nba.com/" },
      ],
    },
  ],
};

const uspblSite: SportsSiteConfig = {
  id: "uspbl",
  basePath: "/uspbl",
  title: "USPBL Numbers",
  logoSrc: "/uspbl-logo.png",
  logoAlt: "USPBL",
  titleColorClass: "text-[#1a3a5c]",
  chatLabel: "ChatUSPBL",
  chatPath: "/uspbl/ask",
  chatIconSrc: "/uspbl-logo.png",
  searchLabel: "Search USPBL",
  navItems: [
    { name: "ChatUSPBL", href: "/uspbl/ask", image: "/uspbl-logo.png" },
    { name: "Home", href: "/uspbl", icon: Home },
    { name: "Players", href: "/uspbl/players", icon: Users },
    { name: "Teams", href: "/uspbl/teams", icon: Trophy },
    { name: "Standings", href: "/uspbl/standings", icon: BarChart3 },
  ],
  mobileHiddenNames: ["Home"],
  dataSources: [
    {
      category: "Data",
      items: [
        { label: "USPBL", url: "https://www.uspbl.com/" },
        { label: "Wikipedia", url: "https://en.wikipedia.org/" },
      ],
    },
  ],
};

const sportsSites: Record<SportsSiteId, SportsSiteConfig> = {
  mlb: mlbSite,
  nhl: nhlSite,
  nfl: nflSite,
  nba: nbaSite,
  uspbl: uspblSite,
};

export function getSportsSiteById(id: SportsSiteId): SportsSiteConfig {
  return sportsSites[id];
}

export function getSportsSiteFromPathname(pathname: string): SportsSiteConfig {
  if (pathname.startsWith("/nhl")) return nhlSite;
  if (pathname.startsWith("/nfl")) return nflSite;
  if (pathname.startsWith("/nba")) return nbaSite;
  if (pathname.startsWith("/uspbl")) return uspblSite;
  if (pathname.startsWith("/mlb")) return mlbSite;
  return mlbSite;
}

export function isSportsSiteRoute(pathname: string): boolean {
  return pathname.startsWith("/mlb") || pathname.startsWith("/nhl") || pathname.startsWith("/nfl") || pathname.startsWith("/nba") || pathname.startsWith("/uspbl");
}
