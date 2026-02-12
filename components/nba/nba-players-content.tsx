"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { NBALeaderCategory } from "@/lib/nba-api";
import { getPlayerHeadshotUrl } from "@/lib/nba-api";

interface NBAPlayersContentProps {
  leaderCategories: NBALeaderCategory[];
}

export function NBAPlayersContent({ leaderCategories }: NBAPlayersContentProps) {
  const [activeTab, setActiveTab] = useState(leaderCategories[0]?.name || "");

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Stat Leaders</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex-wrap h-auto gap-1">
          {leaderCategories.slice(0, 8).map((cat) => (
            <TabsTrigger key={cat.name} value={cat.name} className="text-xs sm:text-sm">
              {cat.displayName}
            </TabsTrigger>
          ))}
        </TabsList>

        {leaderCategories.map((cat) => (
          <TabsContent key={cat.name} value={cat.name}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cat.leaders.slice(0, 20).map((leader) => (
                <Link key={leader.id} href={`/nba/players/${leader.id}`}>
                  <Card className="hover:bg-secondary/50 transition-colors cursor-pointer h-full">
                    <CardContent className="p-1.5 pl-3">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0">
                          <Image
                            src={leader.headshot || getPlayerHeadshotUrl(leader.id)}
                            alt={leader.name}
                            width={96}
                            height={96}
                            className="rounded-lg h-24"
                            style={{ width: "auto" }}
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{leader.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{leader.teamAbbrev}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="secondary">{leader.position}</Badge>
                          </div>
                          <p className="text-sm font-bold mt-1">{leader.displayValue}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
