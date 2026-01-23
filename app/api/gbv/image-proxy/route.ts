import { NextRequest, NextResponse } from "next/server";

const ALLOWED_DOMAINS = [
  "i.discogs.com",
  "img.discogs.com",
  "st.discogs.com",
  "s.discogs.com",
  "archive.org",
  "coverartarchive.org",
  "upload.wikimedia.org",
  "commons.wikimedia.org",
  "static.wikia.nocookie.net",
  "hpr1.com",
  "www.fungusboy.net",
  "magnetmagazine.com",
  "subpop-img.s3.amazonaws.com",
  "blogger.googleusercontent.com",
  "images.squarespace-cdn.com",
  "chaoscontrol.com",
  "sun-13.com",
  "i.scdn.co",
  "m.media-amazon.com",
  "beautifulnoise.wordpress.com",
  "www.theurinals.com",
  "i0.wp.com",
  "townsquare.media",
];

function isAllowedDomain(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_DOMAINS.some(
      (domain) =>
        parsed.hostname === domain ||
        parsed.hostname.endsWith(`.${domain}`) ||
        parsed.hostname.endsWith(".archive.org")
    );
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  if (!isAllowedDomain(url)) {
    return NextResponse.json({ error: "Domain not allowed" }, { status: 403 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "MajorLeagueNumbers/1.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
