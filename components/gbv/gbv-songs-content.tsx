"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Music } from "lucide-react";

export function GbvSongsContent() {
  return (
    <main className="container py-6">
      <h1 className="font-league text-2xl font-semibold mb-6">Songs</h1>

      <Card>
        <CardContent className="p-12 text-center">
          <Music className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Song data requires additional API integration. Check out the Albums section
            to see tracklists for each album.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
