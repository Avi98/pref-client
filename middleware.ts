import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  appendRedirectPath,
  defaultRedirectRoutes,
  redirectPath,
} from "./utils";

const anonymousPath = ["/_next/", "/login", "/forgot-password", "/create-user"];

/**
 * just check for Authorization header token simply allow it as token validation is done on BE
 *
 * in HTTP client is the we get status 401 then call regenerate auth-token api.
 * If that fails then logout the user deleting api
 * @param request
 */
export async function middleware(request: NextRequest) {
  const hasAuthToken = request.cookies.get("REFRESH_TOKEN");
  const isOpenRoute = Boolean(
    anonymousPath.filter((path) => request.nextUrl.pathname.includes(path))
      .length
  );

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
    console.log({ path });
    return NextResponse.redirect(`/${redirect}`);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
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
