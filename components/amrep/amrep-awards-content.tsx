"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

const criticalAcclaim = [
  {
    publication: "Pitchfork",
    accolade: "Bee Thousand ranked #10 in Top 100 Albums of the 1990s",
    year: 2003,
    sourceLabel: "Pitchfork list",
    sourceUrl: "https://pitchfork.com/features/lists-and-guides/5923-top-100-albums-of-the-1990s/",
  },
  {
    publication: "Rolling Stone",
    accolade: "Alien Lanes - 4 stars",
    year: 1995,
  },
  {
    publication: "Pitchfork",
    accolade: "Alien Lanes ranked #27 in Top 100 Albums of the 1990s",
    year: 2003,
    sourceLabel: "Pitchfork list",
    sourceUrl: "https://pitchfork.com/features/lists-and-guides/5923-top-100-albums-of-the-1990s/",
  },
  {
    publication: "Pitchfork",
    accolade: "Director's Cut review says original Bee Thousand 'warrants a 10'",
    year: 2003,
    sourceLabel: "Pitchfork review",
    sourceUrl: "https://pitchfork.com/reviews/albums/3600-bee-thousand-the-directors-cut/",
  },
];

const listAppearances = [
  "Rolling Stone's 500 Greatest Albums (Bee Thousand)",
  "Pitchfork's Top 100 Albums of the 1990s",
  "NME's Greatest Indie Albums Ever",
  "Spin's 100 Greatest Albums 1985-2005",
  "AllMusic's Essential Lo-Fi Albums",
];

const amrepMilestones = [
  {
    label: "Founded",
    detail: "Amphetamine Reptile Records founded in 1986.",
  },
  {
    label: "Breakthrough release",
    detail: "Helmet’s Strap It On helped sustain the label in the 1990s.",
  },
  {
    label: "Documentary",
    detail: "The Color of Noise (2015) spotlights AmRep’s history.",
  },
];

const amrepNotablePerformances = [
  "CMJ / Amphetamine Reptile Tour (1992) featuring multiple AmRep artists.",
];

export function GbvAwardsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">
        {isAmrep ? "Milestones & Recognition" : "Awards & Recognition"}
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Critical Acclaim */}
        <Card className="py-6">
          <CardHeader className="pb-6">
            <h2>{isAmrep ? "Label Milestones" : "Critical Acclaim"}</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(isAmrep ? amrepMilestones : criticalAcclaim).map((item, index) => (
                <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{isAmrep ? item.label : item.publication}</p>
                    <p className="text-sm text-muted-foreground">
                      {isAmrep ? item.detail : item.accolade}
                    </p>
                    {!isAmrep && item.sourceUrl && (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                      >
                        {item.sourceLabel || "Source"}
                      </a>
                    )}
                  </div>
                  {!isAmrep && <Badge variant="outline">{item.year}</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* List Appearances */}
        <Card className="py-6">
          <CardHeader className="pb-6">
            <h2>{isAmrep ? "Notable Performances" : "Best-Of List Appearances"}</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {(isAmrep ? amrepNotablePerformances : listAppearances).map((item, index) => (
                <li key={index} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
