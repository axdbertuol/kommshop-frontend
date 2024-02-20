import { getLocale } from './get-locale'

export const protectedRoutes = [/dashboard/]
export const authRoutes = [/signin$/, /signup$/, /confirm-email$/]
export const publicRoutes = ['/store', '/']
export const getRoutesWithLocale = (headers: Headers, routes: string[]) =>
  routes.map((path) => `/${getLocale(headers)}${path}`)
