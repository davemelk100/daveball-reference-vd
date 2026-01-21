"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Music, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GbvTriviaPanel } from "@/components/gbv/gbv-trivia-card";
import { pollardSideProjects, type SideProject } from "../../lib/gbv-side-projects";
import { getReleaseType, getProxiedImageUrl } from "@/lib/gbv-utils";

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
  imageUrl?: string | null;
}

interface ArtistData {
  id: number;
  name: string;
  profile: string;
  members?: Member[];
}

function MemberAvatar({ name, imageUrl }: { name: string; imageUrl?: string | null }) {
  const proxiedUrl = getProxiedImageUrl(imageUrl);

  if (!proxiedUrl) {
    return (
      <div className="w-16 h-16 bg-muted rounded-full mb-3 flex items-center justify-center">
        <Image
          src="/chat-gbv-box.svg"
          alt="GBV rune"
          width={32}
          height={32}
          className="h-8 w-8"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className="w-16 h-16 mb-3 relative">
      <Image
        src={proxiedUrl}
        alt={`${name} photo`}
        fill
        className="rounded-full object-cover"
        unoptimized
      />
    </div>
  );
}

export function GbvDashboardContent() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artist, setArtist] = useState<ArtistData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [albumsRes, artistRes] = await Promise.all([
          fetch("/api/gbv/discogs?type=albums&max_pages=1"),
          fetch("/api/gbv/discogs?type=artist&include_member_images=true&member_image_limit=20"),
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
            primaryType: getReleaseType(a.format, a.releaseType),
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

  // Get the best available image for an album (proxied to avoid third-party cookies)
  const getAlbumImage = (album: Album): string | null => {
    const url = album.coverUrl || album.thumb || null;
    return getProxiedImageUrl(url);
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
        {/* Stats Row Skeleton */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-8 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-1" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trivia & Featured Skeleton */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-10 w-32 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        </div>

        {/* Discography Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-3">
                  <Skeleton className="w-full aspect-square rounded-lg mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-3 w-12" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Members Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="w-16 h-16 rounded-full mb-3" />
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-5 w-14" />
                </CardContent>
              </Card>
            ))}
          </div>
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

      {/* Daily Trivia & Featured */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <GbvTriviaPanel />

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
                      priority
                      loading="eager"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                      <Image
                        src="/chat-gbv-box.svg"
                        alt="GBV rune"
                        width={32}
                        height={32}
                        className="h-8 w-8 gbv-nav-icon"
                        loading="eager"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{featuredAlbums[0].title}</h3>
                    <p className="text-muted-foreground">{featuredAlbums[0].year}</p>
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
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-league text-4xl font-semibold">Discography</h2>
          <Link href="/gbv/albums" className="text-sm text-muted-foreground hover:text-foreground">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {featuredAlbums.length > 0
            ? featuredAlbums.map((album, index) => (
                <Link key={album.id} href={`/gbv/albums/${album.id}`}>
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                    <CardContent className="p-3">
                      {getAlbumImage(album) ? (
                        <Image
                          src={getAlbumImage(album)!}
                          alt={album.title}
                          width={200}
                          height={200}
                          className="w-full aspect-square rounded-lg object-cover mb-2"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                          unoptimized
                          priority={index === 0}
                          loading={index < 6 ? "eager" : "lazy"}
                        />
                      ) : (
                        <div className="w-full aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                          <Image
                            src="/chat-gbv-box.svg"
                            alt="GBV rune"
                            width={48}
                            height={48}
                            className="h-12 w-12 gbv-nav-icon"
                            loading="eager"
                          />
                        </div>
                      )}
                      <h3 className="font-semibold truncate">{album.title}</h3>
                      <p className="text-sm text-muted-foreground">{album.year}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4 text-center">
                    <div className="w-full aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <Image
                        src="/chat-gbv-box.svg"
                        alt="GBV rune"
                        width={48}
                        height={48}
                        className="h-12 w-12 gbv-nav-icon"
                        loading="eager"
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
        <div className="flex items-center gap-4 mb-4">
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
                      <MemberAvatar name={member.name} imageUrl={member.imageUrl} />
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
                        src="/chat-gbv-box.svg"
                        alt="GBV rune"
                        width={32}
                        height={32}
                        className="h-8 w-8 gbv-nav-icon"
                        loading="eager"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Loading member...</p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>

      {/* Robert Pollard Side Projects */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-league text-4xl font-semibold">
            Robert Pollard Side Projects
          </h2>
          <Link
            href="/gbv/side-projects"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {pollardSideProjects.slice(0, 3).map((project: SideProject) => (
            <Card key={project.name} className="h-full">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.years}</p>
                <p className="text-sm mt-2">{project.description}</p>
                {project.discographyUrl && (
                  <a
                    href={project.discographyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm underline underline-offset-4 mt-3 inline-block"
                  >
                    View discography
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
