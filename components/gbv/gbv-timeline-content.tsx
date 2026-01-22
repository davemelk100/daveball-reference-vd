"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const timelineEvents = [
  { year: 1983, event: "Band formed in Dayton, Ohio by Robert Pollard", era: "Early" },
  { year: 1986, event: "First release: Forever Since Breakfast EP", era: "Early" },
  { year: 1987, event: "Devil Between My Toes released", era: "Early" },
  { year: 1992, event: "Propeller released - first critical recognition", era: "Classic" },
  { year: 1993, event: "Vampire on Titus released", era: "Classic" },
  { year: 1994, event: "Bee Thousand released - breakthrough album", era: "Classic" },
  { year: 1995, event: "Alien Lanes released - indie rock masterpiece", era: "Classic" },
  { year: 1996, event: "Under the Bushes Under the Stars - Matador Records debut", era: "Classic" },
  { year: 1997, event: "Mag Earwhig! released - lineup changes", era: "Classic" },
  { year: 1999, event: "Do the Collapse - TVT Records, major label debut", era: "TVT" },
  { year: 2001, event: "Isolation Drills released", era: "TVT" },
  { year: 2002, event: "Universal Truths and Cycles released", era: "TVT" },
  { year: 2004, event: "Half Smiles of the Decomposed - final album before breakup", era: "TVT" },
  { year: 2004, event: "Band breaks up after New Year's Eve show", era: "TVT" },
  { year: 2010, event: "Classic lineup reunites", era: "Reunion" },
  { year: 2012, event: "Let's Go Eat the Factory - first reunion album", era: "Reunion" },
  { year: 2017, event: "August by Cake released", era: "Reunion" },
  { year: 2019, event: "Zeppelin Over China - double album", era: "Reunion" },
  { year: 2022, event: "Tremblers and Goggles by Rank released", era: "Reunion" },
  { year: 2024, event: "Band continues prolific output", era: "Reunion" },
];

const eraColors: Record<string, string> = {
  Early: "bg-gray-500",
  Classic: "bg-purple-500",
  TVT: "bg-blue-500",
  Reunion: "bg-green-500",
};

export function GbvTimelineContent() {
  return (
    <main className="container py-6">
      <h1 className="font-league text-2xl font-semibold mb-6">Timeline</h1>

      <div className="flex gap-2 mb-6">
        {Object.entries(eraColors).map(([era, color]) => (
          <Badge key={era} className={`${color} text-white`}>
            {era}
          </Badge>
        ))}
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-4">
          {timelineEvents.map((item, index) => (
            <div key={index} className="relative pl-12">
              {/* Dot */}
              <div
                className={`absolute left-2 top-2 w-5 h-5 rounded-full border-4 border-background ${eraColors[item.era]}`}
              />

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl font-bold">{item.year}</span>
                    <Badge variant="outline">{item.era} Era</Badge>
                  </div>
                  <p className="text-muted-foreground">{item.event}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
