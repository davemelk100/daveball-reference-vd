"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GbvRemoteImage } from "@/components/amrep/amrep-remote-image";
import { getLocalMemberImage } from "@/lib/gbv-member-images";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { getAmrepArtistById } from "@/lib/amrep-artists-data";
import { amrepReleases } from "@/lib/amrep-releases-data";

interface Release {
  id: number;
  title: string;
  year: number;
  thumb: string;
  type: string;
  role: string;
}

interface ArtistDetail {
  id: number;
  name: string;
  profile?: string;
  images?: Array<{ uri: string; type: string }>;
  urls?: string[];
  realname?: string;
  groups?: Array<{
    id?: number;
    name: string;
    resource_url?: string;
    uri?: string;
    active?: boolean;
  }>;
}

const normalizeArtistName = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function GbvMemberDetailContent({ memberId }: { memberId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const [member, setMember] = useState<ArtistDetail | null>(null);
  const [releases, setReleases] = useState<Release[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commonsImageUrl, setCommonsImageUrl] = useState<string | null>(null);
  const localMemberImage = getLocalMemberImage(Number(memberId));

  useEffect(() => {
    let isActive = true;

    async function fetchMember() {
      setIsLoading(true);
      setError(null);

      if (isAmrep) {
        const artist = getAmrepArtistById(Number(memberId));
        if (!artist) {
          if (isActive) {
            setMember(null);
            setReleases([]);
            setError("Artist not found");
            setIsLoading(false);
          }
          return;
        }

        if (isActive) {
          setMember({
            id: artist.id,
            name: artist.name,
            profile: artist.description,
          });
        }

        const normalizedNames = artist.name
          .split("/")
          .map((part) => normalizeArtistName(part))
          .filter(Boolean);

        try {
          const res = await fetch("/api/amrep/discogs?type=releases&per_page=200");
          if (res.ok) {
            const data = await res.json();
            const releasesList = Array.isArray(data?.releases) ? data.releases : [];
            const matches = releasesList.filter((release: any) => {
              const releaseArtist = normalizeArtistName(release.artist || "");
              return normalizedNames.some((name) => releaseArtist.includes(name));
            });

            if (isActive) {
              setReleases(
                matches.map((release: any) => ({
                  id: release.id,
                  title: `${release.artist} — ${release.title}`,
                  year: release.year,
                  thumb: release.thumb || "",
                  type: "release",
                  role: Array.isArray(release.format)
                    ? release.format.join(", ")
                    : release.format || "Release",
                }))
              );
            }
          }
        } catch {
          const fallback = amrepReleases
            .filter((release) =>
              normalizeArtistName(release.artist).includes(
                normalizeArtistName(artist.name)
              )
            )
            .map((release) => ({
              id: release.id,
              title: `${release.artist} — ${release.title}`,
              year: release.year,
              thumb: "",
              type: "release",
              role: release.format,
            }));
          if (isActive) {
            setReleases(fallback);
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
        return;
      }

      try {
        const [memberRes, releasesRes] = await Promise.all([
          fetch(`https://api.discogs.com/artists/${memberId}`, {
            headers: { "User-Agent": "MajorLeagueNumbers/1.0" },
          }),
          fetch(
            `https://api.discogs.com/artists/${memberId}/releases?per_page=20`,
            {
              headers: { "User-Agent": "MajorLeagueNumbers/1.0" },
            },
          ),
        ]);

        if (!memberRes.ok) throw new Error("Failed to fetch member");

        const memberData = await memberRes.json();
        if (isActive) {
          setMember(memberData);
        }

        if (releasesRes.ok) {
          const releasesData = await releasesRes.json();
          const releasesList = releasesData.releases || [];
          if (isActive) {
            setReleases(releasesList);
          }
        }
      } catch (err) {
        if (isActive) {
          setError("Failed to load member details");
        }
        console.error(err);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    fetchMember();
    return () => {
      isActive = false;
    };
  }, [memberId, isAmrep]);

  useEffect(() => {
    if (!member?.name || isAmrep) return;
    let isActive = true;

    const fetchCommonsImage = async () => {
      try {
        const res = await fetch(
          `/api/gbv/commons-image?name=${encodeURIComponent(member.name)}`,
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
      <div className="container py-6">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Loading member...</p>
        </div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="container py-6">
        <Link href={`${site.basePath}/members`}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to {site.navLabels.members}
          </Button>
        </Link>
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            {error || "Member not found"}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <Link href={`${site.basePath}/members`}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to {site.navLabels.members}
        </Button>
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Member Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              {localMemberImage ? (
                <Image
                  src={localMemberImage}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full aspect-square rounded-lg object-cover mb-4"
                  priority
                />
              ) : commonsImageUrl ? (
                <GbvRemoteImage
                  src={commonsImageUrl}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full aspect-square rounded-lg object-cover mb-4"
                  cacheKey={`gbv-member-photo:${memberId}`}
                  preferProxy
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
              <h1 className="font-league mb-2">
                {member.name}
              </h1>
              {member.realname && member.realname !== member.name && (
                <p className="text-sm text-muted-foreground mb-4">
                  Real name: {member.realname}
                </p>
              )}
              {member.profile && (
                <p className="text-sm text-muted-foreground mb-4">
                  {member.profile}
                </p>
              )}
              {isAmrep && (
                <a
                  href="https://www.shoxop.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary hover:underline mb-4"
                >
                  Browse the AmRep catalog <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              )}
              {!isAmrep && member.urls && member.urls.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {member.urls.slice(0, 3).map((url, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-primary hover:underline"
                    >
                      External link <ExternalLink className="h-3 w-3 ml-1" />
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
              <CardTitle>Releases</CardTitle>
            </CardHeader>
            <CardContent>
              {releases.length > 0 ? (
                <div className="grid gap-2">
                  {releases.slice(0, 20).map((release) => (
                    <div
                      key={release.id}
                      className="flex items-center justify-between border-b border-border pb-2 last:border-0"
                    >
                      <div>
                        <p className="font-semibold text-sm">{release.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {release.role}
                        </p>
                      </div>
                      <Badge variant="outline">{release.year}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No releases found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
