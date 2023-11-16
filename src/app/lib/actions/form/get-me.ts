'use server'

import { CreateUserDto } from 'shared-kommshop-types'
import authFetch from '../../auth/auth-fetch'
import { cookies } from 'next/headers'

export const getMe = async () => {
  // const url = new URL(`http://localhost:3334/users/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const url = process.env.GET_ME_ENDPOINT!
  const cookiesList = cookies()
  try {
    const myRequest = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookiesList.get('token')?.value,
      },
      // cache: 'no-store',
      user: cookiesList.get('user')?.value ?? '',
    } as RequestInit & { user?: string })
    const json = (await myRequest.json()) as CreateUserDto
    if (myRequest.status === 204) {
      return { ...json, success: true }
    }
    return { ...json, success: false }
  } catch (err) {
    console.error(err, 'errro!')
  }
}
