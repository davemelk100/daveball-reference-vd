"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pollardSideProjects } from "@/lib/gbv-side-projects";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { amrepImprints } from "@/lib/amrep-imprints-data";
import { revSubLabels } from "@/lib/rev-sublabels-data";
import { sgSubLabels } from "@/lib/sg-sublabels-data";

export function SiteSideProjectsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const isRev = site.id === "rev";
  const isSg = site.id === "sg";

  const getTitle = () => {
    if (isSg) return "Imprints & Related Labels";
    if (isAmrep) return "AmRep Imprints & Collections";
    if (isRev) return "Sub-Labels & Related Imprints";
    return "Robert Pollard Side Projects";
  };

  const getDescription = () => {
    if (isSg) return "Skin Graft Records imprints and related independent labels.";
    if (isAmrep) return "Highlights from AmRep's shop categories and related imprints.";
    if (isRev) return "Revelation Records sub-labels, distribution partners, and related imprints.";
    return "Discography highlights from Robert Pollard's key side projects.";
  };

  const getData = () => {
    if (isSg) return sgSubLabels;
    if (isAmrep) return amrepImprints;
    if (isRev) return revSubLabels;
    return pollardSideProjects;
  };

  const data = getData();

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="font-league">{getTitle()}</h1>
        <p className="text-sm text-muted-foreground">{getDescription()}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {data.map((project) => (
          <Card key={project.name}>
            <CardHeader className="pt-6">
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-6">
              {"years" in project && project.years && (
                <p className="text-sm text-muted-foreground">{project.years}</p>
              )}
              <p className="text-sm">{project.description}</p>
              {"highlights" in project && project.highlights && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Highlights</h3>
                  <ul className="space-y-2 text-sm">
                    {project.highlights.map((highlight: string) => (
                      <li key={`${project.name}-${highlight}`}>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {"releases" in project && project.releases && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Discography</h3>
                  <ul className="space-y-2 text-sm">
                    {project.releases.map((release: { title: string; year: number }) => (
                      <li key={`${project.name}-${release.title}-${release.year}`}>
                        <span className="font-medium">{release.title}</span>{" "}
                        <span className="text-muted-foreground">({release.year})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {("url" in project && project.url) || ("discographyUrl" in project && project.discographyUrl) ? (
                <a
                  href={"url" in project ? project.url : "discographyUrl" in project ? project.discographyUrl : "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline underline-offset-4"
                >
                  {isAmrep || isRev || isSg ? "Visit site" : "View discography"}
                </a>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
