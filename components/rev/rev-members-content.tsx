"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

const DUMMY_BANDS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: "Band Name",
}));

export function RevMembersContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Bands</h1>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
  );
}
