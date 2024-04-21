import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { authRoutes, protectedRoutes } from './app/lib/routes'
import { defaultLocale, locales } from './app/lib/get-locale'
import { getAuthTokens, setAuthCookies } from './app/lib/get-cookies-list'
import { isTokenExpired } from './app/lib/utils'
import { refreshTokenApi } from './app/lib/actions/form/refresh-token'

const handleI18nRouting = createIntlMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
})
export async function middleware(request: NextRequest) {
  const [, , pathname] = request.nextUrl.pathname.split('/')
  const authKeyToken = process.env.AUTH_COOKIE_KEY!
  const appUrl = process.env.APP_URL

  const encryptedAuthCookie = request.cookies.get(authKeyToken)?.value
  const authTokens = encryptedAuthCookie ? await getAuthTokens(encryptedAuthCookie) : null
  let response = handleI18nRouting(request)

  if (
    protectedRoutes.find((route) => route.test(pathname)) &&
    (!authTokens?.tokenExpires || isTokenExpired(authTokens.tokenExpires))
  ) {
    const headers = new Headers()
    headers.set('Authorization', 'Bearer ' + authTokens?.token)
    const refreshResp = await refreshTokenApi({
      refreshToken: authTokens?.refreshToken ?? '',
      headers,
    })
    if (!refreshResp.success) {
      request.cookies.delete(authKeyToken)
      response = NextResponse.redirect(new URL('/signin', appUrl))
      response.cookies.delete(authKeyToken)
      return response
    } else {
      await setAuthCookies(refreshResp, response)
    }
  }
  if (
    authRoutes.find((route) => route.test(pathname)) &&
    authTokens &&
    Object.values(authTokens).every(Boolean)
  ) {
    return NextResponse.redirect(new URL(`/dashboard`, appUrl))
  }

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
