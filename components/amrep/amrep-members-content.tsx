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
  "calvin krime":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fwww.fungusboy.net%2Fcalvin-krime-4.jpg",
  chokebore:
    "/api/gbv/image-proxy?url=https%3A%2F%2Fmagnetmagazine.com%2Fwp-content%2Fuploads%2F2009%2F03%2Fchokebore545.jpg",
  godheadsilo:
    "/api/gbv/image-proxy?url=https%3A%2F%2Fsubpop-img.s3.amazonaws.com%2Fasset%2Fartist_images%2Fattachments%2F000%2F004%2F023%2Fmax_960%2F2599.jpg%3F1389019541",
  feedtime:
    "/api/gbv/image-proxy?url=https%3A%2F%2Fblogger.googleusercontent.com%2Fimg%2Fb%2FR29vZ2xl%2FAVvXsEifkiuREakx2nobgg6oAbn48dOH7pt08shcvMHNlQ4SlNxiVuAxFScUcSz_jkyXs1yYqIcbmexTrvwT_3Wr_irdui8VrGi-MwsrEH1Lf-6t8yJu6uuRyr8-4DiDtk4N-fRQIFDeh2oOaXgcLU7ZdT32LG3YVwmZl-GbbwdtuRUTRkhZIEjC_XYAqtncnFU%2Fs1484%2Fft.png",
  guzzard:
    "/api/gbv/image-proxy?url=https%3A%2F%2Fi.discogs.com%2Fi0KlQVkGitf6ESETMz2mya75cJp5gHp_wzDSRBs-xaE%2Frs%3Afit%2Fg%3Asm%2Fq%3A90%2Fh%3A581%2Fw%3A600%2FczM6Ly9kaXNjb2dz%2FLWRhdGFiYXNlLWltYWdlcy9BLTI3OTM3NC0xMjU2MTU0OTEwLmpwZWc.jpeg",
  "halo of flies":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F600594e0259ef06ca93df13f%2F1611524978577-D6S8X4HIZEW6V80Q7X9L%2Fhalo3.jpeg",
  "halo of flies / h•o•f":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F600594e0259ef06ca93df13f%2F1611524978577-D6S8X4HIZEW6V80Q7X9L%2Fhalo3.jpeg",
  melvins:
    "/api/gbv/image-proxy?url=https%3A%2F%2Fchaoscontrol.com%2Fwp-content%2Fuploads%2F2000%2F11%2Fmelvins.jpg",
  "bailter space":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fsun-13.com%2Fwp-content%2Fuploads%2F2023%2F04%2Fbailterspace201812403.jpg",
  supernova:
    "/api/gbv/image-proxy?url=https%3A%2F%2Fi.scdn.co%2Fimage%2Fe2ca6be609b6426faf07d4310dd881767a4eb2ed",
  surgery:
    "/api/gbv/image-proxy?url=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2F8%2F8d%2FSurgery_band.jpeg",
  "heroine sheiks":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fbeautifulnoise.wordpress.com%2Fwp-content%2Fuploads%2F2008%2F08%2Fnew_sheiks.jpg",
  "the heroine sheiks":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fbeautifulnoise.wordpress.com%2Fwp-content%2Fuploads%2F2008%2F08%2Fnew_sheiks.jpg",
  "janitor joe":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2F9%2F9f%2FJanitor_Joe.jpg%2F330px-Janitor_Joe.jpg",
  tar: "/api/gbv/image-proxy?url=https%3A%2F%2Fi.scdn.co%2Fimage%2F6b561f9e6f2eac88a1704625d8f2588422e748da",
  tad: "/api/gbv/image-proxy?url=https%3A%2F%2Fsubpop-img.s3.amazonaws.com%2Fasset%2Fartist_images%2Fattachments%2F000%2F004%2F149%2Fmax_960%2F3069.jpg",
  x: "/api/gbv/image-proxy?url=https%3A%2F%2Fi0.wp.com%2Fihrtn.net%2Fwp-content%2Fuploads%2F2008%2F08%2FX-Australia-Band-Photo.jpeg",
  "today is the day":
    "/api/gbv/image-proxy?url=https%3A%2F%2Ftownsquare.media%2Fsite%2F875%2Ffiles%2F2017%2F01%2FTITD-1.jpg",
  "the urinals":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fwww.theurinals.com%2Fimages%2Fhistory%2F100F%2520by%2520Ed%2520Colver%402x.JPG",
};

const MEMBER_IMAGE_SKIP: Record<string, true> = {
  cows: true,
  hammerhead: true,
  gaunt: true,
  "calvin krime": true,
  chokebore: true,
  godheadsilo: true,
  feedtime: true,
  guzzard: true,
  "halo of flies": true,
  "halo of flies / h•o•f": true,
  melvins: true,
  "bailter space": true,
  supernova: true,
  surgery: true,
  "heroine sheiks": true,
  "the heroine sheiks": true,
  "janitor joe": true,
  tar: true,
  tad: true,
  x: true,
  "today is the day": true,
  "the urinals": true,
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
  }, [hasError, localImageUrl, lookupAttempted, name, normalizedImageUrl, skipRemoteLookup, fallbackImageUrl, cacheKeyPrefix]);

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
