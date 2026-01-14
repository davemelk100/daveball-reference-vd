"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import Image from "next/image"
import { getPlayerHeadshotUrl } from "@/lib/mlb-api"

interface Leader {
  rank: number
  person: {
    id: number
    fullName: string
  }
  team?: {
    id: number
    name: string
    abbreviation?: string
  }
  value: string
}

interface LeadersTableProps {
  title: string
  leaders: Leader[]
  statLabel: string
}

export function LeadersTable({ title, leaders, statLabel }: LeadersTableProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">{statLabel}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaders.slice(0, 5).map((leader) => (
              <TableRow key={leader.person.id}>
                <TableCell className="text-center text-muted-foreground">{leader.rank}</TableCell>
                <TableCell>
                  <Link href={`/players/${leader.person.id}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Image
                      src={getPlayerHeadshotUrl(leader.person.id, "small") || "/placeholder.svg"}
                      alt={leader.person.fullName}
                      width={40}
                      height={40}
                      className="rounded-lg shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <div className="font-medium">{leader.person.fullName}</div>
                      {leader.team && <div className="text-xs text-muted-foreground">{leader.team.name}</div>}
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-right font-mono font-semibold">{leader.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
