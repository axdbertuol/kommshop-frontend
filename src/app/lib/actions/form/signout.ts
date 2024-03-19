'use server'

import { cookies } from 'next/headers'
import { revalidatePath, revalidateTag } from 'next/cache'

export const signOut = async () => {
  try {
    const cookiesList = cookies()
    const authCookieKey = process.env.AUTH_COOKIE_KEY!
    cookiesList.delete(authCookieKey)
    revalidatePath('/')
    revalidateTag('my-app-user')
    return { success: true }
  } catch (err) {
    console.error(err, 'signOut!')
  }
  return { success: false }
}
