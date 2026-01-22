"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { GbvRemoteImage } from "@/components/gbv/gbv-remote-image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProxiedImageUrl } from "@/lib/gbv-utils";
import { Loader2, Users } from "lucide-react";

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
          fetch("/api/gbv/discogs?type=artist"),
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
    const raw = album.coverUrl || album.thumb || null;
    return getProxiedImageUrl(raw);
  };

  const getReleaseType = (format?: string | string[], releaseType?: string) => {
    if (!format) return "Album";
    const normalized = Array.isArray(format) ? format.join(" ") : format;
    if (normalized.toLowerCase().includes("single")) return "Single";
    if (releaseType === "release") return "Single";
    return "Album";
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
        <h1 className="font-league text-4xl font-semibold">Search Results</h1>
        <p className="text-muted-foreground text-sm">“{query}”</p>
      </div>

      {!hasResults && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No results found.
          </CardContent>
        </Card>
      )}

      {filteredMembers.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredMembers.map((member) => (
                <Link
                  key={member.id}
                  href={`/gbv/members/${member.id}`}
                  className="flex items-center gap-2 text-sm hover:text-foreground"
                >
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{member.name}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredAlbums.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Albums</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredAlbums.map((album) => (
                <Link key={album.id} href={`/gbv/albums/${album.id}`}>
                  <div className="flex flex-col gap-2">
                    {getAlbumImage(album) ? (
                      <GbvRemoteImage
                        src={getAlbumImage(album)}
                        alt={album.title}
                        width={200}
                        height={200}
                        className="w-full aspect-square rounded-lg object-cover"
                        cacheKey={`gbv-search-album:${album.id}`}
                        preferProxy
                      />
                    ) : (
                      <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <Image
                          src="/chat-gbv-box.svg"
                          alt="GBV rune"
                          width={40}
                          height={40}
                          className="h-10 w-10 gbv-nav-icon"
                        />
                      </div>
                    )}
                    <div className="text-sm">
                      <p className="font-medium truncate">{album.title}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{album.year}</span>
                        <span className="border border-border rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                            {getReleaseType(album.format, album.releaseType)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
