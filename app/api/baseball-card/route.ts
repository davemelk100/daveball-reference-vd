import { type NextRequest, NextResponse } from "next/server";
import {
  searchBaseballCard,
  searchBaseballCards,
  isEbayConfigured,
} from "@/lib/ebay-api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");
  const limit = searchParams.get("limit");

  if (!name) {
    return NextResponse.json(
      { error: "Player name is required" },
      { status: 400 }
    );
  }

  if (!isEbayConfigured()) {
    return NextResponse.json(
      { error: "eBay API not configured" },
      { status: 503 }
    );
  }

  try {
    if (limit && parseInt(limit) > 1) {
      // Return multiple cards
      const cards = await searchBaseballCards(name, parseInt(limit));
      return NextResponse.json({ cards });
    } else {
      // Return single card
      const card = await searchBaseballCard(name);
      if (!card) {
        return NextResponse.json(
          { error: "No baseball card found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ card });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching baseball card:", message);
    return NextResponse.json(
      { error: "Failed to fetch baseball card", message },
      { status: 500 }
    );
  }
}
