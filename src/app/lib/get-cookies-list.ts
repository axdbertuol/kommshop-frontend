import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

export async function getCookiesList(): Promise<RequestCookie[]> {
  const cookieData = cookies().getAll()
  return new Promise((resolve) => resolve(cookieData))
}
