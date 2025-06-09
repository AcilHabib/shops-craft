import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const [main, locale, brand, ...segments] =
    request.nextUrl.pathname.split("/");

  if (brand !== "arcodym" && brand !== "midea") {
    const newPathname = `${main}/${locale || "ar"}/arcodym/${segments.join("/")}`;
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "fr", "ar"],

    // Used when no locale matches
    defaultLocale: "fr",
    localePrefix: "always",
  });
  const response = handleI18nRouting(request);
  return response;
}
export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(fr|en|ar)/:path*"],
};
