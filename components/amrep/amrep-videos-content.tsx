"use client";

import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

interface Video {
  id: string;
  title: string;
  description?: string;
}

const videos: Video[] = [
  {
    id: "jUjLDvrLDhg",
    title: "Guided By Voices - I Am A Scientist",
    description: "Music video for 'I Am A Scientist' from Bee Thousand (1994).",
  },
  {
    id: "ScR7x0m4Kxo",
    title: "Guided By Voices - Motor Away",
    description: "Music video for 'Motor Away' from Alien Lanes (1995).",
  },
  {
    id: "XZsi9uEOJLg",
    title: "Guided By Voices - Game of Pricks",
    description: "Music video for 'Game of Pricks' from Alien Lanes (1995).",
  },
  {
    id: "JRMobFKG-a4",
    title: "Guided By Voices - Echos Myron",
    description: "Music video for 'Echos Myron' from Bee Thousand (1994).",
  },
  {
    id: "_rNP2LK5QIA",
    title: "Guided By Voices - Glad Girls",
    description: "Music video for 'Glad Girls' from Isolation Drills (2001).",
  },
  {
    id: "vz6mD-0vTYA",
    title: "Guided By Voices - Do The Collapse",
    description:
      "Music video for 'Do The Collapse' from Do The Collapse (1999).",
  },
  {
    id: "UvsAS--CoXI",
    title: "Guided By Voices - Hold On Hope",
    description: "Music video for 'Hold On Hope' from Do The Collapse (1999).",
  },
  {
    id: "-fm83rY2aWc",
    title: "Guided By Voices - Teenage FBI",
    description: "Music video for 'Teenage FBI' from Do The Collapse (1999).",
  },
  {
    id: "7VGXLB3us70",
    title: "Guided By Voices feat. Kim Deal - Love Hurts",
    description: "Cover of the Everly Brothers' 'Love Hurts' featuring Kim Deal.",
  },
];

const amrepVideos: Video[] = [
  {
    id: "L7uWBm7FnZU",
    title: "AmRep video highlight 1",
  },
  {
    id: "pvCaa4sxEIs",
    title: "AmRep video highlight 2",
  },
  {
    id: "JkiW8T3pjMI",
    title: "AmRep video highlight 3",
  },
  {
    id: "TdC03iMqQHc",
    title: "AmRep video highlight 4",
  },
  {
    id: "Oiu98b3QwV8",
    title: "AmRep video highlight 5",
  },
  {
    id: "aIwNKAGI9FM",
    title: "AmRep video highlight 6",
  },
];

export function GbvVideosContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const list = isAmrep ? amrepVideos : videos;

  return (
    <div className="container py-6">
      <h1 className="font-league mb-2">Videos</h1>

      {list.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Video content coming soon.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {list.map((video) => (
            <div key={video.id} className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
