"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Music } from "lucide-react";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

export function GbvSongsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Songs</h1>

      <Card>
        <CardContent className="p-12 text-center">
          <Music className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="mb-2">Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Song data requires additional API integration. Check out the {site.navLabels.discography}{" "}
            section to see tracklists where available.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
