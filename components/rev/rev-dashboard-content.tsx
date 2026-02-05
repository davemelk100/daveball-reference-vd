"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

const DUMMY_BANDS = [
  { name: "Band Name", id: 1 },
  { name: "Band Name", id: 2 },
  { name: "Band Name", id: 3 },
  { name: "Band Name", id: 4 },
  { name: "Band Name", id: 5 },
  { name: "Band Name", id: 6 },
];

const DUMMY_RELEASES = [
  { title: "Release Title", year: "0000", id: 1 },
  { title: "Release Title", year: "0000", id: 2 },
  { title: "Release Title", year: "0000", id: 3 },
  { title: "Release Title", year: "0000", id: 4 },
  { title: "Release Title", year: "0000", id: 5 },
  { title: "Release Title", year: "0000", id: 6 },
];

export function RevDashboardContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-2">
      {/* Bands */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-league">Bands</h2>
          <Link href={`${site.basePath}/members`} className="text-sm text-muted-foreground hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {DUMMY_BANDS.map((band) => (
            <Card key={band.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-3 text-center">
                <div className="w-full aspect-square bg-muted/30 rounded-lg mb-2 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-muted/50" />
                </div>
                <p className="text-sm font-medium">{band.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Releases */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-league">Releases</h2>
          <Link href={`${site.basePath}/albums`} className="text-sm text-muted-foreground hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {DUMMY_RELEASES.map((release) => (
            <Card key={release.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-3">
                <div className="w-full aspect-square bg-muted/30 rounded-lg mb-2" />
                <p className="text-sm font-medium truncate">{release.title}</p>
                <p className="text-xs text-muted-foreground">{release.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
