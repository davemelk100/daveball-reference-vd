"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

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

export function GbvAwardsContent() {
  return (
    <main className="container py-6">
      <h1 className="font-league text-2xl font-semibold mb-6">
        Awards & Recognition
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Critical Acclaim */}
        <Card className="py-6">
          <CardHeader className="pb-6">
            <h2 className="text-xl font-semibold">Critical Acclaim</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalAcclaim.map((item, index) => (
                <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{item.publication}</p>
                    <p className="text-sm text-muted-foreground">{item.accolade}</p>
                    {item.sourceUrl && (
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
                  <Badge variant="outline">{item.year}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* List Appearances */}
        <Card className="py-6">
          <CardHeader className="pb-6">
            <h2 className="text-xl font-semibold">Best-Of List Appearances</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {listAppearances.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Trophy className="h-4 w-4 mt-1 text-yellow-500 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

    </main>
  );
}
