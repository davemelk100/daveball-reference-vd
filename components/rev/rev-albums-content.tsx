"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

const DUMMY_RELEASES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: "Release Title",
  year: "0000",
  type: i % 3 === 0 ? "7\"" : "LP",
}));

export function RevAlbumsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Releases</h1>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {DUMMY_RELEASES.map((release) => (
          <Card key={release.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-3">
              <div className="w-full aspect-square bg-muted/30 rounded-lg mb-2" />
              <p className="text-sm font-medium truncate">{release.title}</p>
              <p className="text-xs text-muted-foreground">{release.year} &middot; {release.type}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
