import Image from "next/image";
import Link from "next/link";

const sportsSites = [
  {
    name: "MLB Numbers",
    href: "/mlb",
    logo: "https://www.mlbstatic.com/team-logos/league-on-dark/1.svg",
    description: "MLB player stats, rosters & standings",
  },
  {
    name: "NFL Numbers",
    href: "/nfl",
    logo: "/nfl-logo.svg",
    description: "NFL player stats, rosters & standings",
  },
  {
    name: "NBA Numbers",
    href: "/nba",
    logo: "/nba-logo.svg",
    description: "NBA player stats, rosters & standings",
  },
  {
    name: "NHL Numbers",
    href: "/nhl",
    logo: "/nhl-logo.svg",
    description: "NHL player stats, rosters & standings",
  },
  {
    name: "USPBL Numbers",
    href: "/uspbl",
    logo: "/uspbl-logo.png",
    description: "USPBL teams, rosters & standings",
  },
];

const musicSites = [
  {
    name: "Guided by Voices",
    href: "/gbv",
    logo: "/gbv-mlb.svg",
    description: "Discography & encyclopedia",
  },
  {
    name: "Amphetamine Reptile",
    href: "/amrep",
    logo: "/amrep-logo-foreground.svg",
    description: "Discography & catalog",
  },
  // {
  //   name: "Revelation Records",
  //   href: "/rev",
  //   logo: "/revelation-logo.png",
  //   description: "Discography & catalog",
  // },
];

function SiteCard({ site }: { site: { name: string; href: string; logo: string; description: string } }) {
  return (
    <Link
      href={site.href}
      className="flex flex-col items-center gap-3 p-6 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
    >
      <Image
        src={site.logo}
        alt={site.name}
        width={80}
        height={80}
        className="h-20 w-auto"
      />
      <span className="text-lg font-semibold text-center">{site.name}</span>
      <span className="text-sm text-muted-foreground text-center">
        {site.description}
      </span>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 normal-case" style={{ fontFamily: "var(--font-lato), sans-serif" }}>Major League Numbers</h1>
      <div className="max-w-4xl w-full space-y-10">
        <section>
          <h2 className="text-center mb-6">Sports</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {sportsSites.map((site) => (
              <SiteCard key={site.href} site={site} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-center mb-6">Music</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {musicSites.map((site) => (
              <SiteCard key={site.href} site={site} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
