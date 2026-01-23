"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getLocalMemberImage } from "@/lib/gbv-member-images";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { amrepArtists } from "@/lib/amrep-artists-data";

interface Member {
  id: number;
  name: string;
  active: boolean;
  imageUrl?: string | null;
}

const MEMBER_IMAGE_FALLBACKS: Record<string, string> = {
  "mark shue":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FSpecial%3AFilePath%2FMark%2520Shue%2520GARP%2520music%2520festival%25202016.jpg",
  cows:
    "/api/gbv/image-proxy?url=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fpeel%2Fimages%2F0%2F02%2FCows.jpg%2Frevision%2Flatest%3Fcb%3D20230612102727",
  hammerhead:
    "/api/gbv/image-proxy?url=https%3A%2F%2Fhpr1.com%2Fimages%2Fuploads%2Farticle_images%2F277%2Fhammerhead__social.png",
};

const MEMBER_IMAGE_SKIP: Record<string, true> = {
  cows: true,
  hammerhead: true,
  gaunt: true,
};

function MemberAvatar({
  name,
  imageUrl,
  memberId,
  fallbackIconSrc,
  cacheKeyPrefix,
  skipRemoteLookup,
}: {
  name: string;
  imageUrl?: string | null;
  memberId?: number;
  fallbackIconSrc: string;
  cacheKeyPrefix: string;
  skipRemoteLookup?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const [resolvedImageUrl, setResolvedImageUrl] = useState<string | null>(null);
  const [lookupAttempted, setLookupAttempted] = useState(false);
  const normalizedImageUrl = imageUrl?.replace(/^http:/, "https:") || null;
  const localImageUrl = getLocalMemberImage(memberId);
  const fallbackImageUrl = MEMBER_IMAGE_FALLBACKS[name.toLowerCase()] || null;

  useEffect(() => {
    if (localImageUrl && !hasError) {
      setResolvedImageUrl(localImageUrl);
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

    if (skipRemoteLookup || MEMBER_IMAGE_SKIP[name.toLowerCase()]) return;

    if (lookupAttempted) return;

    const cacheKey = `${cacheKeyPrefix}-member-image:${name.toLowerCase()}`;
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
    fallbackImageUrl,
    hasError,
    localImageUrl,
    lookupAttempted,
    name,
    normalizedImageUrl,
  ]);

  if (!resolvedImageUrl || hasError) {
    return (
      <div className="w-full aspect-square rounded-lg mb-2 mx-auto flex items-center justify-center bg-muted">
        <Image
          src={fallbackIconSrc}
          alt="Artist placeholder"
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

export function GbvMembersContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  useEffect(() => {
    if (isAmrep) {
      setMembers(
        amrepArtists.map((artist) => ({
          id: artist.id,
          name: artist.name,
          active: artist.active,
          imageUrl: null,
        }))
      );
      setIsLoading(false);
      return;
    }

    async function fetchMembers() {
      try {
        const res = await fetch(
          "/api/gbv/discogs?type=artist&include_member_images=true&member_image_limit=60",
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
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
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMembers();
  }, [isAmrep]);

  const filteredMembers = members.filter((member) => {
    if (filter === "active") return member.active;
    if (filter === "inactive") return !member.active;
    return true;
  });

  const activeCount = members.filter((m) => m.active).length;
  const inactiveCount = members.filter((m) => !m.active).length;

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Loading {isAmrep ? "artists" : "members"}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="font-league">
          {isAmrep ? "Artists" : "Band Members"}{" "}
          <span className="align-baseline">({filteredMembers.length})</span>
        </h1>
        <Tabs
          value={filter}
          onValueChange={(v) => setFilter(v as typeof filter)}
        >
          <TabsList className="text-black">
            <TabsTrigger value="all" className="text-black">
              All <span className="align-baseline">({members.length})</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="text-black">
              Active <span className="align-baseline">({activeCount})</span>
            </TabsTrigger>
            <TabsTrigger value="inactive" className="text-black">
              Past <span className="align-baseline">({inactiveCount})</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredMembers.map((member) => (
          <Link key={member.id} href={`${site.basePath}/members/${member.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-3 text-center">
                <MemberAvatar
                  name={member.name}
                  imageUrl={member.imageUrl}
                  memberId={member.id}
                  fallbackIconSrc={site.placeholderIconSrc}
                  cacheKeyPrefix={site.id}
                  skipRemoteLookup={false}
                />
                <h3 className="font-semibold text-sm">{member.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No members found
        </div>
      )}
    </div>
  );
}
