'use server'

import authFetch from '../../auth/auth-fetch'
import { ServerErrorResponse, UserProfile } from '@/types'
import { parseServerErrors } from '../../utils'
import { QueryFunctionContext } from '@tanstack/react-query'
import { getUser } from '../../get-user'

export async function getUserProfile(userId?: string) {
  const response = {
    data: undefined,
    success: false,
    serverErrors: undefined,
  }
  if (!userId) {
    try {
      const user = await getUser()
      userId = user?.id
    } catch (error) {
      return { success: false }
    }
  }
  const url = new URL(`/user/profile/${userId}`, process.env.ACCOUNTS_URL)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  try {
    const myRequest = await authFetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      // cache: 'no-store',
      next: { tags: ['get-profile', userId], revalidate: 1000 },
    } as RequestInit & { user?: string })
    const json = (await myRequest.json()) as UserProfile | ServerErrorResponse
    if (!myRequest.ok || myRequest.status < 200 || myRequest.status > 399) {
      return {
        serverErrors: parseServerErrors(json as ServerErrorResponse),
        success: false,
      }
    }

    return { data: { ...(json as UserProfile) }, success: true }
  } catch (err) {
    console.error(err, 'getMe!')
  }
  return { ...response, success: false }
}

export async function fetchUserProfile({ queryKey }: QueryFunctionContext) {
  'use server'
  const [_, id] = queryKey
  const profile = await getUserProfile(id as string)
  if (profile.success) {
    return {
      email: profile.data?.email,
      username: profile.data?.username,
      firstName: profile.data?.firstName,
      lastName: profile.data?.lastName,
      createdAt: profile.data?.createdAt,
      success: profile.success,
    }
  }
  return { success: false }
}
