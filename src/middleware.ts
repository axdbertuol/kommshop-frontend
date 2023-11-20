import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { authRoutes, getRoutesWithLocale, protectedRoutes } from './app/lib/routes'
import { defaultLocale, getLocale, locales } from './app/lib/get-locale'
import { getAuthTokens, getEncryptedAuthCookie } from './app/lib/get-cookies-list'

export async function middleware(request: NextRequest) {
  // const currentUser = request.cookies.get('user')?.value

  const resultLocale = getLocale(request.headers)
  const authKeyToken = process.env.AUTH_COOKIE_KEY!

  const encryptedAuthCookie = request.cookies.get(authKeyToken)?.value
  const authTokens = encryptedAuthCookie ? await getAuthTokens(encryptedAuthCookie) : null

  if (
    getRoutesWithLocale(request.headers, protectedRoutes).includes(
      request.nextUrl.pathname
    ) &&
    (!authTokens || Date.now() > authTokens.tokenExpires)
  ) {
    request.cookies.delete(authKeyToken)
    const response = NextResponse.redirect(new URL(`signin`, request.url))
    response.cookies.delete(authKeyToken)

    return response
  }

  if (
    getRoutesWithLocale(request.headers, authRoutes).includes(request.nextUrl.pathname) &&
    authTokens?.user
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
  matcher: ['/', '/(pt|en)/:path*'],
}
