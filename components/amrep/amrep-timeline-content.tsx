"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { amrepTimeline } from "@/lib/amrep-timeline-data";

const timelineEvents = [
  { year: 1983, event: "Band formed in Dayton, Ohio by Robert Pollard" },
  { year: 1986, event: "First release: Forever Since Breakfast EP" },
  { year: 1987, event: "Devil Between My Toes released" },
  { year: 1992, event: "Propeller released - first critical recognition" },
  { year: 1993, event: "Vampire on Titus released" },
  { year: 1994, event: "Bee Thousand released - breakthrough album" },
  { year: 1995, event: "Alien Lanes released - indie rock masterpiece" },
  { year: 1996, event: "Under the Bushes Under the Stars - Matador Records debut" },
  { year: 1997, event: "Mag Earwhig! released - lineup changes" },
  { year: 1999, event: "Do the Collapse - TVT Records, major label debut" },
  { year: 2001, event: "Isolation Drills released" },
  { year: 2002, event: "Universal Truths and Cycles released" },
  { year: 2004, event: "Half Smiles of the Decomposed - final album before breakup" },
  { year: 2004, event: "Band breaks up after New Year's Eve show" },
  { year: 2010, event: "Classic lineup reunites" },
  { year: 2012, event: "Let's Go Eat the Factory - first reunion album" },
  { year: 2017, event: "August by Cake released" },
  { year: 2019, event: "Zeppelin Over China - double album" },
  { year: 2022, event: "Tremblers and Goggles by Rank released" },
  { year: 2024, event: "Band continues prolific output" },
];

export function GbvTimelineContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const events = isAmrep
    ? amrepTimeline.map((item) => ({
        year: item.year,
        event: `${item.title} — ${item.description}`,
      }))
    : timelineEvents;

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Timeline</h1>

      <div className="space-y-4">
        {events.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl font-bold">{item.year}</span>
              </div>
              <p className="text-muted-foreground">{item.event}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
