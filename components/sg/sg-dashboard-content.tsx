"use client";

import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { ArtistOfDayCard } from "@/components/music-site/artist-of-day-card";
import { SgRemoteImage } from "@/components/sg/sg-remote-image";
import {
  DashboardDailyRow,
  DashboardDescription,
} from "@/components/music-site/dashboard-sections";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { sgArtists, sgArtistImages } from "@/lib/sg-artists-data";

const sgArtistsWithImages = sgArtists.map((a) => ({
  id: a.id,
  name: a.name,
  imageUrl: sgArtistImages[a.id],
  genre: a.genre,
}));

export function SgDashboardContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-2">
      <DashboardDescription text={site.description} />

      <DashboardDailyRow columns={3}>
        <TriviaPanel />
        <RecordOfDayCard
          RemoteImage={SgRemoteImage}
          imageFit="contain"
          placeholderVariant="img"
          placeholderClassName="max-h-full max-w-full object-contain"
        />
        <ArtistOfDayCard
          artists={sgArtistsWithImages}
          site={site}
          RemoteImage={SgRemoteImage}
          imageFit="contain"
          placeholderVariant="img"
          placeholderClassName="max-h-full max-w-full object-contain"
        />
      </DashboardDailyRow>
    </div>
  );
}
