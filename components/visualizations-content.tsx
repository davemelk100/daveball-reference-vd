"use client";

import { useState, useEffect } from "react";
import dynamicImport from "next/dynamic";
import { SeasonSelector } from "@/components/season-selector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const LeadersBarChart = dynamicImport(
  () =>
    import("@/components/leaders-bar-chart").then((mod) => ({
      default: mod.LeadersBarChart,
    })),
  {
    loading: () => <Skeleton className="h-[300px] w-full" />,
    ssr: false,
  }
);

interface VisualizationData {
  hrLeadersAL: any[];
  hrLeadersNL: any[];
  kLeadersAL: any[];
  kLeadersNL: any[];
  rbiLeadersAL: any[];
  rbiLeadersNL: any[];
  error?: string;
}

async function fetchVisualizationData(
  season: number
): Promise<VisualizationData & { error?: string }> {
  try {
    const response = await fetch(`/api/visualizations?season=${season}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    return {
      hrLeadersAL: [],
      hrLeadersNL: [],
      kLeadersAL: [],
      kLeadersNL: [],
      rbiLeadersAL: [],
      rbiLeadersNL: [],
      error:
        "Failed to load visualization data. The MLB Stats API may be temporarily unavailable.",
    };
  }
}

export function VisualizationsContent({
  initialSeason,
}: {
  initialSeason: number;
}) {
  const [season, setSeason] = useState(initialSeason);
  const [league, setLeague] = useState<"AL" | "NL">("AL");

  const [data, setData] = useState<VisualizationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchVisualizationData(season)
      .then((result) => {
        if (result.error) {
          setError(result.error);
        }
        setData(result);
      })
      .finally(() => setIsLoading(false));
  }, [season]);

  return (
    <main className="container py-6">
      <div className="mb-8">
        <div className="flex items-center justify-start gap-4 mb-4 flex-wrap">
          <h2 className="font-league text-4xl font-semibold whitespace-nowrap">
            Data Visualizations
          </h2>
          <div className="flex items-center gap-2">
            <SeasonSelector season={season} onSeasonChange={setSeason} />
            <Tabs
              value={league}
              onValueChange={(value) => setLeague(value as "AL" | "NL")}
            >
              <TabsList>
                <TabsTrigger value="AL">AL</TabsTrigger>
                <TabsTrigger value="NL">NL</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            <LeadersBarChart
              title="Home Run Leaders"
              leaders={
                league === "AL"
                  ? data?.hrLeadersAL || []
                  : data?.hrLeadersNL || []
              }
              color="#ef4444"
            />
            <LeadersBarChart
              title="RBI Leaders"
              leaders={
                league === "AL"
                  ? data?.rbiLeadersAL || []
                  : data?.rbiLeadersNL || []
              }
              color="#10b981"
            />
            <LeadersBarChart
              title="Strikeout Leaders (Pitching)"
              leaders={
                league === "AL"
                  ? data?.kLeadersAL || []
                  : data?.kLeadersNL || []
              }
              color="#3b82f6"
            />
          </div>
        )}
      </div>
    </main>
  );
}
