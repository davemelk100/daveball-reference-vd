"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GbvTriviaPanel } from "@/components/gbv/gbv-trivia-card";
import { GbvRecordOfDayCard } from "@/components/gbv/gbv-record-of-day-card";
import { getLocalMemberImage } from "@/lib/gbv-member-images";
import {
  pollardSideProjects,
  type SideProject,
} from "../../lib/gbv-side-projects";

interface Member {
  id?: number;
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

const MEMBER_IMAGE_FALLBACKS: Record<string, string> = {
  "mark shue":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FSpecial%3AFilePath%2FMark%2520Shue%2520GARP%2520music%2520festival%25202016.jpg",
};

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
  const fallbackImageUrl =
    MEMBER_IMAGE_FALLBACKS[name.toLowerCase()] || null;

  useEffect(() => {
    const localImage = localImageUrl;
    if (localImage && !hasError) {
      setResolvedImageUrl(localImage);
      return;
    }

    if (normalizedImageUrl && !hasError) {
      setResolvedImageUrl(normalizedImageUrl);
      return;
    }

    if (fallbackImageUrl && !lookupAttempted) {
      setResolvedImageUrl(fallbackImageUrl);
      setLookupAttempted(true);
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
  }, [
    fallbackImageUrl,
    hasError,
    lookupAttempted,
    localImageUrl,
    name,
    normalizedImageUrl,
  ]);

  if (!resolvedImageUrl || hasError) {
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
        src={resolvedImageUrl}
        alt={`${name} photo`}
        fill
        sizes="64px"
        className="rounded-full object-cover"
        onError={() => setHasError(true)}
        unoptimized
      />
    </div>
  );
}

export function GbvDashboardContent() {
  const [artist, setArtist] = useState<ArtistData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cacheKey = "gbv-dashboard-artist";
    const cacheTtlMs = 24 * 60 * 60 * 1000;
    let hasCached = false;

    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as {
          timestamp: number;
          data: ArtistData;
        };
        if (parsed?.data && Date.now() - parsed.timestamp < cacheTtlMs) {
          setArtist(parsed.data);
          setIsLoading(false);
          hasCached = true;
        }
      }
    } catch {
      // ignore cache errors
    }

    async function fetchData() {
      try {
        const artistRes = await fetch(
          "/api/gbv/discogs?type=artist&include_member_images=true&member_image_limit=20",
        );

        if (!artistRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const artistData = await artistRes.json();
        if (Array.isArray(artistData?.members) && artistData.members.length <= 1) {
          const fallbackRes = await fetch("/api/gbv/discogs?type=artist");
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            if (Array.isArray(fallbackData?.members)) {
              artistData.members = fallbackData.members;
            }
          }
        }
        setArtist(artistData);
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: Date.now(), data: artistData })
          );
        } catch {
          // ignore cache errors
        }
      } catch (err) {
        if (!hasCached) {
          setError("Failed to load data from Discogs");
        }
        console.error(err);
      } finally {
        if (!hasCached) {
          setIsLoading(false);
        }
      }
    }

    fetchData();
  }, []);

  const activeMembers = artist?.members?.filter((m) => m.active) || [];
  const fallbackMembers: Member[] = [
    { name: "Robert Pollard", active: true },
    { name: "Doug Gillard", active: true },
    { name: "Kevin March", active: true },
    { name: "Mark Shue", active: true },
    { name: "Bobby Bare Jr.", active: true },
  ];
  const membersToShow =
    activeMembers.length > 0 ? activeMembers.slice(0, 5) : fallbackMembers;

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
      {/* Daily Trivia + Record of the Day */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <GbvTriviaPanel />
        <GbvRecordOfDayCard />
      </div>

      {/* Error Message */}
      {error && (
        <Card className="mb-8 border-destructive">
          <CardContent className="p-4 text-destructive">{error}</CardContent>
        </Card>
      )}

      {/* Band Members */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-league text-4xl font-semibold">
            Current Members
          </h2>
          <Link
            href="/gbv/members"
            className="uppercase text-sm text-muted-foreground hover:text-foreground"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {membersToShow.map((member, index) => {
            const card = (
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <MemberAvatar
                    name={member.name}
                    imageUrl={member.imageUrl}
                    memberId={member.id}
                  />
                  <h3 className="font-semibold">{member.name}</h3>
                  <Badge variant="outline" className="mt-1">
                    Active
                  </Badge>
                </CardContent>
              </Card>
            );

            if (member.id) {
              return (
                <Link key={member.id} href={`/gbv/members/${member.id}`}>
                  {card}
                </Link>
              );
            }

            return (
              <div key={`${member.name}-${index}`} className="cursor-default">
                {card}
              </div>
            );
          })}
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
            className="uppercase text-sm text-muted-foreground hover:text-foreground"
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
