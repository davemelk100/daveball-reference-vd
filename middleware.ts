import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TOPIC_PATHS } from "@/lib/topic-routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/t/")) {
    return NextResponse.next();
  }

  const [, , topic, ...rest] = pathname.split("/");
  const basePath = TOPIC_PATHS[topic || ""];

  if (!basePath) {
    return NextResponse.next();
  }

  const restPath = rest.length ? `/${rest.join("/")}` : "";
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `${basePath}${restPath}`;

  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ["/t/:path*"],
};
