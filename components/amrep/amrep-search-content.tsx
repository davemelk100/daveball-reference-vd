"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GbvRemoteImage } from "@/components/amrep/amrep-remote-image";
import { Card, CardContent } from "@/components/ui/card";
import { getProxiedImageUrl, getReleaseType } from "@/lib/gbv-utils";
import { getLocalAlbumImage } from "@/lib/gbv-album-images";
import { Loader2 } from "lucide-react";
import {
  useSiteSearchData,
  type SiteSearchAlbum,
  type SiteSearchMember,
} from "@/components/music-site/use-site-search-data";
import { MemberAvatar } from "@/components/music-site/member-avatar";
import { AlbumGrid } from "@/components/music-site/album-grid";

export function GbvSearchContent() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const { site, isAmrep, albums, members, isLoading } = useSiteSearchData(query);

  const filteredMembers = useMemo(() => {
    if (!query) return [];
    const lower = query.toLowerCase();
    return members.filter((member) =>
      member.name.toLowerCase().includes(lower),
    );
  }, [members, query]);

  const filteredAlbums = useMemo(() => {
    if (!query) return [];
    const lower = query.toLowerCase();
    return albums.filter((album) => album.title.toLowerCase().includes(lower));
  }, [albums, query]);

  const getAlbumImage = (album: SiteSearchAlbum): string | null => {
    if (isAmrep) return album.thumb ? getProxiedImageUrl(album.thumb) : null;
    return getLocalAlbumImage(album.id) || getProxiedImageUrl(album.thumb);
  };

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Searching...</p>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="container py-6">
        <div className="text-center text-muted-foreground">
          Enter a search term above to find albums or members.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Results for "{query}"</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-league mb-4">
            {site.navLabels.members}{" "}
            <span className="align-baseline">({filteredMembers.length})</span>
          </h2>
          {filteredMembers.length > 0 ? (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
              {filteredMembers.map((member: SiteSearchMember) => (
                <Link
                  key={member.id}
                  href={`${site.basePath}/members/${member.id}`}
                >
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                    <CardContent className="p-3 text-center">
                      <MemberAvatar
                        name={member.name}
                        imageUrl={member.imageUrl}
                        memberId={member.id}
                        fallbackIconSrc={site.placeholderIconSrc}
                        cacheKeyPrefix={site.id}
                        skipRemoteLookup={isAmrep}
                        fit={isAmrep ? "contain" : "cover"}
                      />
                      <h3 className="font-semibold text-sm">{member.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No members found.</p>
          )}
        </div>

        <div>
          <h2 className="font-league mb-4">
            {site.navLabels.discography}{" "}
            <span className="align-baseline">({filteredAlbums.length})</span>
          </h2>
          {filteredAlbums.length > 0 ? (
            <AlbumGrid
              albums={filteredAlbums}
              site={site}
              getAlbumImage={getAlbumImage}
              getReleaseTypeLabel={(album) =>
                getReleaseType(album.format, album.releaseType)
              }
              RemoteImage={GbvRemoteImage}
              linkBasePath={`${site.basePath}/albums`}
              cacheKeyPrefix="gbv-album-thumb"
              imageFit={isAmrep ? "contain" : "cover"}
            />
          ) : (
            <p className="text-sm text-muted-foreground">No releases found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
