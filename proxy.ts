import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { USER_LOCALE_KEY } from "./constants";

export async function proxy(request: NextRequest) {
  const defaultLocale = 'id';
  // 1. Check if the locale cookie already exists
  const localeCookie = request.cookies.get(USER_LOCALE_KEY);

  if (localeCookie) {
    // Cookie exists, let the request continue
    return NextResponse.next();
  }

  // 2. Cookie is missing. This is the "first render".
  // Let's determine the default.
  // (For a more advanced setup, you'd parse `request.headers.get('accept-language')` here)
  const chosenLocale = defaultLocale; 

  // 3. Create a response and set the new cookie
  const response = NextResponse.next();
  response.cookies.set(USER_LOCALE_KEY, chosenLocale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  const supabaseCookies = await updateSession(request);

  // Combine supabaseCookies with the response cookies
  if (supabaseCookies) {
    for (const [key, value] of Object.entries(supabaseCookies)) {
      response.cookies.set(key, value);
    }
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
