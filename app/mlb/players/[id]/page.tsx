import type { Metadata } from "next";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { PlayerJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import {
  getPlayer,
  getPlayerHeadshotUrl,
  getPlayerAllStarAppearances,
} from "@/lib/mlb-api";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star } from "lucide-react";
import { PlayerPageContent } from "@/components/player-page-content";

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
      canonical: `/mlb/players/${player.id}`,
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

  const position = player.primaryPosition?.abbreviation || player.primaryPosition?.name || "—";
  const jersey = player.primaryNumber || "—";
  const birthPlace = [player.birthCity, player.birthCountry]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <PlayerJsonLd player={player} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://majorleaguenumbers.com" },
          { name: "Players", url: "https://majorleaguenumbers.com/mlb/players" },
          {
            name: player.fullName,
            url: `https://majorleaguenumbers.com/mlb/players/${player.id}`,
          },
        ]}
      />
      <main className="container py-6">
        <Link
          href="/mlb/players"
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
                src={getPlayerHeadshotUrl(player.id, "large") || "/placeholder.svg"}
                alt={player.fullName}
                width={300}
                height={300}
                className="object-cover"
                priority
              />
            </div>
            <h1 className="font-league mb-2">{player.fullName}</h1>
            <div className="flex gap-2 mb-3">
              <Badge variant="outline">{position}</Badge>
              {jersey !== "—" && <Badge variant="outline">#{jersey}</Badge>}
              {player.active && (
                <Badge variant="outline" className="border-green-500/50 text-green-500">
                  Active
                </Badge>
              )}
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Team: {player.currentTeam?.name || "Free Agent"}</p>
              <p>Height: {player.height || "—"}</p>
              <p>Weight: {player.weight ? `${player.weight} lbs` : "—"}</p>
              <p>Born: {player.birthDate || "—"}{player.currentAge ? ` (Age ${player.currentAge})` : ""}</p>
              <p>Birthplace: {birthPlace || "—"}</p>
              {player.draft && (
                <p>
                  Draft: {player.draft.year} by {player.draft.team?.name || "Unknown"}
                  {player.draft.round ? ` (Round ${player.draft.round}, Pick ${player.draft.pickNumber})` : ""}
                  {player.draft.school?.name ? ` from ${player.draft.school.name}` : ""}
                </p>
              )}
              {allStarAppearances.length > 0 && (
                <p className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                  {allStarAppearances.length}x All-Star ({allStarAppearances.map((a) => a.season).join(", ")})
                </p>
              )}
            </div>
          </div>

          {/* Right: stats */}
          <div>
            {/* Current Season Stats Quick View */}
            {(currentHitting || currentPitching) && (
              <div className="mb-8">
                <h2 className="mb-4">2024 Season</h2>
                {isPitcher && currentPitching ? (
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    <StatCard
                      title="W-L"
                      value={`${currentPitching.stat.wins || 0}-${currentPitching.stat.losses || 0}`}
                    />
                    <StatCard title="ERA" value={currentPitching.stat.era || "—"} />
                    <StatCard title="IP" value={currentPitching.stat.inningsPitched || "—"} />
                    <StatCard title="K" value={currentPitching.stat.strikeOuts || "—"} />
                    <StatCard title="WHIP" value={currentPitching.stat.whip || "—"} />
                    <StatCard title="SV" value={currentPitching.stat.saves || "—"} />
                  </div>
                ) : currentHitting ? (
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    <StatCard title="AVG" value={currentHitting.stat.avg || "—"} />
                    <StatCard title="HR" value={currentHitting.stat.homeRuns || "—"} />
                    <StatCard title="RBI" value={currentHitting.stat.rbi || "—"} />
                    <StatCard title="OPS" value={currentHitting.stat.ops || "—"} />
                    <StatCard title="SB" value={currentHitting.stat.stolenBases || "—"} />
                    <StatCard title="H" value={currentHitting.stat.hits || "—"} />
                  </div>
                ) : null}
              </div>
            )}

            {/* Career Stats Toggle */}
            <PlayerPageContent
              playerName={player.fullName}
              playerId={player.id}
              hittingStats={hittingStats}
              pitchingStats={pitchingStats}
              fieldingStats={fieldingStats}
              hasHittingStats={hasHittingStats}
              hasPitchingStats={hasPitchingStats}
              hasFieldingStats={hasFieldingStats}
            />
          </div>
        </div>
      </main>
    </>
  );
}
