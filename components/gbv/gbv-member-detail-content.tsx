"use client";

import { useState, useEffect } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import Image from "next/image";
import { GbvRemoteImage } from "@/components/gbv/gbv-remote-image";
import { getLocalMemberImage } from "@/lib/gbv-member-images";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { getAmrepArtistById } from "@/lib/amrep-artists-data";
import { useMemberImage } from "@/components/music-site/use-member-image";
import { MemberDetailLayout } from "@/components/music-site/member-detail-layout";
import { MemberDetailLeft } from "@/components/music-site/member-detail-left";
import { MemberDetailRight } from "@/components/music-site/member-detail-right";

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

export function GbvMemberDetailContent({ memberId }: { memberId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const [member, setMember] = useState<ArtistDetail | null>(null);
  const [releases, setReleases] = useState<Release[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (isAmrep) {
    const artist = getAmrepArtistById(Number(memberId));
    return (
      <MemberDetailLayout
        site={site}
        backHref={`${site.basePath}/members`}
        backLabel={site.navLabels.members}
        leftContent={
          <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
            <Image
              src={site.placeholderIconSrc}
              alt={`${site.shortName} logo`}
              width={48}
              height={48}
              className="w-1/2 h-1/2 gbv-nav-icon object-contain"
            />
          </div>
        }
        rightTitle="About"
        rightContent={
          <div>
            <h1 className="font-league mb-2">
              {artist?.name || "Artist"}
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              {artist?.description ||
                "Artist featured on the Amphetamine Reptile Records roster."}
            </p>
            <a
              href="https://www.shoxop.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              Browse the AmRep catalog <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        }
      />
    );
  }
  const localMemberImage = getLocalMemberImage(Number(memberId));
  const { resolvedImageUrl } = useMemberImage({
    siteId: site.id,
    memberName: member?.name,
    memberId,
    localImageUrl: localMemberImage,
    discogsImageUrl: null,
    fallbackImageUrl: null,
    skipRemoteLookup: false,
  });

  useEffect(() => {
    async function fetchMember() {
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
        setMember(memberData);

        if (releasesRes.ok) {
          const releasesData = await releasesRes.json();
          const releasesList = releasesData.releases || [];
          setReleases(releasesList);
        }
      } catch (err) {
        setError("Failed to load member details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMember();
  }, [memberId]);

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
      <MemberDetailLayout
        site={site}
        backHref={`${site.basePath}/members`}
        backLabel={site.navLabels.members}
        leftContent={
          <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
            <Image
              src="/chat-gbv-box.svg"
              alt="GBV rune"
              width={48}
              height={48}
              className="w-1/2 h-1/2 gbv-nav-icon object-contain"
            />
          </div>
        }
        rightTitle="Discography"
        rightContent={
          <p className="text-sm text-muted-foreground">
            {error || "Member not found"}
          </p>
        }
      />
    );
  }

  const externalLinks =
    member.urls?.slice(0, 3).map((url) => ({
      href: url,
      label: new URL(url).hostname.replace("www.", ""),
    })) ?? [];

  const leftContent = (
    <MemberDetailLeft
      image={
        resolvedImageUrl ? (
          <GbvRemoteImage
            src={resolvedImageUrl}
            alt={member.name}
            width={300}
            height={300}
            className="w-full aspect-square rounded-lg object-cover"
            cacheKey={`gbv-member-photo:${memberId}`}
            preferProxy
          />
        ) : (
          <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
            <Image
              src="/chat-gbv-box.svg"
              alt="GBV rune"
              width={48}
              height={48}
              className="w-1/2 h-1/2 gbv-nav-icon object-contain"
            />
          </div>
        )
      }
      name={member.name}
      realName={member.realname}
      profile={member.profile}
      profileClassName="line-clamp-6"
      links={externalLinks}
    />
  );

  const rightContent =
    member.groups && member.groups.length > 0 ? (
      <MemberDetailRight
        items={member.groups}
        emptyLabel="No discography found"
        containerClassName="grid gap-3 sm:grid-cols-2"
        renderItem={(group) => (
          <div
            key={group.id ?? group.name}
            className="flex items-center justify-between rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white hover:bg-white/20"
          >
            <span className="font-semibold">{group.name}</span>
            <span className="text-xs text-white/70">
              {group.active === false ? "Inactive" : "Active"}
            </span>
          </div>
        )}
      />
    ) : (
      <MemberDetailRight
        items={releases}
        emptyLabel="No discography found"
        containerClassName="grid gap-3 sm:grid-cols-2"
        renderItem={(release) => (
          <div
            key={`${release.id}-${release.title}-${release.year ?? "unknown"}`}
            className="flex items-center justify-between rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white"
          >
            <span className="font-semibold">{release.title}</span>
            <span className="text-xs text-white/70">{release.year ?? "—"}</span>
          </div>
        )}
      />
    );

  return (
    <MemberDetailLayout
      site={site}
      backHref={`${site.basePath}/members`}
      backLabel={site.navLabels.members}
      leftContent={leftContent}
      rightTitle="Discography"
      rightContent={rightContent}
    />
  );
}
