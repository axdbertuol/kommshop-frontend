'use server'

import { cookies } from 'next/headers'
import authFetch from '../../auth/auth-fetch'
import { HTTP_CODES_ENUM } from '@/enum'
import { revalidatePath } from 'next/cache'
import { getApiPath } from '../../config'

export const signOut = async () => {
  try {
    const url = getApiPath('signout')

    const myRequest = await authFetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      cache: 'no-store',
    })
    console.log('signOut', myRequest)
    if (myRequest.status === HTTP_CODES_ENUM.NO_CONTENT) {
      const cookiesList = cookies()
      const authCookieKey = process.env.AUTH_COOKIE_KEY!
      cookiesList.delete(authCookieKey)
      revalidatePath('/')
      return { success: true }
    }
  } catch (err) {
    console.error(err, 'signOut!')
  }
  return { success: false }
}
