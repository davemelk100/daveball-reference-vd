"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { GbvRemoteImage } from "@/components/amrep/amrep-remote-image";
import { Card, CardContent } from "@/components/ui/card";
import { getProxiedImageUrl, getReleaseType } from "@/lib/gbv-utils";
import { getLocalMemberImage } from "@/lib/gbv-member-images";
import { getLocalAlbumImage } from "@/lib/gbv-album-images";
import { Loader2 } from "lucide-react";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { amrepArtists } from "@/lib/amrep-artists-data";
import { amrepReleases } from "@/lib/amrep-releases-data";

interface Album {
  id: number;
  title: string;
  year: number;
  thumb: string;
  coverUrl?: string | null;
  format?: string | string[];
  releaseType?: string;
}

interface Member {
  id: number;
  name: string;
  active: boolean;
  imageUrl?: string | null;
}

function MemberAvatar({
  name,
  imageUrl,
  memberId,
  fallbackIconSrc,
  skipRemoteLookup,
}: {
  name: string;
  imageUrl?: string | null;
  memberId?: number;
  fallbackIconSrc: string;
  skipRemoteLookup?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const [resolvedImageUrl, setResolvedImageUrl] = useState<string | null>(null);
  const [lookupAttempted, setLookupAttempted] = useState(false);
  const normalizedImageUrl = imageUrl?.replace(/^http:/, "https:") || null;
  const localImageUrl = getLocalMemberImage(memberId);

  useEffect(() => {
    if (localImageUrl && !hasError) {
      setResolvedImageUrl(localImageUrl);
      return;
    }

    if (normalizedImageUrl && !hasError) {
      setResolvedImageUrl(normalizedImageUrl);
      return;
    }

    if (skipRemoteLookup) return;
    if (lookupAttempted) return;

    const cacheKey = `gbv-member-image:${name.toLowerCase()}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setResolvedImageUrl(cached);
        setLookupAttempted(true);
        return;
      }
    } catch {
      // ignore cache errors
    }

    async function fetchCommons() {
      try {
        const res = await fetch(
          `/api/gbv/commons-image?name=${encodeURIComponent(name)}`,
        );
        if (!res.ok) return;
        const data = await res.json();
        if (typeof data?.imageUrl === "string" && data.imageUrl.length > 0) {
          setResolvedImageUrl(data.imageUrl);
          try {
            localStorage.setItem(cacheKey, data.imageUrl);
          } catch {
            // ignore cache errors
          }
        }
      } catch {
        // ignore lookup errors
      } finally {
        setLookupAttempted(true);
      }
    }

    fetchCommons();
  }, [
    hasError,
    localImageUrl,
    lookupAttempted,
    name,
    normalizedImageUrl,
    skipRemoteLookup,
  ]);

  if (!resolvedImageUrl || hasError) {
    return (
      <div className="w-full aspect-square rounded-lg mb-2 mx-auto flex items-center justify-center">
        <img
          src={fallbackIconSrc}
          alt="Artist placeholder"
          className="w-auto h-auto max-w-1/2 max-h-1/2 gbv-nav-icon object-contain"
        />
      </div>
    );
  }

  return (
    <div className="w-full aspect-square mb-2 mx-auto relative">
      <Image
        src={resolvedImageUrl}
        alt={`${name} photo`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
        className="rounded-lg object-contain"
        onError={() => setHasError(true)}
        unoptimized
      />
    </div>
  );
}

export function GbvSearchContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
      if (!query) {
        setIsLoading(false);
        return;
      }

      if (isAmrep) {
        if (!isActive) return;
        try {
          const res = await fetch(
            "/api/amrep/discogs?type=releases&per_page=100",
          );
          if (res.ok) {
            const data = await res.json();
            const releases = Array.isArray(data?.releases) ? data.releases : [];
            setAlbums(
              releases.map((release: any) => ({
                id: release.id,
                title: `${release.artist} — ${release.title}`,
                year: release.year,
                thumb: release.thumb || "",
                format: release.format,
              })),
            );
          } else {
            setAlbums(
              amrepReleases.map((release) => ({
                id: release.id,
                title: `${release.artist} — ${release.title}`,
                year: release.year,
                thumb: "",
                format: release.format,
              })),
            );
          }
        } catch {
          setAlbums(
            amrepReleases.map((release) => ({
              id: release.id,
              title: `${release.artist} — ${release.title}`,
              year: release.year,
              thumb: "",
              format: release.format,
            })),
          );
        }

        setMembers(
          amrepArtists.map((artist) => ({
            id: artist.id,
            name: artist.name,
            active: artist.active,
            imageUrl: null,
          })),
        );
        setIsLoading(false);
        return;
      }

      try {
        const [albumsRes, membersRes] = await Promise.all([
          fetch("/api/gbv/discogs?type=albums"),
          fetch(
            "/api/gbv/discogs?type=artist&include_member_images=true&member_image_limit=60",
          ),
        ]);
        if (albumsRes.ok) {
          const data = await albumsRes.json();
          setAlbums(data.albums || []);
        }
        if (membersRes.ok) {
          const data = await membersRes.json();
          let nextMembers = data.members || [];
          if (nextMembers.length <= 1) {
            const fallbackRes = await fetch("/api/gbv/discogs?type=artist");
            if (fallbackRes.ok) {
              const fallbackData = await fallbackRes.json();
              if (Array.isArray(fallbackData?.members)) {
                nextMembers = fallbackData.members;
              }
            }
          }
          setMembers(nextMembers);
        }
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      isActive = false;
    };
  }, [query, isAmrep]);

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

  const getAlbumImage = (album: Album): string | null => {
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
              {filteredMembers.map((member) => (
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
                        skipRemoteLookup={false}
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
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
              {filteredAlbums.map((album) => (
                <Link
                  key={album.id}
                  href={`${site.basePath}/albums/${album.id}`}
                >
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                    <CardContent className="p-3">
                      {getAlbumImage(album) ? (
                        <GbvRemoteImage
                          src={getAlbumImage(album)}
                          alt={album.title}
                          width={200}
                          height={200}
                          className="w-full aspect-square rounded-lg object-contain mb-2"
                          cacheKey={`gbv-album-thumb:${album.id}`}
                          preferProxy
                        />
                      ) : (
                        <div className="w-full aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                          <img
                            src={site.placeholderIconSrc}
                            alt={`${site.shortName} logo`}
                            className="w-auto h-auto max-w-1/2 max-h-1/2 gbv-nav-icon object-contain"
                          />
                        </div>
                      )}
                      <h3 className="font-semibold text-sm truncate">
                        {album.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{album.year}</span>
                        <span className="border border-border rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                          {getReleaseType(album.format, album.releaseType)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No releases found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
