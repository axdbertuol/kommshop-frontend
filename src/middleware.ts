import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authRoutes, protectedRoutes } from './app/lib/routes'
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {
  // const currentUser = request.cookies.get('user')?.value
  const cookiesList = cookies()
  const currentUser = cookiesList.get('user')?.value
  console.log('cookies middleware', currentUser, cookiesList)
  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
  ) {
    request.cookies.delete('user')
    const response = NextResponse.redirect(new URL('/auth/signin', request.url))
    response.cookies.delete('user')

    return response
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL('/store', request.url))
  }
}
