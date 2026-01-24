"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { amrepArtists } from "@/lib/amrep-artists-data";
import {
  AMREP_MEMBER_IMAGE_FALLBACKS,
  AMREP_MEMBER_IMAGE_SKIP,
} from "@/lib/amrep-member-images";
import { MemberAvatar } from "@/components/music-site/member-avatar";
import { MembersControls } from "@/components/music-site/members-controls";

interface Member {
  id: number;
  name: string;
  active: boolean;
  imageUrl?: string | null;
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
        })),
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
      <MembersControls
        site={site}
        isAmrep={isAmrep}
        displayCount={filteredMembers.length}
        totalCount={members.length}
        activeCount={activeCount}
        inactiveCount={inactiveCount}
        filter={filter}
        onFilterChange={setFilter}
      />

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
                  fallbackImages={AMREP_MEMBER_IMAGE_FALLBACKS}
                  skipImages={AMREP_MEMBER_IMAGE_SKIP}
                  fit="contain"
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
