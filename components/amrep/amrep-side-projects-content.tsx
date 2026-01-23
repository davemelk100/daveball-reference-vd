"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pollardSideProjects } from "../../lib/gbv-side-projects";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { amrepImprints } from "@/lib/amrep-imprints-data";

export function GbvSideProjectsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="font-league">
          {isAmrep ? "AmRep Imprints & Collections" : "Robert Pollard Side Projects"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isAmrep
            ? "Highlights from AmRep’s shop categories and related imprints."
            : "Discography highlights from Robert Pollard’s key side projects."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {(isAmrep ? amrepImprints : pollardSideProjects).map((project) => (
          <Card key={project.name}>
            <CardHeader className="pt-6">
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-6">
              {!isAmrep && (
                <p className="text-sm text-muted-foreground">{project.years}</p>
              )}
              <p className="text-sm">{project.description}</p>
              {isAmrep ? (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Highlights</h3>
                  <ul className="space-y-2 text-sm">
                    {project.highlights.map((highlight) => (
                      <li key={`${project.name}-${highlight}`}>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Discography</h3>
                  <ul className="space-y-2 text-sm">
                    {project.releases.map((release) => (
                      <li key={`${project.name}-${release.title}-${release.year}`}>
                        <span className="font-medium">{release.title}</span>{" "}
                        <span className="text-muted-foreground">({release.year})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(isAmrep ? project.url : project.discographyUrl) && (
                <a
                  href={isAmrep ? project.url : project.discographyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline underline-offset-4"
                >
                  {isAmrep ? "Visit shop" : "View discography"}
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
