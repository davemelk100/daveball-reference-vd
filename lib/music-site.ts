import type { Metadata } from "next";

export interface MusicSiteConfig {
  id: string;
  name: string;
  shortName: string;
  basePath: string;
  chatLabel: string;
  headerTitle: string;
  headerTextClass: string;
  logoSrc: string;
  chatIconSrc: string;
  placeholderIconSrc: string;
  shellClass: string;
  logoClassName?: string;
  navLabels: {
    discography: string;
    members: string;
    sideProjects: string;
  };
  footerDisclaimer?: string;
  sources: Array<{ label: string; url: string }>;
  imageSources: Array<{ label: string; url: string }>;
  searchPlaceholder: string;
  seo: {
    title: string;
    titleTemplate?: string;
    description: string;
    keywords: string[];
    siteName?: string;
    ogImage: string;
    ogImageAlt: string;
    twitterImage?: string;
  };
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
  shellClass: "gbv-shell",
  navLabels: {
    discography: "Discography",
    members: "Members",
    sideProjects: "Side Projects",
  },
  footerDisclaimer:
    "All Content, Rights, Copyrights, etc. are the property of Robert Pollard unless otherwise noted. This is simply a fan site.",
  sources: [
    { label: "Discogs", url: "https://www.discogs.com/" },
    { label: "GBVDB", url: "https://www.gbvdb.com/" },
    { label: "MusicBrainz", url: "https://musicbrainz.org/" },
    { label: "Cover Art Archive", url: "https://coverartarchive.org/" },
    { label: "Wikidata", url: "https://www.wikidata.org/" },
    { label: "Wikimedia Commons", url: "https://commons.wikimedia.org/" },
    { label: "Pitchfork", url: "https://pitchfork.com/" },
    { label: "Rolling Stone", url: "https://www.rollingstone.com/" },
    { label: "NME", url: "https://www.nme.com/" },
    { label: "Spin", url: "https://www.spin.com/" },
    { label: "AllMusic", url: "https://www.allmusic.com/" },
    { label: "YouTube", url: "https://www.youtube.com/" },
    { label: "Wikipedia", url: "https://en.wikipedia.org/" },
  ],
  imageSources: [
    { label: "Discogs", url: "https://www.discogs.com/" },
    { label: "Cover Art Archive", url: "https://coverartarchive.org/" },
    { label: "MusicBrainz", url: "https://musicbrainz.org/" },
    { label: "Wikimedia Commons", url: "https://commons.wikimedia.org/" },
    { label: "Archive.org", url: "https://archive.org/" },
  ],
  searchPlaceholder: "Search GBV...",
  seo: {
    title: "Guided By Data",
    titleTemplate: "%s | Guided By Data",
    description:
      "Explore Guided By Voices discography, albums, songs, and band history.",
    keywords: [
      "Guided By Voices",
      "GBV",
      "Robert Pollard",
      "indie rock",
      "lo-fi",
      "discography",
      "albums",
      "songs",
    ],
    siteName: "Guided By Data",
    ogImage: "https://majorleaguenumbers.com/gbv-rune.png",
    ogImageAlt: "Guided By Data",
    twitterImage: "https://majorleaguenumbers.com/gbv-rune.png",
  },
};

