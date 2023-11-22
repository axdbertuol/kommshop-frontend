'use server'

import { cache } from 'react'
import { getApiPath } from '../../config'

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
    if (myRequest.status === 204) {
      return { success: true }
    }
    const json = await myRequest.json()
    return { ...json, success: false }
  } catch (err) {
    console.error(err, 'confirmEmail!')
  }
}

export const cachedConfirmEmail = cache(confirmEmail)
