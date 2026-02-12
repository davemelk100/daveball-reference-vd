import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { getPlayerHeadshotUrl, type Player } from "@/lib/mlb-api"

interface PlayerCardProps {
  player: Player
}

export function PlayerCard({ player }: PlayerCardProps) {
  const positionAbbreviation = player.primaryPosition?.abbreviation

  return (
    <Link href={`/mlb/players/${player.id}`}>
      <Card className="hover:bg-secondary/50 transition-colors cursor-pointer h-full">
        <CardContent className="p-1.5 pl-3">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <Image
                src={getPlayerHeadshotUrl(player.id, "small") || "/placeholder.svg"}
                alt={player.fullName}
                width={96}
                height={96}
                className="rounded-lg h-24"
                style={{ width: "auto" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{player.fullName}</p>
              <p className="text-sm text-muted-foreground truncate">{player.currentTeam?.name || "Free Agent"}</p>
              <div className="flex items-center gap-2 mt-0.5">
                {positionAbbreviation && positionAbbreviation !== "—" && (
                  <Badge variant="secondary">{positionAbbreviation}</Badge>
                )}
                {player.active && (
                  <Badge variant="outline" className="border-green-500/50 text-green-600 dark:text-green-400">
                    Active
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
