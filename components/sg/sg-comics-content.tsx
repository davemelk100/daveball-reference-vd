"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { getAllSgComics, sgComicCharacters } from "@/lib/sg-comics-data";
import { Badge } from "@/components/ui/badge";

export function SgComicsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const comics = getAllSgComics();

  const creators = [...new Set(comics.map((c) => c.creator))].sort();

  return (
    <div className="container py-6">
      <h1 className="font-league mb-2">
        {comics.length} Comics
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Years before SKiN GRAFT started releasing music, SKIN GRAFT was a self-published punk-comic zine founded in 1986 by Mark Fischer and Rob Syers.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide self-center mr-1">Characters:</span>
        {sgComicCharacters.map((char) => (
          <Badge key={char} variant="outline" className="text-xs">
            {char}
          </Badge>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {comics.map((comic) => (
          <a
            key={comic.id}
            href={comic.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="hover:bg-muted/80 transition-colors cursor-pointer h-full">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-1">{comic.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {comic.creator} · {comic.year}
                  {comic.pages ? ` · ${comic.pages} page${comic.pages > 1 ? "s" : ""}` : ""}
                </p>
                <p className="text-xs text-muted-foreground">{comic.description}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      <div className="mt-8 text-xs text-muted-foreground">
        <p>
          All comics © respective creators / SKiN GRAFT Comix (1986–2011).{" "}
          <a
            href="https://skingraftrecords.com/comix.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            View original archive
          </a>
        </p>
      </div>
    </div>
  );
}
