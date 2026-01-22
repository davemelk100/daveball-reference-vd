"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { GbvRemoteImage } from "@/components/gbv/gbv-remote-image";
import { Card, CardContent } from "@/components/ui/card";
import { getProxiedImageUrl, getReleaseType } from "@/lib/gbv-utils";
import { getLocalMemberImage } from "@/lib/gbv-member-images";
import { getLocalAlbumImage } from "@/lib/gbv-album-images";
import { Loader2 } from "lucide-react";

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
}: {
  name: string;
  imageUrl?: string | null;
  memberId?: number;
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
          `/api/gbv/commons-image?name=${encodeURIComponent(name)}`
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
  }, [hasError, localImageUrl, lookupAttempted, name, normalizedImageUrl]);

  if (!resolvedImageUrl || hasError) {
    return (
      <div className="w-full aspect-square rounded-lg mb-2 mx-auto flex items-center justify-center bg-muted">
        <Image
          src="/chat-gbv-box.svg"
          alt="GBV rune"
          width={48}
          height={48}
          className="h-12 w-12 gbv-nav-icon"
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
        className="rounded-lg object-cover"
        onError={() => setHasError(true)}
        unoptimized
      />
    </div>
  );
}

export function GbvSearchContent() {
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

      setIsLoading(true);
      try {
        const [albumsRes, membersRes] = await Promise.all([
          fetch("/api/gbv/discogs?type=albums"),
          fetch("/api/gbv/discogs?type=artist&include_member_images=true"),
        ]);

        if (isActive) {
          if (albumsRes.ok) {
            const albumsData = await albumsRes.json();
            setAlbums(albumsData.albums || []);
          } else {
            setAlbums([]);
          }

          if (membersRes.ok) {
            const membersData = await membersRes.json();
            setMembers(membersData.members || []);
          } else {
            setMembers([]);
          }
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isActive = false;
    };
  }, [query]);

  const filteredAlbums = useMemo(() => {
    if (!query) return [];
    const lower = query.toLowerCase();
    return albums.filter((album) => album.title.toLowerCase().includes(lower));
  }, [albums, query]);

  const filteredMembers = useMemo(() => {
    if (!query) return [];
    const lower = query.toLowerCase();
    return members.filter((member) => member.name.toLowerCase().includes(lower));
  }, [members, query]);

  const getAlbumImage = (album: Album): string | null => {
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
            Enter a search term to find GBV albums or members.
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
          <p className="text-muted-foreground text-sm">Searching GBV data...</p>
        </div>
      </div>
    );
  }

  const hasResults = filteredAlbums.length > 0 || filteredMembers.length > 0;

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="font-league text-2xl font-semibold">Search Results</h1>
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
          <h2 className="font-league text-xl font-semibold mb-4">
            Members{" "}
            <span className="text-xs align-baseline">
              ({filteredMembers.length})
            </span>
          </h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredMembers.map((member) => (
              <Link key={member.id} href={`/gbv/members/${member.id}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-3 text-center">
                    <MemberAvatar
                      name={member.name}
                      imageUrl={member.imageUrl}
                      memberId={member.id}
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
          <h2 className="font-league text-xl font-semibold mb-4">
            Albums{" "}
            <span className="text-xs align-baseline">
              ({filteredAlbums.length})
            </span>
          </h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredAlbums.map((album) => (
              <Link key={album.id} href={`/gbv/albums/${album.id}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-3">
                    {getAlbumImage(album) ? (
                      <GbvRemoteImage
                        src={getAlbumImage(album)}
                        alt={album.title}
                        width={200}
                        height={200}
                        className="w-full aspect-square rounded-lg object-cover mb-2"
                        cacheKey={`gbv-search-album:${album.id}`}
                        preferProxy
                      />
                    ) : (
                      <div className="w-full aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                        <Image
                          src="/chat-gbv-box.svg"
                          alt="GBV rune"
                          width={48}
                          height={48}
                          className="h-12 w-12 gbv-nav-icon"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold text-sm truncate">{album.title}</h3>
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
        </div>
      )}
    </div>
  );
}