export const AMREP_SITE: MusicSiteConfig = {
  id: "amrep",
  name: "Noise By The Numbers",
  shortName: "AmRep",
  basePath: "/amrep",
  chatLabel: "ChatREP",
  headerTitle: "Noise By The Numbers",
  headerTextClass: "text-black",
  logoSrc: "/amrep-logo-foreground.svg",
  chatIconSrc: "/noise-bird.svg",
  placeholderIconSrc: "/noise-placeholder.svg",
  shellClass: "amrep-shell",
  navLabels: {
    discography: "Releases",
    members: "Artists",
    sideProjects: "Imprints",
  },
  footerDisclaimer:
    "All Content, Rights, Copyrights, etc. are the property of Tom Hazelmyer and AmRep records. This is simply a fan site.",
  sources: [
    {
      label: "Discogs",
      url: "https://www.discogs.com/label/5126-Amphetamine-Reptile-Records",
    },
    {
      label: "AmRep Discography",
      url: "https://en.wikipedia.org/wiki/Amphetamine_Reptile_Records_discography",
    },
    {
      label: "Hammerhead Discography",
      url: "https://en.wikipedia.org/wiki/Hammerhead_(band)",
    },
    { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Amphetamine_Reptile_Records" },
    { label: "Shoxop", url: "https://www.shoxop.com/" },
    {
      label: "Shoxop Archive",
      url: "https://www.shoxop.com/collections/archive-sold-out-releases-over-the-years",
    },
    { label: "Shoxop All Releases", url: "https://www.shoxop.com/collections/all" },
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
    { label: "Last.fm", url: "https://www.last.fm/" },
    { label: "Bandcamp", url: "https://bandcamp.com/" },
    { label: "YouTube", url: "https://www.youtube.com/" },
    { label: "eBay", url: "https://www.ebay.com/" },
    { label: "Timebomb Records", url: "https://timebomb.co.jp/" },
    { label: "Chokebore", url: "https://www.chokebore.net/" },
    { label: "Metal Music Archives", url: "https://www.metalmusicarchives.com/" },
    { label: "Metallipromo", url: "https://metallipromo.com/" },
    { label: "The Melvins Wiki", url: "https://themelvins.net/" },
    { label: "Shoxop", url: "https://www.shoxop.com/" },
  ],
  searchPlaceholder: "Search AmRep...",
  seo: {
    title: "Amphetamine Reptile Records",
    titleTemplate: "%s | Amphetamine Reptile Records",
    description:
      "Explore Amphetamine Reptile Records: artist roster, releases, label history, and milestones.",
    keywords: [
      "Amphetamine Reptile Records",
      "AmRep",
      "noise rock",
      "independent label",
      "artists",
      "releases",
      "label history",
    ],
    siteName: "Major League Numbers",
    ogImage: "https://majorleaguenumbers.com/noise-og.png",
    ogImageAlt: "Amphetamine Reptile Records",
    twitterImage: "https://majorleaguenumbers.com/noise-og.png",
  },
};

export const REVELATION_SITE: MusicSiteConfig = {
  id: "rev",
  name: "Revelation By The Numbers",
  shortName: "Rev",
  basePath: "/rev",
  chatLabel: "ChatREV",
  headerTitle: "Revelation By The Numbers",
  headerTextClass: "",
  logoSrc: "/revelation-logo.png",
  chatIconSrc: "/revelation-logo.png",
  placeholderIconSrc: "/revelation-logo.png",
  shellClass: "revelation-shell",
  logoClassName: "h-12 w-auto sm:h-16 lg:h-20 lg:w-auto",
  navLabels: {
    discography: "Releases",
    members: "Bands",
    sideProjects: "Sub-Labels",
  },
  footerDisclaimer:
    "All Content, Rights, Copyrights, etc. are the property of Revelation Records. This is simply a fan site.",
  sources: [
    { label: "Discogs", url: "https://www.discogs.com/label/910-Revelation-Records" },
    { label: "RevHQ", url: "https://revhq.com/" },
    { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Revelation_Records" },
    { label: "MusicBrainz", url: "https://musicbrainz.org/" },
    { label: "Bandcamp", url: "https://bandcamp.com/" },
  ],
  imageSources: [
    { label: "Discogs", url: "https://www.discogs.com/" },
    { label: "RevHQ", url: "https://revhq.com/" },
    { label: "Wikipedia", url: "https://en.wikipedia.org/" },
    { label: "Wikimedia Commons", url: "https://commons.wikimedia.org/" },
    { label: "Bandcamp", url: "https://bandcamp.com/" },
  ],
  searchPlaceholder: "Search Rev...",
  seo: {
    title: "Revelation Records",
    titleTemplate: "%s | Revelation Records",
    description:
      "Explore Revelation Records: artist roster, discography, label history, and milestones.",
    keywords: [
      "Revelation Records",
      "hardcore",
      "punk",
      "straight edge",
      "discography",
      "artists",
      "releases",
      "label history",
    ],
    siteName: "Major League Numbers",
    ogImage: "https://majorleaguenumbers.com/revelation-logo.png",
    ogImageAlt: "Revelation Records",
    twitterImage: "https://majorleaguenumbers.com/revelation-logo.png",
  },
};

export const MUSIC_SITES = [GBV_SITE, AMREP_SITE, REVELATION_SITE] as const;

export type MusicSiteId = (typeof MUSIC_SITES)[number]["id"];

export const SITE_URL = "https://majorleaguenumbers.com";

export function getMusicSites(): MusicSiteConfig[] {
  return [...MUSIC_SITES];
}

export function getMusicSiteById(id: MusicSiteId): MusicSiteConfig {
  return MUSIC_SITES.find((site) => site.id === id) ?? GBV_SITE;
}

export function getMusicSiteFromPathname(
  pathname?: string | null
): MusicSiteConfig {
  if (!pathname) return GBV_SITE;
  const match = MUSIC_SITES.find((site) => pathname.startsWith(site.basePath));
  return match ?? GBV_SITE;
}

export function isMusicSiteRoute(pathname?: string | null): boolean {
  if (!pathname) return false;
  return MUSIC_SITES.some((site) => pathname.startsWith(site.basePath));
}

export function createSiteMetadata(site: MusicSiteConfig): Metadata {
  return {
    title: {
      default: site.seo.title,
      template: site.seo.titleTemplate ?? `%s | ${site.seo.title}`,
    },
    description: site.seo.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: site.basePath,
    },
    keywords: site.seo.keywords,
    authors: [{ name: site.seo.title }],
    openGraph: {
      title: site.seo.title,
      description: site.seo.description,
      url: `${SITE_URL}${site.basePath}`,
      siteName: site.seo.siteName ?? site.seo.title,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: site.seo.ogImage,
          width: 1200,
          height: 630,
          alt: site.seo.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.seo.title,
      description: site.seo.description,
      images: [site.seo.twitterImage ?? site.seo.ogImage],
    },
  };
}

export function getSiteJsonLd(site: MusicSiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.seo.title,
    url: `${SITE_URL}${site.basePath}`,
    description: site.seo.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}${site.basePath}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
