'use server'

import { cookies } from 'next/headers'
import authFetch from '../../auth/auth-fetch'
import { HTTP_CODES_ENUM } from '@/enum'

export const signOut = async () => {
  // const url = new URL(`http://localhost:3334/users/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

  try {
    const url = process.env.SIGNOUT_ENDPOINT!
    const myRequest = await authFetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      // cache: 'no-store',
    })
    console.log('signOut', myRequest)
    const json = await myRequest.json()
    console.log('signOut', json)
    if (myRequest.status === HTTP_CODES_ENUM.NO_CONTENT) {
      const cookiesList = cookies()
      const authCookieKey = process.env.AUTH_COOKIE_KEY!
      cookiesList.delete(authCookieKey)
      return { success: true }
    }
    return { success: false }
  } catch (err) {
    console.error(err, 'errro!')
  }
}
