"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MusicSiteConfig } from "@/lib/music-site";

type MembersControlsProps = {
  site: MusicSiteConfig;
  isAmrep: boolean;
  displayCount: number;
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
  filter: "all" | "active" | "inactive";
  onFilterChange: (value: "all" | "active" | "inactive") => void;
};

export function MembersControls({
  site,
  isAmrep,
  displayCount,
  totalCount,
  activeCount,
  inactiveCount,
  filter,
  onFilterChange,
}: MembersControlsProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <h1 className="font-league">
        {isAmrep ? "Artists" : "Band Members"}{" "}
        <span className="align-baseline">({displayCount})</span>
      </h1>
      <Tabs value={filter} onValueChange={(v) => onFilterChange(v as typeof filter)}>
        <TabsList className="text-black">
          <TabsTrigger value="all" className="text-black">
            All <span className="align-baseline">({totalCount})</span>
          </TabsTrigger>
          <TabsTrigger value="active" className="text-black">
            Active <span className="align-baseline">({activeCount})</span>
          </TabsTrigger>
          <TabsTrigger value="inactive" className="text-black">
            Past <span className="align-baseline">({inactiveCount})</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
