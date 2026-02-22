"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { getSgMainRoster, getSgGuestStars, getSgArtistImageUrl } from "@/lib/sg-artists-data";
import { SgRemoteImage } from "@/components/sg/sg-remote-image";

function ArtistGrid({ artists, site }: { artists: { id: string; name: string; imageUrl: string | null }[]; site: any }) {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {artists.map((member) => (
        <Link key={member.id} href={`${site.basePath}/members/${member.id}`}>
          <Card className="hover:bg-muted/80 transition-colors cursor-pointer h-full">
            <CardContent className="p-3 text-center">
              {member.imageUrl ? (
                <SgRemoteImage
                  src={member.imageUrl}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="w-full aspect-square rounded-lg object-contain mb-2"
                  cacheKey={`sg-member-thumb:${member.id}`}
                />
              ) : (
                <div className="w-full aspect-square rounded-lg bg-muted flex items-center justify-center mb-2 p-2">
                  <span className="text-xs text-muted-foreground text-center font-medium leading-tight">{member.name}</span>
                </div>
              )}
              <h3 className="font-semibold text-sm">{member.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function SgMembersContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  const mainRoster = getSgMainRoster().map((artist) => ({
    id: artist.id,
    name: artist.name,
    imageUrl: getSgArtistImageUrl(artist.id) ?? null,
  }));

  const guestStars = getSgGuestStars().map((artist) => ({
    id: artist.id,
    name: artist.name,
    imageUrl: getSgArtistImageUrl(artist.id) ?? null,
  }));

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">
        {mainRoster.length} {site.navLabels.members}
      </h1>

      <ArtistGrid artists={mainRoster} site={site} />

      {guestStars.length > 0 && (
        <>
          <h2 className="font-league mt-10 mb-6">
            {guestStars.length} Guest Stars
          </h2>
          <ArtistGrid artists={guestStars} site={site} />
        </>
      )}
    </div>
  );
}
