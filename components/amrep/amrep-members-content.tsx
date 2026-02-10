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

const AMREP_ARTIST_IMAGES: Record<number, string> = {
  1: "https://i.discogs.com/cZCcF9JDAaQ1-7gnmMQZvssr129bLICp8EaaAB-6leI/rs:fit/g:sm/q:90/h:560/w:464/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTE5ODY2/OC0xNTI5NzUyOTc4/LTg5MTkuanBlZw.jpeg",
  3: "https://cdn.shopify.com/s/files/1/0336/8929/files/BH2016_Final__AngelZayas_large.jpg",
  4: "https://f4.bcbits.com/img/0020101279_10.jpg",
  5: "https://www.fungusboy.net/calvin-krime-4.jpg",
  6: "https://magnetmagazine.com/wp-content/uploads/2009/03/chokebore545.jpg",
  8: "https://static.wikia.nocookie.net/peel/images/0/02/Cows.jpg/revision/latest?cb=20230612102727",
  10: "https://f4.bcbits.com/img/0004294904_10.jpg",
  12: "https://lollipopmagazine.com/wp-content/uploads/2017/12/gauntphoto.jpg",
  14: "https://subpop-img.s3.amazonaws.com/asset/artist_images/attachments/000/004/023/max_960/2599.jpg?1389019541",
  15: "https://images.squarespace-cdn.com/content/v1/600594e0259ef06ca93df13f/1611524978577-D6S8X4HIZEW6V80Q7X9L/halo3.jpeg",
  16: "https://hpr1.com/images/uploads/article_images/277/hammerhead__social.png",
  18: "https://magazine-resources.tidal.com/uploads/2022/06/helmet_resized.jpg",
  19: "https://beautifulnoise.wordpress.com/wp-content/uploads/2008/08/new_sheiks.jpg",
  20: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Janitor_Joe.jpg/330px-Janitor_Joe.jpg",
  22: "https://upload.wikimedia.org/wikipedia/en/4/41/Roost.jpg",
  23: "https://f4.bcbits.com/img/0021188507_10.jpg",
  24: "https://lastfm.freetls.fastly.net/i/u/300x300/dacbd6fc7208965df11ca2593fd0b1cd.jpg",
  25: "https://chaoscontrol.com/wp-content/uploads/2000/11/melvins.jpg",
  26: "https://nashvillepussy.com/wp-content/uploads/2025/01/88.jpg",
  27: "https://lookoutrecords.wordpress.com/wp-content/uploads/2010/03/servotron.jpg",
  29: "https://f4.bcbits.com/img/0024692884_10.jpg",
  30: "https://upload.wikimedia.org/wikipedia/en/8/8d/Surgery_band.jpeg",
  31: "https://i.scdn.co/image/e2ca6be609b6426faf07d4310dd881767a4eb2ed",
  32: "https://subpop-img.s3.amazonaws.com/asset/artist_images/attachments/000/004/149/max_960/3069.jpg",
  33: "https://i.scdn.co/image/6b561f9e6f2eac88a1704625d8f2588422e748da",
  34: "https://subpop-img.s3.amazonaws.com/asset/artist_images/attachments/000/004/281/max_960/2607.jpg?1389021118",
  35: "https://lastfm.freetls.fastly.net/i/u/300x300/3c5bf84a50194627c6c60a8a5ad918bb.jpg",
  36: "https://lastfm.freetls.fastly.net/i/u/ar0/ece7b846cab5c525fc0eb7147fb86ed0.jpg",
  37: "https://subpop-img.s3.amazonaws.com/asset/artist_images/attachments/000/006/991/max_600_400/umen-2017-promo-01-camgarrett-2209x1500-300.jpg",
  38: "https://www.theurinals.com/images/history/100F%20by%20Ed%20Colver%402x.JPG",
  39: "https://townsquare.media/site/875/files/2017/01/TITD-1.jpg",
  40: "https://media.pitchfork.com/photos/5931b4afa28a096fc428f200/2:1/w_2560%2Cc_limit/bbf21bbc.jpg",
  41: "https://i.discogs.com/jTmauyEW5UcThw_RdMzp2edmusqGm1O-45bkFQG2d18/rs:fit/g:sm/q:90/h:462/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTI2NTQw/NS0xMzM1ODg1MDMw/LmpwZWc.jpeg",
  46: "https://static.wikia.nocookie.net/peel/images/8/82/Cherubs.jpg",
};
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
          active: false,
          imageUrl: AMREP_ARTIST_IMAGES[artist.id] ?? null,
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
