"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

const DUMMY_SONGS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: "Song Title",
  artist: "Band Name",
  album: "Release Title",
  duration: "0:00",
}));

export function RevSongsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Songs</h1>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            {DUMMY_SONGS.map((song) => (
              <div key={song.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                <div>
                  <p className="text-sm font-medium">{song.title}</p>
                  <p className="text-xs text-muted-foreground">{song.artist} &middot; {song.album}</p>
                </div>
                <span className="text-xs text-muted-foreground">{song.duration}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
