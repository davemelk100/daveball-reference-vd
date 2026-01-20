import { NextResponse } from "next/server";

const WIKIDATA_API = "https://www.wikidata.org/w/api.php";

const PERSON_KEYWORDS = ["musician", "singer", "guitarist", "drummer", "band"];

async function fetchJson(url: string) {
  const response = await fetch(url, {
    headers: { "User-Agent": "GuidedByNumbers/1.0" },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Wikidata error: ${response.status} ${errorText}`);
  }

  return response.json();
}

function pickBestResult(results: Array<{ id: string; description?: string }>) {
  const match = results.find((result) => {
    const description = result.description?.toLowerCase() || "";
    return PERSON_KEYWORDS.some((keyword) => description.includes(keyword));
  });
  return match || results[0];
}

function getImageFilename(entity: any): string | null {
  const claims = entity?.claims;
  const imageClaim = claims?.P18?.[0]?.mainsnak?.datavalue?.value;
  return typeof imageClaim === "string" ? imageClaim : null;
}

async function searchWikidata(term: string) {
  const searchUrl = `${WIKIDATA_API}?action=wbsearchentities&search=${encodeURIComponent(
    term
  )}&language=en&format=json&limit=5`;
  const searchData = await fetchJson(searchUrl);
  return searchData?.search || [];
}

async function findImageFromResults(results: Array<{ id: string }>) {
  for (const result of results) {
    const entityUrl = `${WIKIDATA_API}?action=wbgetentities&ids=${result.id}&props=claims&format=json`;
    const entityData = await fetchJson(entityUrl);
    const entity = entityData?.entities?.[result.id];
    const filename = getImageFilename(entity);
    if (filename) {
      const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
        filename
      )}`;
      const sourceUrl = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(
        filename
      )}`;
      return { imageUrl, sourceUrl };
    }
  }
  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const results = await searchWikidata(name);
    if (results.length === 0) {
      return NextResponse.json({ imageUrl: null }, { status: 200 });
    }

    const best = pickBestResult(results);
    const prioritized = best ? [best, ...results.filter((r) => r.id !== best.id)] : results;
    const firstPass = await findImageFromResults(prioritized);
    if (firstPass) {
      return NextResponse.json(firstPass);
    }

    const fallbackResults = await searchWikidata(`${name} Guided By Voices`);
    if (fallbackResults.length === 0) {
      return NextResponse.json({ imageUrl: null }, { status: 200 });
    }

    const fallbackBest = pickBestResult(fallbackResults);
    const fallbackPrioritized = fallbackBest
      ? [fallbackBest, ...fallbackResults.filter((r) => r.id !== fallbackBest.id)]
      : fallbackResults;
    const fallbackImage = await findImageFromResults(fallbackPrioritized);
    if (fallbackImage) {
      return NextResponse.json(fallbackImage);
    }

    return NextResponse.json({ imageUrl: null }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
