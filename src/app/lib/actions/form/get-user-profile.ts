'use server'

import { cache } from 'react'
import authFetch from '../../auth/auth-fetch'
import { ServerErrorResponse, UserProfile } from '@/types'
import { parseServerErrors } from '../../utils'
import { getUser } from '../../get-user'
import { QueryFunctionContext } from '@tanstack/react-query'

export const getUserProfile = async (userId?: number) => {
  if (!userId) {
    try {
      const user = await getUser()
      userId = user?.id
    } catch (error) {
      return { success: false }
    }
  }
  const url = new URL(`user/profile/uid/${userId}`, process.env.ACCOUNTS_URL)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  try {
    const myRequest = await authFetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      // cache: 'no-store',
      // next: { tags: ['get-profile'], revalidate: 10 },
    } as RequestInit & { user?: string })
    const json = (await myRequest.json()) as UserProfile | ServerErrorResponse
    if (!myRequest.ok || myRequest.status < 200 || myRequest.status > 399) {
      return {
        serverErrors: parseServerErrors(json as ServerErrorResponse),
        success: false,
      }
    }

    return { ...(json as UserProfile), success: true }
  } catch (err) {
    console.error(err, 'getMe!')
  }
  return { success: false }
}

export const cachedGetUserProfile = cache(getUserProfile)

export async function fetchUserProfile({ queryKey }: QueryFunctionContext) {
  'use server'
  const [_, id] = queryKey
  return (await getUserProfile(id as number)) as UserProfile
}
