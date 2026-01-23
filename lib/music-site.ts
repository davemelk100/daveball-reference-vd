export type MusicSiteId = "gbv" | "amrep";

export interface MusicSiteConfig {
  id: MusicSiteId;
  name: string;
  shortName: string;
  basePath: string;
  chatLabel: string;
  headerTitle: string;
  headerTextClass: string;
  logoSrc: string;
  chatIconSrc: string;
  placeholderIconSrc: string;
  navLabels: {
    discography: string;
    members: string;
    sideProjects: string;
  };
  sources: Array<{ label: string; url: string }>;
  imageSources: Array<{ label: string; url: string }>;
  searchPlaceholder: string;
}

export const GBV_SITE: MusicSiteConfig = {
  id: "gbv",
  name: "Guided By Data",
  shortName: "GBV",
  basePath: "/gbv",
  chatLabel: "Chat GBV",
  headerTitle: "Guided By Data",
  headerTextClass: "text-white",
  logoSrc: "/gbv-mlb.svg",
  chatIconSrc: "/gbv-rune.svg",
  placeholderIconSrc: "/chat-gbv-box.svg",
  navLabels: {
    discography: "Discography",
    members: "Members",
    sideProjects: "Side Projects",
  },
  sources: [
    { label: "Discogs", url: "https://www.discogs.com/" },
    { label: "GBVDB", url: "https://www.gbvdb.com/" },
    { label: "MusicBrainz", url: "https://musicbrainz.org/" },
    { label: "Cover Art Archive", url: "https://coverartarchive.org/" },
    { label: "Wikidata", url: "https://www.wikidata.org/" },
    { label: "Wikimedia Commons", url: "https://commons.wikimedia.org/" },
  ],
  imageSources: [
    { label: "Discogs", url: "https://www.discogs.com/" },
    { label: "Cover Art Archive", url: "https://coverartarchive.org/" },
    { label: "MusicBrainz", url: "https://musicbrainz.org/" },
    { label: "Wikimedia Commons", url: "https://commons.wikimedia.org/" },
    { label: "Archive.org", url: "https://archive.org/" },
  ],
  searchPlaceholder: "Search GBV...",
};

export const AMREP_SITE: MusicSiteConfig = {
  id: "amrep",
  name: "Noise By The Numbers",
  shortName: "AmRep",
  basePath: "/amrep",
  chatLabel: "ChatREP",
  headerTitle: "Noise By The Numbers",
  headerTextClass: "text-black",
  logoSrc: "/amrep-logo-black.svg",
  chatIconSrc: "/noise-bird.png",
  placeholderIconSrc: "/noise-bird.png",
  navLabels: {
    discography: "Releases",
    members: "Artists",
    sideProjects: "Imprints",
  },
  sources: [
    { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Amphetamine_Reptile_Records" },
    { label: "Shoxop", url: "https://www.shoxop.com/" },
    { label: "Facebook", url: "https://www.facebook.com/amphetaminereptile/" },
  ],
  imageSources: [
    { label: "Discogs", url: "https://www.discogs.com/" },
    { label: "Wikimedia Commons", url: "https://commons.wikimedia.org/" },
    { label: "Wikipedia", url: "https://en.wikipedia.org/" },
    { label: "Wikia", url: "https://www.fandom.com/" },
    { label: "HPR", url: "https://hpr1.com/" },
    { label: "Fungus Boy", url: "https://www.fungusboy.net/" },
    { label: "Magnet Magazine", url: "https://magnetmagazine.com/" },
    { label: "Sub Pop", url: "https://www.subpop.com/" },
    { label: "Blogger", url: "https://blogger.googleusercontent.com/" },
    { label: "Squarespace", url: "https://www.squarespace.com/" },
    { label: "Chaos Control", url: "https://chaoscontrol.com/" },
    { label: "Sun 13", url: "https://sun-13.com/" },
    { label: "Spotify", url: "https://open.spotify.com/" },
    { label: "Amazon", url: "https://www.amazon.com/" },
    { label: "Beautiful Noise", url: "https://beautifulnoise.wordpress.com/" },
    { label: "The Urinals", url: "https://www.theurinals.com/" },
    { label: "I Heart N", url: "https://ihrtn.net/" },
    { label: "Townsquare Media", url: "https://townsquare.media/" },
    { label: "Lollipop Magazine", url: "https://lollipopmagazine.com/" },
    { label: "Rokkos Adventures", url: "https://www.rokkosadventures.at/" },
  ],
  searchPlaceholder: "Search AmRep...",
};

export function getMusicSiteFromPathname(
  pathname?: string | null
): MusicSiteConfig {
  if (pathname?.startsWith("/amrep")) return AMREP_SITE;
  return GBV_SITE;
}
