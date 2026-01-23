"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GbvTriviaPanel } from "@/components/amrep/amrep-trivia-card";
import { GbvRecordOfDayCard } from "@/components/amrep/amrep-record-of-day-card";
import { getLocalMemberImage } from "@/lib/gbv-member-images";
import { getLocalAlbumImage } from "@/lib/gbv-album-images";
import { getProxiedImageUrl, getReleaseType } from "@/lib/gbv-utils";
import { GbvRemoteImage } from "@/components/amrep/amrep-remote-image";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { amrepArtists } from "@/lib/amrep-artists-data";
import { amrepReleases } from "@/lib/amrep-releases-data";

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

interface Album {
  id?: number;
  title: string;
  year?: number;
  thumb?: string;
  mainRelease?: number;
  format?: string | string[];
  releaseType?: string;
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
  "bailter space":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fsun-13.com%2Fwp-content%2Fuploads%2F2023%2F04%2Fbailterspace201812403.jpg",
  "halo of flies":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F600594e0259ef06ca93df13f%2F1611524978577-D6S8X4HIZEW6V80Q7X9L%2Fhalo3.jpeg",
  "halo of flies / h•o•f":
    "/api/gbv/image-proxy?url=https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F600594e0259ef06ca93df13f%2F1611524978577-D6S8X4HIZEW6V80Q7X9L%2Fhalo3.jpeg",
  melvins:
    "/api/gbv/image-proxy?url=https%3A%2F%2Fchaoscontrol.com%2Fwp-content%2Fuploads%2F2000%2F11%2Fmelvins.jpg",
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

