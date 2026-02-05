"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { USPBLStandingsEntry } from "@/lib/uspbl-api";

interface USPBLStandingsContentProps {
  standings: USPBLStandingsEntry[];
}

export function USPBLStandingsContent({ standings }: USPBLStandingsContentProps) {
  const sorted = [...standings].sort((a, b) => {
    const pctA = parseFloat(a.pct) || 0;
    const pctB = parseFloat(b.pct) || 0;
    if (pctB !== pctA) return pctB - pctA;
    return b.w - a.w;
  });

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Standings</h1>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">Team</th>
                  <th className="text-center py-2 px-2">W</th>
                  <th className="text-center py-2 px-2">L</th>
                  <th className="text-center py-2 px-2">T</th>
                  <th className="text-center py-2 px-2 font-bold">PCT</th>
                  <th className="text-center py-2 px-2">GB</th>
                  <th className="text-center py-2 px-2 hidden sm:table-cell">RS</th>
                  <th className="text-center py-2 px-2 hidden sm:table-cell">RA</th>
                  <th className="text-center py-2 px-2 hidden sm:table-cell">DIFF</th>
                  <th className="text-center py-2 px-2 hidden md:table-cell">L10</th>
                  <th className="text-center py-2 px-2 hidden md:table-cell">STRK</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((entry, i) => (
                  <tr key={entry.teamSlug} className="border-b last:border-0">
                    <td className="py-2 pr-4">
                      <Link
                        href={`/uspbl/teams/${entry.teamSlug}`}
                        className="flex items-center gap-2 hover:underline"
                      >
                        <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                        <span className="font-medium">{entry.team}</span>
                      </Link>
                    </td>
                    <td className="text-center py-2 px-2">{entry.w}</td>
                    <td className="text-center py-2 px-2">{entry.l}</td>
                    <td className="text-center py-2 px-2">{entry.t}</td>
                    <td className="text-center py-2 px-2 font-bold">{entry.pct}</td>
                    <td className="text-center py-2 px-2">{entry.gb}</td>
                    <td className="text-center py-2 px-2 hidden sm:table-cell">{entry.rs}</td>
                    <td className="text-center py-2 px-2 hidden sm:table-cell">{entry.ra}</td>
                    <td className="text-center py-2 px-2 hidden sm:table-cell">{entry.diff}</td>
                    <td className="text-center py-2 px-2 hidden md:table-cell">{entry.l10}</td>
                    <td className="text-center py-2 px-2 hidden md:table-cell">{entry.strk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
