"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Release {
  id: number;
  title: string;
  year: number;
  thumb: string;
  type: string;
  role: string;
  coverUrl?: string | null;
}

interface ArtistDetail {
  id: number;
  name: string;
  profile?: string;
  images?: Array<{ uri: string; type: string }>;
  urls?: string[];
  realname?: string;
}

export function GbvMemberDetailContent({ memberId }: { memberId: string }) {
  const [member, setMember] = useState<ArtistDetail | null>(null);
  const [releases, setReleases] = useState<Release[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commonsImageUrl, setCommonsImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMember() {
      try {
        const [memberRes, releasesRes] = await Promise.all([
          fetch(`https://api.discogs.com/artists/${memberId}`, {
            headers: { "User-Agent": "MajorLeagueNumbers/1.0" },
          }),
          fetch(`https://api.discogs.com/artists/${memberId}/releases?per_page=20`, {
            headers: { "User-Agent": "MajorLeagueNumbers/1.0" },
          }),
        ]);

        if (!memberRes.ok) throw new Error("Failed to fetch member");

        const memberData = await memberRes.json();
        setMember(memberData);

        if (releasesRes.ok) {
          const releasesData = await releasesRes.json();
          const releasesList = releasesData.releases || [];
          setReleases(releasesList);

          // Fetch cover art for releases
          if (releasesList.length > 0) {
            fetchCoverArt(releasesList);
          }
        }
      } catch (err) {
        setError("Failed to load member details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchCoverArt(releasesToFetch: Release[]) {
      try {
        const response = await fetch("/api/gbv/cover-art", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            albums: releasesToFetch.map((r) => ({
              title: r.title,
              year: r.year,
            })),
          }),
        });

        if (!response.ok) return;

        const data = await response.json();
        const coverMap = new Map<string, string | null>();

        for (const result of data.results || []) {
          coverMap.set(result.title, result.coverUrl);
        }

        setReleases((prev) =>
          prev.map((release) => ({
            ...release,
            coverUrl: coverMap.has(release.title)
              ? coverMap.get(release.title)
              : release.coverUrl,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch cover art:", err);
      }
    }

    fetchMember();
  }, [memberId]);

  useEffect(() => {
    if (!member?.name) return;
    let isActive = true;

    const fetchCommonsImage = async () => {
      try {
        const res = await fetch(
          `/api/gbv/commons-image?name=${encodeURIComponent(member.name)}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (isActive) {
          setCommonsImageUrl(data.imageUrl || null);
        }
      } catch {
        if (isActive) {
          setCommonsImageUrl(null);
        }
      }
    };

    fetchCommonsImage();
    return () => {
      isActive = false;
    };
  }, [member?.name]);

  if (isLoading) {
    return (
      <main className="container py-6">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Loading member...</p>
        </div>
      </main>
    );
  }

  if (error || !member) {
    return (
      <main className="container py-6">
        <Link href="/gbv/members">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Members
          </Button>
        </Link>
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            {error || "Member not found"}
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="container py-6">
      <Link href="/gbv/members">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Members
        </Button>
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Member Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              {commonsImageUrl ? (
                <Image
                  src={commonsImageUrl}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full aspect-square rounded-lg object-cover mb-4"
                  unoptimized
                />
              ) : (
                <div className="w-full aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src="/chat-gbv-box.svg"
                    alt="GBV rune"
                    width={96}
                    height={96}
                    className="h-24 w-24 gbv-nav-icon"
                  />
                </div>
              )}
              <h1 className="font-league text-2xl font-semibold mb-2">{member.name}</h1>
              {member.realname && member.realname !== member.name && (
                <p className="text-sm text-muted-foreground mb-4">
                  Real name: {member.realname}
                </p>
              )}

              {member.profile && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-6">
                  {member.profile}
                </p>
              )}

              {member.urls && member.urls.length > 0 && (
                <div className="space-y-2">
                  {member.urls.slice(0, 3).map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {new URL(url).hostname.replace("www.", "")}
                    </a>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Releases */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Discography</CardTitle>
            </CardHeader>
            <CardContent>
              {releases.length > 0 ? (
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                  {releases.map((release) => (
                    <div
                      key={`${release.id}-${release.title}-${release.year ?? "unknown"}`}
                      className="text-center"
                    >
                      {(release.coverUrl || release.thumb) ? (
                        <Image
                          src={release.coverUrl || release.thumb}
                          alt={release.title}
                          width={100}
                          height={100}
                          className="w-full aspect-square rounded object-cover mb-2"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full aspect-square bg-muted rounded mb-2 flex items-center justify-center">
                          <Image
                            src="/chat-gbv-box.svg"
                            alt="GBV rune"
                            width={32}
                            height={32}
                            className="h-8 w-8 gbv-nav-icon"
                          />
                        </div>
                      )}
                      <p className="text-xs font-medium truncate">{release.title}</p>
                      <p className="text-xs text-muted-foreground">{release.year}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No releases found</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