    if (skipRemoteLookup) return;

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
      <div className="w-full aspect-square bg-muted rounded-lg mb-2 mx-auto flex items-center justify-center">
        <Image
          src={fallbackIconSrc}
          alt="Artist placeholder"
          width={48}
          height={48}
          className="h-12 w-12 gbv-nav-icon"
          loading="eager"
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

export function GbvDashboardContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const [artist, setArtist] = useState<ArtistData | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dedupeReleases = (items: Album[]) => {
    const seen = new Set<string>();
    return items.filter((item) => {
      const titleKey = `${item.title || ""}::${item.year || ""}`.toLowerCase();
      const key = item.mainRelease ? `main:${item.mainRelease}` : `title:${titleKey}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  useEffect(() => {
    if (isAmrep) {
      setArtist({
        id: 0,
        name: site.name,
        profile:
          "Independent label founded in 1986 by Tom Hazelmyer, specializing in noise rock and underground releases.",
        members: amrepArtists.map((artist) => ({
          id: artist.id,
          name: artist.name,
          active: artist.active,
          imageUrl: null,
        })),
      });
      setIsLoading(false);
      return;
    }

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
  }, [isAmrep, site.name]);

  useEffect(() => {
    if (isAmrep) {
      const fetchAmrepReleases = async () => {
        try {
          const res = await fetch("/api/amrep/discogs?type=releases&per_page=100");
          if (!res.ok) throw new Error("Failed to fetch releases");
          const data = await res.json();
          const releases = Array.isArray(data?.releases) ? data.releases : [];
          if (releases.length > 0) {
            const mapped = releases.map((release: any) => ({
              id: release.id,
              title: `${release.artist} — ${release.title}`,
              year: release.year,
              format: release.format,
              thumb: release.thumb,
              mainRelease: release.mainRelease ?? release.main_release,
            }));
            setAlbums(dedupeReleases(mapped));
            return;
          }
        } catch (err) {
          console.error(err);
        }

        setAlbums(
          dedupeReleases(
            amrepReleases.map((release) => ({
              id: release.id,
              title: `${release.artist} — ${release.title}`,
              year: release.year,
              format: release.format,
            }))
          )
        );
      };

      fetchAmrepReleases();
      return;
    }

    const cacheKey = "gbv-albums-cache";
    const cacheTtlMs = 24 * 60 * 60 * 1000;

    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as { timestamp: number; albums: Album[] };
        if (parsed?.albums?.length && Date.now() - parsed.timestamp < cacheTtlMs) {
          setAlbums(parsed.albums);
        }
      }
    } catch {
      // ignore cache errors
    }

    async function fetchAlbums() {
      try {
        const res = await fetch("/api/gbv/discogs?type=albums");
        if (!res.ok) throw new Error("Failed to fetch albums");
        const data = await res.json();
        const nextAlbums = data.albums || [];
        setAlbums(nextAlbums);
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: Date.now(), albums: nextAlbums })
          );
        } catch {
          // ignore cache errors
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchAlbums();
  }, [isAmrep]);

  const activeMembers = artist?.members?.filter((m) => m.active) || [];
  const fallbackMembers: Member[] = isAmrep
    ? amrepArtists.slice(0, 6).map((artist) => ({
        id: artist.id,
        name: artist.name,
        active: artist.active,
      }))
    : [
        { name: "Robert Pollard", active: true },
        { name: "Doug Gillard", active: true },
        { name: "Kevin March", active: true },
        { name: "Mark Shue", active: true },
        { name: "Bobby Bare Jr.", active: true },
        { name: "Travis Harrison", active: true },
      ];
  const memberLimit = isAmrep ? 6 : 5;
  const membersToShow =
    activeMembers.length > 0
      ? activeMembers.slice(0, memberLimit)
      : fallbackMembers.slice(0, memberLimit);

  const fallbackAlbums: Album[] = isAmrep
    ? amrepReleases.slice(0, 6).map((release) => ({
        title: `${release.artist} — ${release.title}`,
        year: release.year,
        format: release.format,
      }))
    : [
        { title: "Bee Thousand", year: 1994 },
        { title: "Alien Lanes", year: 1995 },
        { title: "Under the Bushes Under the Stars", year: 1996 },
        { title: "Mag Earwhig!", year: 1997 },
        { title: "Propeller", year: 1992 },
        { title: "Isolation Drills", year: 2001 },
      ];
  const albumsToShow =
    albums.length > 0 ? albums.slice(0, 6) : fallbackAlbums;

  const getAlbumImage = (album: Album): string | null => {
    if (isAmrep) return album.thumb ? getProxiedImageUrl(album.thumb) : null;
    if (album.id) {
      const local = getLocalAlbumImage(album.id);
      if (local) return local;
    }
    return getProxiedImageUrl(album.thumb || null);
  };

  if (isLoading) {
    return (
      <div className="container py-2">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Loading {site.shortName} data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-2">
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
          <h2 className="font-league">
            {isAmrep ? "Featured Artists" : "Current Members"}
          </h2>
          <Link
            href={`${site.basePath}/members`}
            className="uppercase text-sm text-muted-foreground hover:text-foreground"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {membersToShow.map((member, index) => {
            const card = (
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
            );

            if (member.id) {
              return (
                <Link key={member.id} href={`${site.basePath}/members/${member.id}`}>
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

      {/* Discography */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-league">
            {site.navLabels.discography}
          </h2>
          <Link
            href={`${site.basePath}/albums`}
            className="uppercase text-sm text-muted-foreground hover:text-foreground"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {albumsToShow.map((album, index) => {
            const albumImage = getAlbumImage(album);
            const card = (
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-3">
                  {albumImage ? (
                    <GbvRemoteImage
                      src={albumImage}
                      alt={album.title}
                      width={200}
                      height={200}
                      className="w-full aspect-square rounded-lg object-cover mb-2"
                      loading={index < 5 ? "eager" : "lazy"}
                      cacheKey={album.id ? `gbv-album-thumb:${album.id}` : undefined}
                      preferProxy
                    />
                  ) : (
                    <div className="w-full aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                      <Image
                        src={site.placeholderIconSrc}
                        alt={`${site.shortName} logo`}
                        width={48}
                        height={48}
                        className="h-12 w-12 gbv-nav-icon"
                        loading="eager"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-sm truncate">{album.title}</h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{album.year ?? "—"}</span>
                    <span className="border border-border rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                      {getReleaseType(album.format, album.releaseType)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );

            if (album.id) {
              return (
                <Link
                  key={`${album.id}-${index}`}
                  href={`${site.basePath}/albums/${album.id}`}
                >
                  {card}
                </Link>
              );
            }

            return (
              <div
                key={`${album.title}-${album.year ?? "unknown"}-${index}`}
                className="cursor-default"
              >
                {card}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
