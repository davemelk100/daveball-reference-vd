"use client";

import { useMemo, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2, ExternalLink } from "lucide-react";
import { AmrepRemoteImage } from "@/components/amrep/amrep-remote-image";
import { getLocalMemberImage } from "@/lib/gbv-member-images";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { getAmrepArtistById } from "@/lib/amrep-artists-data";
import { amrepReleases } from "@/lib/amrep-releases-data";
import {
  AMREP_MEMBER_IMAGE_FALLBACKS,
  AMREP_MEMBER_IMAGE_SKIP,
} from "@/lib/amrep-member-images";
import { useMemberImage } from "@/components/music-site/use-member-image";
import { MemberDetailLayout } from "@/components/music-site/member-detail-layout";
import { MemberDetailLeft } from "@/components/music-site/member-detail-left";
import { MemberDetailRight } from "@/components/music-site/member-detail-right";

interface Release {
  id: number;
  title: string;
  year?: number | null;
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
  const localMemberImage = getLocalMemberImage(Number(memberId));
  const amrepFallbackImage =
    isAmrep && member?.name
      ? AMREP_MEMBER_IMAGE_FALLBACKS[member.name.toLowerCase()] || null
      : null;
  const skipRemoteLookup =
    isAmrep && member?.name
      ? AMREP_MEMBER_IMAGE_SKIP[member.name.toLowerCase()] || false
      : false;
  const memberImageFromDiscogs = useMemo(() => {
    const images = member?.images || [];
    const primary = images.find((image) => image.type === "primary") || images[0];
    const url = primary?.uri || null;
    return url ? url.replace(/^http:/, "https:") : null;
  }, [member?.images]);

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
                  title: release.artist ? `${release.artist} — ${release.title}` : release.title,
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
              title: release.artist ? `${release.artist} — ${release.title}` : release.title,
              year: release.year,
              thumb: "",
              type: "release",
              role: release.format || "Release",
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

  const { resolvedImageUrl } = useMemberImage({
    siteId: site.id,
    memberName: member?.name,
    memberId,
    localImageUrl: localMemberImage,
    discogsImageUrl: memberImageFromDiscogs,
    fallbackImageUrl: amrepFallbackImage,
    skipRemoteLookup,
  });

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
            <img
              src={site.placeholderIconSrc}
              alt={`${site.shortName} logo`}
              className="w-auto h-auto max-w-1/2 max-h-1/2 gbv-nav-icon object-contain"
            />
          </div>
        }
        rightTitle="Releases"
        rightContent={
          <p className="text-sm text-muted-foreground">
            {error || "Member not found"}
          </p>
        }
      />
    );
  }

  const externalLinks =
    !isAmrep && member.urls
      ? member.urls.slice(0, 3).map((url) => ({
          href: url,
          label: "External link",
        }))
      : [];

  const leftContent = (
    <MemberDetailLeft
      image={
        resolvedImageUrl ? (
          <AmrepRemoteImage
            src={resolvedImageUrl}
            alt={member.name}
            width={300}
            height={300}
            className="w-full aspect-square object-contain"
            fallbackSrc={site.placeholderIconSrc}
            cacheKey={`${site.id}-member-image:${member.name.toLowerCase()}`}
            preferProxy
          />
        ) : (
          <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
            <img
              src={site.placeholderIconSrc}
              alt={`${site.shortName} logo`}
              className="w-auto h-auto max-w-1/2 max-h-1/2 gbv-nav-icon object-contain"
            />
          </div>
        )
      }
      name={member.name}
      realName={member.realname}
      profile={member.profile}
      links={externalLinks}
    >
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
    </MemberDetailLeft>
  );

  const rightContent = (
    <MemberDetailRight
      items={releases.slice(0, 20)}
      emptyLabel="No releases found."
      emptyClassName="text-sm"
      containerClassName="grid gap-2"
      renderItem={(release) => (
        <div
          key={release.id}
          className="flex items-center justify-between border-b border-border pb-2 last:border-0"
        >
          <div>
            <p className="font-semibold text-sm">{release.title}</p>
            <p className="text-xs text-muted-foreground">{release.role}</p>
          </div>
          <Badge variant="outline">{release.year ?? "—"}</Badge>
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
      rightTitle="Releases"
      rightContent={rightContent}
    />
  );
}
