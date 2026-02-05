"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

const DUMMY_RELEASES = [
  { title: "Release Title", year: "0000", format: "LP" },
  { title: "Release Title", year: "0000", format: "7\"" },
  { title: "Release Title", year: "0000", format: "LP" },
];

export function RevMemberDetailContent({ memberId }: { memberId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-6">
      <Link
        href={`${site.basePath}/members`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        {site.navLabels.members}
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        {/* Left: band image + info */}
        <div>
          <div className="w-full aspect-square bg-muted/30 rounded-lg mb-4 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-muted/50" />
          </div>
          <h1 className="font-league mb-2">Band Name</h1>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Right: discography */}
        <div>
          <h2 className="font-league mb-4">Releases</h2>
          <div className="space-y-2">
            {DUMMY_RELEASES.map((release, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-border pb-2 last:border-0"
              >
                <div>
                  <p className="font-semibold text-sm">{release.title}</p>
                  <p className="text-xs text-muted-foreground">{release.format}</p>
                </div>
                <Badge variant="outline">{release.year}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
