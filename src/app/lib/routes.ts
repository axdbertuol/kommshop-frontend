import { getLocale } from './get-locale'

export const protectedRoutes = [/dashboard.*/, /settings.*/, /confirm-email$/]
export const authRoutes = [/signin$/, /signup$/]
export const publicRoutes = ['/store', '/']
export const getRoutesWithLocale = (headers: Headers, routes: string[]) =>
  routes.map((path) => `/${getLocale(headers)}${path}`)
