import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { authRoutes, protectedRoutes } from './app/lib/routes'
import { cookies } from 'next/headers'
import { defaultLocale, getLocale, locales } from './app/lib/get-locale'

export async function middleware(request: NextRequest) {
  // const currentUser = request.cookies.get('user')?.value

  const resultLocale = getLocale(request.headers)
  const cookiesList = cookies()
  const currentUser = cookiesList.get('user')?.value

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
  ) {
    request.cookies.delete('user')
    const response = NextResponse.redirect(new URL(`${resultLocale}/signin`, request.url))
    response.cookies.delete('user')

    return response
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL(`${resultLocale}/store`, request.url))
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
