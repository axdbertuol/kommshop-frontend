'use server'

import { cache } from 'react'
import { getApiPath } from '../../config'
import { parseServerErrors } from '../../utils'
import { CausedServerErrorResponse } from '@/types'

export const confirmEmail = async (hash: string) => {
  // const url = new URL(`http://localhost:3334/users/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

  try {
    const url = getApiPath('confirmEmail')
    const myRequest = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ hash }),
      headers: { 'Content-Type': 'application/json' },
      // cache: 'no-store',
    })
    if (!myRequest.ok || myRequest.status < 200 || myRequest.status > 399) {
      const json = (await myRequest.json()) as CausedServerErrorResponse
      return {
        serverErrors: parseServerErrors(json.cause),
        success: false,
      }
    }
    return { success: myRequest.status === 204 }
  } catch (err) {
    console.error(err, 'confirmEmail!')
  }
}

export const cachedConfirmEmail = cache(confirmEmail)
