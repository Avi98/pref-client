import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  appendRedirectPath,
  defaultRedirectRoutes,
  redirectPath,
} from "./utils";

const ROOT_PATH = "/";
const anonymousPath = [
  "/_next/",
  "/login",
  "/forgot-password",
  "/create-user",
  "/notify-user",
];

export async function middleware(request: NextRequest) {
  const hasAuthToken = request.cookies.get("REFRESH_TOKEN");
  const isOpenRoute = Boolean(
    anonymousPath.filter((path) => request.nextUrl.pathname.includes(path))
      .length
  );

  if (request.nextUrl.pathname === ROOT_PATH) return NextResponse.next();

  if (!hasAuthToken) {
    if (isOpenRoute) return NextResponse.next();

    const basePath = request.nextUrl.origin + "/login";
    const redirectPaths = appendRedirectPath(defaultRedirectRoutes.loggedIn);
    const newUrl = new URL(redirectPaths, basePath);
    return NextResponse.redirect(newUrl);
  }

  //if logged in and on anonymous route. redirect to dashboard
  if (isOpenRoute && hasAuthToken) {
    const path = redirectPath("", defaultRedirectRoutes.loggedIn);
    const redirect = new URL(path, request.nextUrl.origin);
    return NextResponse.redirect(`/${redirect}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     * - _next dir
     * _ _assets
     */
    "/((?!api|static|_next|_assets|favicon.ico).*)",
  ],
};
