import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { authRoutes, protectedRoutes } from './app/lib/routes'
import { defaultLocale, locales } from './app/lib/get-locale'
import { getAuthTokens } from './app/lib/get-cookies-list'
import { isTokenExpired } from './app/lib/utils'

const handleI18nRouting = createIntlMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
})
export async function middleware(request: NextRequest) {
  // const currentUser = request.cookies.get('user')?.value
  const [, , pathname] = request.nextUrl.pathname.split('/')
  const authKeyToken = process.env.AUTH_COOKIE_KEY!
  const appUrl = process.env.APP_URL

  const encryptedAuthCookie = request.cookies.get(authKeyToken)?.value
  const authTokens = encryptedAuthCookie ? await getAuthTokens(encryptedAuthCookie) : null
  if (
    protectedRoutes.find((route) => route.test(pathname)) &&
    (!authTokens?.tokenExpires || isTokenExpired(authTokens.tokenExpires))
  ) {
    request.cookies.delete(authKeyToken)

    const response = NextResponse.redirect(new URL('/signin', appUrl))
    response.cookies.delete(authKeyToken)

    return response
  }
  if (
    authRoutes.find((route) => route.test(pathname)) &&
    authTokens &&
    Object.values(authTokens).every(Boolean)
  ) {
    return NextResponse.redirect(new URL(`/dashboard`, appUrl))
  }

  const response = handleI18nRouting(request)
  return response
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(pt|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
}
