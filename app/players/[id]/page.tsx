import type { Metadata } from "next";
import { PlayerStatsTable } from "@/components/player-stats-table";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayerJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import {
  getPlayer,
  getPlayerHeadshotUrl,
  getPlayerAllStarAppearances,
} from "@/lib/mlb-api";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Ruler,
  Scale,
  Star,
  GraduationCap,
} from "lucide-react";
import { BaseballCardGallery } from "@/components/baseball-card";

interface PlayerPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PlayerPageProps): Promise<Metadata> {
  const { id } = await params;
  const player = await getPlayer(Number(id));

  if (!player) {
    return {
      title: "Player Not Found | Major League Numbers",
      description: "The requested player could not be found.",
    };
  }

  const position = player.primaryPosition?.name || "Player";
  const team = player.currentTeam?.name || "Free Agent";
  const description = `View ${player.fullName}'s MLB stats, career history, and performance data. ${position} for ${team}.`;

  return {
    title: `${player.fullName} Stats`,
    description,
    alternates: {
      canonical: `/players/${player.id}`,
    },
    openGraph: {
      title: `${player.fullName} - MLB Player Stats`,
      description,
      type: "profile",
      images: [
        {
          url: getPlayerHeadshotUrl(player.id, "large") || "/og-img.png",
          width: 400,
          height: 400,
          alt: `${player.fullName} headshot`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${player.fullName} Stats`,
      description,
      images: [getPlayerHeadshotUrl(player.id, "large") || "/og-img.png"],
    },
  };
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;
  const [player, allStarAppearances] = await Promise.all([
    getPlayer(Number(id)),
    getPlayerAllStarAppearances(Number(id)),
  ]);

  if (!player) {
    notFound();
  }

  // Extract stats by type
  const hittingStats =
    player.stats
      ?.filter((s: any) => s.group?.displayName === "hitting")
      .flatMap((s: any) => s.splits || []) || [];
  const pitchingStats =
    player.stats
      ?.filter((s: any) => s.group?.displayName === "pitching")
      .flatMap((s: any) => s.splits || []) || [];
  const fieldingStats =
    player.stats
      ?.filter((s: any) => s.group?.displayName === "fielding")
      .flatMap((s: any) => s.splits || []) || [];

  // Get current season stats
  const currentHitting = hittingStats.find((s: any) => s.season === "2024");
  const currentPitching = pitchingStats.find((s: any) => s.season === "2024");

  const isPitcher = player.primaryPosition?.type === "Pitcher";
  const hasHittingStats = hittingStats.length > 0;
  const hasPitchingStats = pitchingStats.length > 0;
  const hasFieldingStats = fieldingStats.length > 0;
  const hasAnyStats = hasHittingStats || hasPitchingStats || hasFieldingStats;

  return (
    <>
      <PlayerJsonLd player={player} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://majorleaguenumbers.com" },
          { name: "Players", url: "https://majorleaguenumbers.com/players" },
          {
            name: player.fullName,
            url: `https://majorleaguenumbers.com/players/${player.id}`,
          },
        ]}
      />
      <main className="container py-2">
        {/* Back button */}
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/players">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Players
          </Link>
        </Button>

        {/* Player Header */}
        <div className="flex flex-row gap-4 md:gap-6 mb-8">
          <div className="shrink-0">
            <Image
              src={
                getPlayerHeadshotUrl(player.id, "large") || "/placeholder.svg"
              }
              alt={player.fullName}
              width={200}
              height={200}
              className="h-[120px] md:h-[180px] w-auto rounded-lg"
              priority
            />
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-3">
              <h2 className="font-league leading-tight">{player.fullName}</h2>
              {player.active && (
                <Badge
                  variant="outline"
                  className="border-green-500/50 text-green-500"
                >
                  Active
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {player.currentTeam?.name || "Free Agent"} •{" "}
              {player.primaryPosition?.name}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Age {player.currentAge}</span>
              </div>
              <div className="flex items-center gap-1">
                <Ruler className="h-4 w-4" />
                <span>{player.height}</span>
              </div>
              <div className="flex items-center gap-1">
                <Scale className="h-4 w-4" />
                <span>{player.weight} lbs</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {player.birthCity}, {player.birthCountry}
                </span>
              </div>
            </div>
            {allStarAppearances.length > 0 && (
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">
                  {allStarAppearances.length}x All-Star
                </span>
                <span className="text-muted-foreground">
                  ({allStarAppearances.map((a) => a.season).join(", ")})
                </span>
              </div>
            )}
            {player.draft && (
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>
                  Drafted {player.draft.year} by{" "}
                  {player.draft.team?.name || "Unknown"}
                  {player.draft.round
                    ? ` (Round ${player.draft.round}, Pick ${player.draft.pickNumber})`
                    : ""}
                  {player.draft.school?.name
                    ? ` from ${player.draft.school.name}`
                    : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Current Season Stats Quick View */}
        {(currentHitting || currentPitching) && (
          <div className="mb-8">
            <h2 className="font-league text-4xl font-semibold mb-4">
              2024 Season
            </h2>
            {isPitcher && currentPitching ? (
              <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                <StatCard
                  title="W-L"
                  value={`${currentPitching.stat.wins || 0}-${
                    currentPitching.stat.losses || 0
                  }`}
                />
                <StatCard title="ERA" value={currentPitching.stat.era || "—"} />
                <StatCard
                  title="IP"
                  value={currentPitching.stat.inningsPitched || "—"}
                />
                <StatCard
                  title="K"
                  value={currentPitching.stat.strikeOuts || "—"}
                />
                <StatCard
                  title="WHIP"
                  value={currentPitching.stat.whip || "—"}
                />
                <StatCard
                  title="SV"
                  value={currentPitching.stat.saves || "—"}
                />
              </div>
            ) : currentHitting ? (
              <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                <StatCard title="AVG" value={currentHitting.stat.avg || "—"} />
                <StatCard
                  title="HR"
                  value={currentHitting.stat.homeRuns || "—"}
                />
                <StatCard title="RBI" value={currentHitting.stat.rbi || "—"} />
                <StatCard title="OPS" value={currentHitting.stat.ops || "—"} />
                <StatCard
                  title="SB"
                  value={currentHitting.stat.stolenBases || "—"}
                />
                <StatCard title="H" value={currentHitting.stat.hits || "—"} />
              </div>
            ) : null}
          </div>
        )}

        {/* Career Stats Tables and Baseball Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {hasHittingStats && (
            <div className="lg:col-span-4">
              <PlayerStatsTable stats={hittingStats} type="hitting" />
            </div>
          )}
          {hasPitchingStats && (
            <div className="lg:col-span-3">
              <PlayerStatsTable stats={pitchingStats} type="pitching" />
            </div>
          )}

          {/* Baseball Cards Sidebar */}
          <div className={hasPitchingStats ? "lg:col-span-1" : "lg:col-span-4"}>
            <BaseballCardGallery playerName={player.fullName} limit={4} />
          </div>

          {hasFieldingStats && (
            <div className="lg:col-span-4">
              <PlayerStatsTable stats={fieldingStats} type="fielding" />
            </div>
          )}

          {!hasAnyStats && (
            <div className="lg:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Career Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No career statistics available for this player.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
