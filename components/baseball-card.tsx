"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";

interface BaseballCardData {
  imageUrl: string;
  title: string;
  price?: string;
  currency?: string;
  itemUrl?: string;
  condition?: string;
}

interface BaseballCardProps {
  playerName: string;
}

export function BaseballCard({ playerName }: BaseballCardProps) {
  const [card, setCard] = useState<BaseballCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCard() {
      try {
        const response = await fetch(
          `/api/baseball-card?name=${encodeURIComponent(playerName)}`
        );

        if (!response.ok) {
          setError(true);
          return;
        }

        const data = await response.json();
        setCard(data.card);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCard();
  }, [playerName]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Baseball Card</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error || !card) {
    return null; // Don't show anything if no card found
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Baseball Card</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="relative aspect-[2.5/3.5] w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={card.imageUrl}
            alt={card.title}
            fill
            className="object-contain"
            unoptimized // eBay images are external
          />
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {card.title}
          </p>
          {card.price && (
            <p className="text-sm font-medium">
              {card.currency === "USD" ? "$" : card.currency}
              {card.price}
            </p>
          )}
          {card.itemUrl && (
            <a
              href={card.itemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              View on eBay
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface BaseballCardGalleryProps {
  playerName: string;
  limit?: number;
}

function getEbaySearchUrl(query: string): string {
  const params = new URLSearchParams({
    _nkw: `${query} baseball card`,
  });
  return `https://www.ebay.com/sch/i.html?${params.toString()}`;
}

export function BaseballCardGallery({
  playerName,
  limit = 4,
}: BaseballCardGalleryProps) {
  const [cards, setCards] = useState<BaseballCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch(
          `/api/baseball-card?name=${encodeURIComponent(
            playerName
          )}&limit=${limit}`
        );

        if (!response.ok) {
          let message = "Unable to load baseball cards.";
          try {
            const data = await response.json();
            if (data?.error) {
              message = data.error;
            }
          } catch {
            // ignore parse error
          }
          setError(message);
          setCards([]);
          return;
        }

        const data = await response.json();
        setCards(data.cards || []);
      } catch {
        setError("Unable to load baseball cards.");
        setCards([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, [playerName, limit]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Baseball Cards</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (cards.length === 0) {
    const searchUrl = getEbaySearchUrl(playerName);
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Baseball Cards on eBay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>{error || "No baseball cards found for this player."}</p>
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Search on eBay
            <ExternalLink className="h-3 w-3" />
          </a>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Baseball Cards on eBay</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {cards.map((card, index) => (
            <a
              key={index}
              href={card.itemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-[2.5/3.5] w-full overflow-hidden rounded-lg bg-muted">
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  className="object-contain transition-transform group-hover:scale-105"
                  unoptimized
                />
              </div>
              {card.price && (
                <p className="mt-1 text-xs font-medium text-center">
                  ${card.price}
                </p>
              )}
            </a>
          ))}
        </div>
        <p className="mt-3 text-xs text-center text-muted-foreground">
          Powered by eBay
        </p>
      </CardContent>
    </Card>
  );
}
