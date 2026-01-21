"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GbvTriviaPanel } from "@/components/gbv/gbv-trivia-card";
import {
  pollardSideProjects,
  type SideProject,
} from "../../lib/gbv-side-projects";

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

function MemberAvatar({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl?: string | null;
}) {
  if (!imageUrl) {
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
        src={imageUrl}
        alt={`${name} photo`}
        fill
        className="rounded-full object-cover"
      />
    </div>
  );
}

export function GbvDashboardContent() {
  const [artist, setArtist] = useState<ArtistData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const artistRes = await fetch(
          "/api/gbv/discogs?type=artist&include_member_images=true&member_image_limit=20",
        );

        if (!artistRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const artistData = await artistRes.json();
        setArtist(artistData);
      } catch (err) {
        setError("Failed to load data from Discogs");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const activeMembers = artist?.members?.filter((m) => m.active) || [];

  const stats = [
    { label: "Studio Albums", value: "32+" },
    { label: "Total Songs", value: "2,500+" },
    {
      label: "Band Members",
      value: artist?.members ? `${artist.members.length}+` : "30+",
    },
    { label: "Years Active", value: "40+" },
  ];

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

      {/* Daily Trivia */}
      <div className="mb-8">
        <GbvTriviaPanel />
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
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {activeMembers.length > 0
            ? activeMembers.slice(0, 5).map((member) => (
                <Link key={member.id} href={`/gbv/members/${member.id}`}>
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <MemberAvatar
                        name={member.name}
                        imageUrl={member.imageUrl}
                      />
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
                    <div className="w-16 h-16 rounded-full mb-3 mx-auto flex items-center justify-center">
                      <Image
                        src="/chat-gbv-box.svg"
                        alt="GBV rune"
                        width={32}
                        height={32}
                        className="h-8 w-8 gbv-nav-icon"
                        loading="eager"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Loading member...
                    </p>
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
