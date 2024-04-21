'use server'

import authFetch from '../../auth/auth-fetch'
import { getApiPath } from '../../config'
import { ProfileMeEditReq, ServerErrorResponse, UserProfile } from '@/types'
import { isGoodHTTPResponseStatus, parseServerErrors } from '../../utils'
import { getUser } from '../../get-user'

export async function patchMe(profile: ProfileMeEditReq) {
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
    const json = (await myRequest.json()) as UserProfile | ServerErrorResponse
    if (!myRequest.ok || !isGoodHTTPResponseStatus(myRequest.status)) {
      return {
        serverErrors: parseServerErrors(json as ServerErrorResponse),
        success: false,
      }
    }
    return { success: true }
  } catch (err) {
    console.error(err, 'patchMe!')
  }
  return { success: false }
}
