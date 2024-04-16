'use server'

import { getApiPath } from '../../config'
import { parseServerErrors } from '../../utils'
import { ServerErrorResponse } from '@/types'

// loginField is either email or username
export async function forgotPassword(email?: string) {
  // const url = new URL(`http://localhost:3334/users/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  try {
    const url = getApiPath('forgotPassword')
    const body = JSON.stringify({ email })
    const myRequest = await fetch(url, {
      method: 'POST',
      body,
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
    console.error(err, 'forgotPassword!')
  }
  return { success: false }
}
