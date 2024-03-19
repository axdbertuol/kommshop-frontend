'use server'

import authFetch from '../../auth/auth-fetch'
import { getApiPath } from '../../config'
import { CausedServerErrorResponse } from '@/types'
import { parseServerErrors } from '../../utils'
import { ProfileEdit } from './submit-user-edit'
import { getUser } from '../../get-user'

export async function patchMe(profile: ProfileEdit) {
  // const url = new URL(`http://localhost:3334/users/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  try {
    const user = await getUser()
    const url = getApiPath('patchMe') + '/' + user?.id
    const myRequest = await authFetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(profile),
      cache: 'no-store',
    } as RequestInit & { user?: string })
    const json = (await myRequest.json()) as ProfileEdit | CausedServerErrorResponse
    if (!myRequest.ok || myRequest.status < 200 || myRequest.status > 399) {
      return {
        serverErrors: parseServerErrors((json as CausedServerErrorResponse).cause),
        success: false,
      }
    }
    return { ...(json as ProfileEdit), success: true }
  } catch (err) {
    console.error(err, 'patchMe!')
  }
  return { success: false }
}
