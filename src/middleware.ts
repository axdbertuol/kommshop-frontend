import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { authRoutes, protectedRoutes } from './app/lib/routes'
import { defaultLocale, locales } from './app/lib/get-locale'
import { getAuthTokens } from './app/lib/get-cookies-list'
import { isTokenExpired } from './app/lib/utils'

export async function middleware(request: NextRequest) {
  // const currentUser = request.cookies.get('user')?.value
  const [, locale, pathname] = request.nextUrl.pathname.split('/')
  const authKeyToken = process.env.AUTH_COOKIE_KEY!

  const encryptedAuthCookie = request.cookies.get(authKeyToken)?.value
  const authTokens = encryptedAuthCookie ? await getAuthTokens(encryptedAuthCookie) : null

  if (
    protectedRoutes.find((route) => route.test(pathname)) &&
    (!authTokens?.tokenExpires || isTokenExpired(authTokens.tokenExpires))
  ) {
    request.cookies.delete(authKeyToken)
    const response = NextResponse.redirect(new URL(`signin`, request.url))
    response.cookies.delete(authKeyToken)

    return response
  }
  console.log(authTokens?.tokenExpires)
  if (
    authRoutes.find((route) => route.test(pathname)) &&
    authTokens &&
    Object.values(authTokens).every((token) => token)
  ) {
    return NextResponse.redirect(new URL(`store`, request.url))
  }
  const handleI18nRouting = createIntlMiddleware({
    locales: locales,
    defaultLocale: defaultLocale,
  })
  const response = handleI18nRouting(request)
  return response
}

export const config = {
  matcher: ['/', '/((?!.+\\.[\\w]+$|_next).*)', '/(pt|en)/:path*'],
}
