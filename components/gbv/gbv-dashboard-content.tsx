"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Music, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Album {
  id: number;
  title: string;
  year: number;
  thumb: string;
  mainRelease?: number;
  coverUrl?: string | null;
  format?: string | string[];
  releaseType?: string;
}

interface Member {
  id: number;
  name: string;
  active: boolean;
}

interface ArtistData {
  id: number;
  name: string;
  profile: string;
  members?: Member[];
}

function getPrimaryType(format?: string | string[], releaseType?: string) {
  if (!format && releaseType !== "release") return "Album";
  const normalized = Array.isArray(format) ? format.join(" ") : format || "";
  if (normalized.toLowerCase().includes("single")) return "Single";
  if (releaseType === "release") return "Single";
  return "Album";
}

function MemberAvatar({ name }: { name: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const fetchImage = async () => {
      try {
        const res = await fetch(
          `/api/gbv/commons-image?name=${encodeURIComponent(name)}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (isActive) {
          setImageUrl(data.imageUrl || null);
        }
      } catch {
        if (isActive) {
          setImageUrl(null);
        }
      }
    };

    fetchImage();
    return () => {
      isActive = false;
    };
  }, [name]);

  if (!imageUrl) {
    return (
      <div className="w-16 h-16 bg-muted rounded-full mb-3 flex items-center justify-center">
        <Image
          src="/gbv-rune.svg"
          alt="GBV rune"
          width={32}
          height={32}
          className="h-8 w-8"
        />
      </div>
    );
  }

  return (
    <div className="w-16 h-16 mb-3 relative">
      <Image
        src={imageUrl}
        alt={`${name} photo`}
        fill
        className="rounded-full object-cover"
      />
    </div>
  );
}

const recentFacts = [
  "GBV has released over 100 albums across all projects",
  "Robert Pollard has written over 2,500 songs",
  "The band was formed in Dayton, Ohio in 1983",
  "Bee Thousand was recorded for under $500",
  "Alien Lanes contains 28 songs in just 41 minutes",
  "The band broke up in 2004, reunited in 2010",
  "Robert Pollard was a 4th grade teacher before GBV took off",
  "The classic lineup recorded in Pollard's basement",
];

export function GbvDashboardContent() {
  const [factIndex, setFactIndex] = useState(0);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artist, setArtist] = useState<ArtistData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFactIndex(Math.floor(Math.random() * recentFacts.length));

    async function fetchData() {
      try {
        const [albumsRes, artistRes] = await Promise.all([
          fetch("/api/gbv/discogs?type=albums"),
          fetch("/api/gbv/discogs?type=artist"),
        ]);

        if (!albumsRes.ok || !artistRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const albumsData = await albumsRes.json();
        const artistData = await artistRes.json();

        const albumsList: Album[] = albumsData.albums || [];
        setAlbums(albumsList);
        setArtist(artistData);

        // Fetch cover art for the first 8 albums
        if (albumsList.length > 0) {
          fetchCoverArt(albumsList.slice(0, 8));
        }
      } catch (err) {
        setError("Failed to load data from Discogs");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  async function fetchCoverArt(albumsToFetch: Album[]) {
    try {
      const response = await fetch("/api/gbv/cover-art", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          albums: albumsToFetch.map((a) => ({
            title: a.title,
            year: a.year,
            primaryType: getPrimaryType(a.format, a.releaseType),
          })),
        }),
      });

      if (!response.ok) return;

      const data = await response.json();
      const coverMap = new Map<string, string | null>();

      for (const result of data.results || []) {
        coverMap.set(result.title, result.coverUrl);
      }

      setAlbums((prev) =>
        prev.map((album) => ({
          ...album,
          coverUrl: coverMap.has(album.title) ? coverMap.get(album.title) : album.coverUrl,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch cover art:", err);
    }
  }

  const featuredAlbums = albums.slice(0, 8);
  const activeMembers = artist?.members?.filter((m) => m.active) || [];
  const albumCount = albums.length;

  const stats = [
    { label: "Studio Albums", value: albumCount > 0 ? `${albumCount}+` : "32+" },
    { label: "Total Songs", value: "2,500+" },
    { label: "Band Members", value: artist?.members ? `${artist.members.length}+` : "30+" },
    { label: "Years Active", value: "40+" },
  ];

  // Get the best available image for an album
  const getAlbumImage = (album: Album): string | null => {
    return album.coverUrl || album.thumb || null;
  };

  const getReleaseType = (format?: string | string[], releaseType?: string) => {
    if (!format) return "Album";
    const normalized = Array.isArray(format) ? format.join(" ") : format;
    if (normalized.toLowerCase().includes("single")) return "Single";
    if (releaseType === "release") return "Single";
    return "Album";
  };

  if (isLoading) {
    return (
      <main className="container py-2">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Loading GBV data...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-2">
      {/* Stats Row */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-8 mt-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily Fact & Featured */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Daily GBV Fact */}
        <Card>
          <CardHeader>
            <CardTitle className="font-league text-2xl">Daily GBV Fact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{recentFacts[factIndex]}</p>
          </CardContent>
        </Card>

        {/* Featured Album */}
        <Card>
          <CardHeader>
            <CardTitle className="font-league text-2xl">Album Spotlight</CardTitle>
          </CardHeader>
          <CardContent>
            {featuredAlbums[0] ? (
              <Link href={`/gbv/albums/${featuredAlbums[0].id}`}>
                <div className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                  {getAlbumImage(featuredAlbums[0]) ? (
                    <Image
                      src={getAlbumImage(featuredAlbums[0])!}
                      alt={featuredAlbums[0].title}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                      <Image
                        src="/gbv-rune.svg"
                        alt="GBV rune"
                        width={32}
                        height={32}
                        className="h-8 w-8"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{featuredAlbums[0].title}</h3>
                    <p className="text-muted-foreground">{featuredAlbums[0].year}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">
                        {featuredAlbums[0].year < 1998
                          ? "Classic Era"
                          : featuredAlbums[0].year < 2005
                            ? "TVT Era"
                            : "Reunion Era"}
                      </Badge>
                      <Badge variant="outline">
                        {getReleaseType(featuredAlbums[0].format, featuredAlbums[0].releaseType)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <Skeleton className="h-20 w-full" />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Error Message */}
      {error && (
        <Card className="mb-8 border-destructive">
          <CardContent className="p-4 text-destructive">{error}</CardContent>
        </Card>
      )}

      {/* Albums from Discogs */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-league text-4xl font-semibold">Discography</h2>
          <Link href="/gbv/albums" className="text-sm text-muted-foreground hover:text-foreground">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {featuredAlbums.length > 0
            ? featuredAlbums.map((album) => (
                <Link key={album.id} href={`/gbv/albums/${album.id}`}>
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                    <CardContent className="p-4">
                      {getAlbumImage(album) ? (
                        <Image
                          src={getAlbumImage(album)!}
                          alt={album.title}
                          width={300}
                          height={300}
                          className="w-full aspect-square rounded-lg object-cover mb-3"
                          unoptimized
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                          <Image
                            src="/gbv-rune.svg"
                            alt="GBV rune"
                            width={48}
                            height={48}
                            className="h-12 w-12"
                          />
                        </div>
                      )}
                      <h3 className="font-semibold truncate">{album.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{album.year}</span>
                        <Badge variant="outline">
                          {getReleaseType(album.format, album.releaseType)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4 text-center">
                    <div className="w-full aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <Image
                        src="/gbv-rune.svg"
                        alt="GBV rune"
                        width={48}
                        height={48}
                        className="h-12 w-12"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Loading release...</p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>

      {/* Band Members */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-league text-4xl font-semibold">Current Members</h2>
          <Link href="/gbv/members" className="text-sm text-muted-foreground hover:text-foreground">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {activeMembers.length > 0
            ? activeMembers.slice(0, 5).map((member) => (
                <Link key={member.id} href={`/gbv/members/${member.id}`}>
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <MemberAvatar name={member.name} />
                      <h3 className="font-semibold">{member.name}</h3>
                      <Badge variant="outline" className="mt-1">
                        Active
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full mb-3 mx-auto flex items-center justify-center">
                      <Image
                        src="/gbv-rune.svg"
                        alt="GBV rune"
                        width={32}
                        height={32}
                        className="h-8 w-8"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Loading member...</p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </main>
  );
}
