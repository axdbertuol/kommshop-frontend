'use server'

import { CreateUserDto } from 'shared-kommshop-types'
import { cache } from 'react'
import authFetch from '../../auth/auth-fetch'
import { getApiPath } from '../../config'
import { CausedServerErrorResponse } from '@/types'
import { parseServerErrors } from '../../utils'

export const getMe = async () => {
  // const url = new URL(`http://localhost:3334/users/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  try {
    const url = getApiPath('getMe')
    const myRequest = await authFetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      // cache: 'no-store',
    } as RequestInit & { user?: string })
    const json = (await myRequest.json()) as CreateUserDto | CausedServerErrorResponse
    if (!myRequest.ok || myRequest.status < 200 || myRequest.status > 399) {
      return {
        serverErrors: parseServerErrors((json as CausedServerErrorResponse).cause),
        success: false,
      }
    }
    return { ...(json as CreateUserDto), success: myRequest.status === 204 }
  } catch (err) {
    console.error(err, 'getMe!')
  }
  return { success: false }
}

export const cachedGetMe = cache(getMe)
