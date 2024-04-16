'use server'

import authFetch from '../../auth/auth-fetch'
import { getApiPath } from '../../config'
import { parseServerErrors } from '../../utils'
import { ServerErrorResponse } from '@/types'

// loginField is either email or username
export async function resetPassword(newPassword: string, token: string) {
  // const url = new URL(`http://localhost:3334/users/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  try {
    const url = getApiPath('resetPassword')
    const myRequest = await authFetch(url, {
      method: 'POST',
      body: JSON.stringify({ password: newPassword, token: token }),
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (!myRequest.ok || myRequest.status < 200 || myRequest.status > 399) {
      const json = (await myRequest.json()) as ServerErrorResponse
      return {
        serverErrors: parseServerErrors(json),
        success: false,
      }
    }
    return { success: myRequest.status === 204 }
  } catch (err) {
    console.error(err, 'resetPassword!')
  }
}
