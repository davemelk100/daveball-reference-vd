"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

const DUMMY_TRACKS = [
  { position: "1", title: "Track Title", duration: "0:00" },
  { position: "2", title: "Track Title", duration: "0:00" },
  { position: "3", title: "Track Title", duration: "0:00" },
  { position: "4", title: "Track Title", duration: "0:00" },
  { position: "5", title: "Track Title", duration: "0:00" },
];

export function RevAlbumDetailContent({ albumId }: { albumId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-6">
      <Link
        href={`${site.basePath}/albums`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        {site.navLabels.discography}
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        {/* Left: cover + meta */}
        <div>
          <div className="w-full aspect-square bg-muted/30 rounded-lg mb-4" />
          <h1 className="font-league mb-2">Release Title</h1>
          <div className="flex gap-2 mb-3">
            <Badge variant="outline">0000</Badge>
            <Badge variant="outline">LP</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Band Name</p>
          <p className="text-sm text-muted-foreground">Revelation Records</p>
        </div>

        {/* Right: tracklist */}
        <div>
          <h2 className="font-league mb-4">Tracklist</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                {DUMMY_TRACKS.map((track) => (
                  <div key={track.position} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-6">{track.position}</span>
                      <span className="text-sm">{track.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{track.duration}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
