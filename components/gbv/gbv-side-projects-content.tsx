"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pollardSideProjects } from "../../lib/gbv-side-projects";

export function GbvSideProjectsContent() {
  return (
    <main className="container py-6">
      <div className="mb-6">
        <h1 className="font-league text-2xl font-semibold">
          Robert Pollard Side Projects
        </h1>
        <p className="text-sm text-muted-foreground">
          Discography highlights from Robert Pollard’s key side projects.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {pollardSideProjects.map((project) => (
          <Card key={project.name}>
            <CardHeader className="pt-6">
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-6">
              <p className="text-sm text-muted-foreground">{project.years}</p>
              <p className="text-sm">{project.description}</p>
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
              {project.discographyUrl && (
                <a
                  href={project.discographyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline underline-offset-4"
                >
                  View discography
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
