"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Member {
  id: number;
  name: string;
  active: boolean;
  imageUrl?: string | null;
}

const MEMBER_IMAGE_FALLBACKS: Record<string, string> = {
  "mark shue":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FSpecial%3AFilePath%2FMark%2520Shue%2520GARP%2520music%2520festival%25202016.jpg",
};

function MemberAvatar({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl?: string | null;
}) {
  const [hasError, setHasError] = useState(false);
  const [resolvedImageUrl, setResolvedImageUrl] = useState<string | null>(null);
  const [lookupAttempted, setLookupAttempted] = useState(false);
  const normalizedImageUrl = imageUrl?.replace(/^http:/, "https:") || null;
  const fallbackImageUrl =
    MEMBER_IMAGE_FALLBACKS[name.toLowerCase()] || null;

  useEffect(() => {
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
  }, [fallbackImageUrl, hasError, lookupAttempted, name, normalizedImageUrl]);

  if (!resolvedImageUrl || hasError) {
    return (
      <div className="w-16 h-16 rounded-full mb-3 mx-auto flex items-center justify-center">
        <Image
          src="/chat-gbv-box.svg"
          alt="GBV rune"
          width={32}
          height={32}
          className="h-8 w-8 gbv-nav-icon"
        />
      </div>
    );
  }

  return (
    <div className="w-16 h-16 mb-3 mx-auto relative">
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

export function GbvMembersContent() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  useEffect(() => {
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
  }, []);

  const filteredMembers = members.filter((member) => {
    if (filter === "active") return member.active;
    if (filter === "inactive") return !member.active;
    return true;
  });

  const activeCount = members.filter((m) => m.active).length;
  const inactiveCount = members.filter((m) => !m.active).length;

  if (isLoading) {
    return (
      <main className="container py-6">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Loading members...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="font-league text-4xl font-semibold">
          Band Members ({filteredMembers.length})
        </h1>
        <Tabs
          value={filter}
          onValueChange={(v) => setFilter(v as typeof filter)}
        >
          <TabsList className="text-black">
            <TabsTrigger value="all" className="text-black">
              All ({members.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="text-black">
              Active ({activeCount})
            </TabsTrigger>
            <TabsTrigger value="inactive" className="text-black">
              Past ({inactiveCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredMembers.map((member) => (
          <Link key={member.id} href={`/gbv/members/${member.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-4 text-center">
                <MemberAvatar name={member.name} imageUrl={member.imageUrl} />
                <h3 className="font-semibold text-sm">{member.name}</h3>
                <Badge
                  variant={member.active ? "default" : "secondary"}
                  className="mt-2"
                >
                  {member.active ? "Active" : "Past"}
                </Badge>
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
    </main>
  );
}
