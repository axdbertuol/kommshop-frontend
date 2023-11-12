'use server'

import { User } from 'auth'
import authFetch from '../../auth/auth-fetch'

export const signOut = async () => {
  // const url = new URL(`http://localhost:3334/users/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

  try {
    const url = process.env.SIGNOUT_ENDPOINT!
    const myRequest = await authFetch(url, {
      headers: { 'Content-Type': 'application/json' },
      // cache: 'no-store',
    })
    const json = (await myRequest.json()) as User
    if (myRequest.status === 204) {
      return { ...json, success: true }
    }
    return { ...json, success: false }
  } catch (err) {
    console.error(err, 'errro!')
  }
}
