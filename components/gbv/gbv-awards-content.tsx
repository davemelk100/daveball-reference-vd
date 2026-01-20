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

const recognition = [
  {
    title: "Indie Rock Pioneers",
    description: "Credited with defining the lo-fi aesthetic in indie rock",
  },
  {
    title: "Prolific Output",
    description: "One of the most prolific bands in rock history with 30+ albums",
  },
  {
    title: "Critical Darlings",
    description: "Consistently praised by critics for songwriting excellence",
  },
  {
    title: "Cult Following",
    description: "Dedicated fanbase spanning four decades",
  },
];

export function GbvAwardsContent() {
  return (
    <main className="container py-6">
      <h1 className="font-league text-4xl font-semibold mb-6">Awards & Recognition</h1>

      {/* Recognition Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {recognition.map((item) => (
          <Card key={item.title}>
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Critical Acclaim */}
        <Card>
          <CardHeader>
            <CardTitle>Critical Acclaim</CardTitle>
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
        <Card>
          <CardHeader>
            <CardTitle>Best-Of List Appearances</CardTitle>
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

      {/* Note */}
      <Card className="mt-6">

      </Card>
    </main>
  );
}
