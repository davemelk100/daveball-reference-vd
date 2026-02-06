"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { getPlayerHeadshotUrl } from "@/lib/nfl-api";

interface NFLPlayerContentProps {
  playerData: any;
  playerId: string;
}

export function NFLPlayerContent({ playerData, playerId }: NFLPlayerContentProps) {
  const athlete = playerData?.athlete;
  if (!athlete) {
    return (
      <div className="container py-6">
        <Link
          href="/nfl/players"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Players
        </Link>
        <p className="text-muted-foreground">Player data not available.</p>
      </div>
    );
  }

  const fullName = athlete.displayName || "Unknown";
  const position = athlete.position?.abbreviation || "—";
  const jersey = athlete.jersey || "—";
  const team = athlete.team?.displayName || "—";
  const headshot = athlete.headshot?.href || getPlayerHeadshotUrl(playerId);
  const height = athlete.displayHeight || "—";
  const weight = athlete.displayWeight || "—";
  const birthDate = athlete.dateOfBirth ? new Date(athlete.dateOfBirth).toLocaleDateString() : "—";
  const birthPlace = athlete.birthPlace
    ? `${athlete.birthPlace.city || ""}${athlete.birthPlace.state ? `, ${athlete.birthPlace.state}` : ""}`.trim()
    : "—";
  const college = athlete.college?.name || "—";
  const experience = athlete.experience?.years != null ? `${athlete.experience.years} years` : "—";
  const draft = athlete.draft
    ? `${athlete.draft.year} Round ${athlete.draft.round}, Pick ${athlete.draft.selection} (${athlete.draft.team?.abbreviation || ""})`
    : "Undrafted";

  // Season stats from the overview
  const stats = playerData?.stats || [];

  return (
    <div className="container py-6">
      <Link
        href="/nfl/players"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Players
      </Link>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Left: player photo + bio */}
        <div>
          <div className="w-full aspect-square bg-muted/30 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            <Image
              src={headshot}
              alt={fullName}
              width={300}
              height={300}
              className="object-cover"
              unoptimized
            />
          </div>
          <h1 className="font-league mb-2">{fullName}</h1>
          <div className="flex gap-2 mb-3">
            <Badge variant="outline">{position}</Badge>
            {jersey !== "—" && <Badge variant="outline">#{jersey}</Badge>}
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Team: {team}</p>
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
            <p>Born: {birthDate}</p>
            <p>Birthplace: {birthPlace}</p>
            <p>College: {college}</p>
            <p>Experience: {experience}</p>
            <p>Draft: {draft}</p>
          </div>
        </div>

        {/* Right: stats */}
        <div>
          <h2 className="font-league mb-4">Statistics</h2>
          {stats.length > 0 ? (
            <div className="space-y-6">
              {stats.map((statGroup: any, idx: number) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3 text-sm">
                      {statGroup.displayName || statGroup.name || "Stats"}
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4">Season</th>
                            {statGroup.labels?.map((label: string, i: number) => (
                              <th key={i} className="text-center py-2 px-2">{label}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {statGroup.seasonTypes?.map((seasonType: any) =>
                            seasonType.categories?.map((cat: any) =>
                              cat.statistics?.map((row: any, ri: number) => (
                                <tr key={ri} className="border-b last:border-0">
                                  <td className="py-2 pr-4 font-medium">
                                    {row.season?.displayName || row.displayName || "—"}
                                  </td>
                                  {row.stats?.map((val: string, vi: number) => (
                                    <td key={vi} className="text-center py-2 px-2">{val}</td>
                                  ))}
                                </tr>
                              ))
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm">No statistics available.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
