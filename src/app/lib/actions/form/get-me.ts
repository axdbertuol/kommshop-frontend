'use server'

import { CreateUserDto } from 'shared-kommshop-types'
import { cache } from 'react'
import authFetch from '../../auth/auth-fetch'

export const getMe = async () => {
  // const url = new URL(`http://localhost:3334/users/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  try {
    const url = process.env.GET_ME_ENDPOINT!
    const myRequest = await authFetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      // cache: 'no-store',
    } as RequestInit & { user?: string })
    const json = (await myRequest.json()) as CreateUserDto
    return { ...json, success: myRequest.status === 204 }
  } catch (err) {
    console.error(err, 'errro!')
  }
  return { success: false }
}

export const cachedGetMe = cache(getMe)
