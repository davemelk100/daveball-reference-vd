import type { LucideIcon } from "lucide-react";
import {
  Home,
  Users,
  Trophy,
  BarChart3,
  Star,
  Award,
} from "lucide-react";

export type SportsSiteId = "mlb" | "nhl";

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
  basePath: "",
  title: "Major League Numbers",
  logoSrc: "/chat-mlb-2.svg",
  logoAlt: "",
  titleColorClass: "text-[#f4232b]",
  chatLabel: "ChatMLB",
  chatPath: "/ask",
  chatIconSrc: "/chat-mlb-2.svg",
  searchLabel: "Search MLB",
  navItems: [
    { name: "ChatMLB", href: "/ask", image: "/chat-mlb-2.svg" },
    { name: "Home", href: "/", icon: Home },
    { name: "Players", href: "/players", icon: Users },
    { name: "Teams", href: "/teams", icon: Trophy },
    { name: "Standings", href: "/standings", icon: BarChart3 },
    { name: "All Stars", href: "/all-star", icon: Star },
    { name: "HOF", href: "/hof", icon: Award },
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
  searchLabel: "Search NHL",
  navItems: [
    { name: "ChatNHL", href: "/nhl/ask", icon: Home },
    { name: "Home", href: "/nhl", icon: Home },
    { name: "Players", href: "/nhl/players", icon: Users },
    { name: "Teams", href: "/nhl/teams", icon: Trophy },
    { name: "Standings", href: "/nhl/standings", icon: BarChart3 },
  ],
  mobileHiddenNames: ["Home"],
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

const sportsSites: Record<SportsSiteId, SportsSiteConfig> = {
  mlb: mlbSite,
  nhl: nhlSite,
};

export function getSportsSiteById(id: SportsSiteId): SportsSiteConfig {
  return sportsSites[id];
}

export function getSportsSiteFromPathname(pathname: string): SportsSiteConfig {
  if (pathname.startsWith("/nhl")) return nhlSite;
  return mlbSite;
}

export function isSportsSiteRoute(pathname: string): boolean {
  return pathname.startsWith("/nhl") || !pathname.startsWith("/gbv") && !pathname.startsWith("/amrep") && !pathname.startsWith("/rev");
}
