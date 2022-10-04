import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  appendRedirectPath,
  defaultRedirectRoutes,
  redirectPath,
} from "./utils";

const anonymousPath = ["/", "/login", "/forgot-password", "/create-user"];

/**
 * just check for Authorization header token simply allow it as token validation is done on BE
 *
 * in HTTP client is the we get status 401 then call regenerate auth-token api.
 * If that fails then logout the user deleting api
 * @param request
 */
export async function middleware(request: NextRequest) {
  const hasAuthToken = request.headers.get("authorization");
  const isOpenRoute = anonymousPath.includes(request.nextUrl.pathname);

  if (!hasAuthToken) {
    if (isOpenRoute) return NextResponse.next();

    const basePath = request.nextUrl.origin + "/login";
    const redirectPaths = appendRedirectPath(defaultRedirectRoutes.loggedIn);
    const newUrl = new URL(redirectPaths, basePath);
    return NextResponse.redirect(newUrl);
  }

  //if logged in and on anonymous route. redirect to dashboard
  if (isOpenRoute && hasAuthToken) {
    const path = redirectPath(defaultRedirectRoutes.loggedIn);

    return NextResponse.redirect(path);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|static|favicon.ico|_next|_assets).*)"],
};
