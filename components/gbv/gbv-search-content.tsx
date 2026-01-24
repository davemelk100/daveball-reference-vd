"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GbvRemoteImage } from "@/components/gbv/gbv-remote-image";
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

  const filteredAlbums = useMemo(() => {
    if (!query) return [];
    const lower = query.toLowerCase();
    return albums.filter((album) => album.title.toLowerCase().includes(lower));
  }, [albums, query]);

  const filteredMembers = useMemo(() => {
    if (!query) return [];
    const lower = query.toLowerCase();
    return members.filter((member) =>
      member.name.toLowerCase().includes(lower),
    );
  }, [members, query]);

  const getAlbumImage = (album: SiteSearchAlbum): string | null => {
    if (isAmrep) return album.thumb ? getProxiedImageUrl(album.thumb) : null;
    const local = getLocalAlbumImage(album.id);
    if (local) return local;
    const raw = album.coverUrl || album.thumb || null;
    return getProxiedImageUrl(raw);
  };

  if (!query) {
    return (
      <div className="container py-6">
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Enter a search term to find{" "}
            {site.navLabels.discography.toLowerCase()} or{" "}
            {site.navLabels.members.toLowerCase()}.
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Searching {site.shortName} data...
          </p>
        </div>
      </div>
    );
  }

  const hasResults = filteredAlbums.length > 0 || filteredMembers.length > 0;

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="font-league">Search Results</h1>
        <p className="text-muted-foreground text-sm">"{query}"</p>
      </div>

      {!hasResults && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No results found.
          </CardContent>
        </Card>
      )}

      {filteredMembers.length > 0 && (
        <div className="mb-8">
          <h2 className="font-league mb-4">
            {site.navLabels.members}{" "}
            <span className="align-baseline">({filteredMembers.length})</span>
          </h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
        </div>
      )}

      {filteredAlbums.length > 0 && (
        <div className="mb-8">
          <h2 className="font-league mb-4">
            {site.navLabels.discography}{" "}
            <span className="align-baseline">({filteredAlbums.length})</span>
          </h2>
          <AlbumGrid
            albums={filteredAlbums}
            site={site}
            getAlbumImage={getAlbumImage}
            getReleaseTypeLabel={(album) =>
              getReleaseType(album.format, album.releaseType)
            }
            RemoteImage={GbvRemoteImage}
            linkBasePath={`${site.basePath}/albums`}
            cacheKeyPrefix="gbv-search-album"
            imageFit={isAmrep ? "contain" : "cover"}
          />
        </div>
      )}
    </div>
  );
}
