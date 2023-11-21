import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { authRoutes, protectedRoutes } from './app/lib/routes'
import { defaultLocale, getLocale, locales } from './app/lib/get-locale'
import { getAuthTokens } from './app/lib/get-cookies-list'

export async function middleware(request: NextRequest) {
  // const currentUser = request.cookies.get('user')?.value
  const [, locale, pathname] = request.nextUrl.pathname.split('/')
  console.log(locale, pathname)
  const resultLocale = getLocale(request.headers)
  const authKeyToken = process.env.AUTH_COOKIE_KEY!

  const encryptedAuthCookie = request.cookies.get(authKeyToken)?.value
  const authTokens = encryptedAuthCookie ? await getAuthTokens(encryptedAuthCookie) : null

  if (
    protectedRoutes.find((route) => route.test(pathname)) &&
    (!authTokens || Date.now() > authTokens.tokenExpires)
  ) {
    request.cookies.delete(authKeyToken)
    const response = NextResponse.redirect(new URL(`signin`, request.url))
    response.cookies.delete(authKeyToken)

    return response
  }
  console.log(authTokens?.tokenExpires)
  if (
    authRoutes.find((route) => route.test(pathname)) &&
    authTokens?.tokenExpires &&
    authTokens.tokenExpires > Date.now()
  ) {
    console.log('resultLocale', resultLocale, request.url)
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
