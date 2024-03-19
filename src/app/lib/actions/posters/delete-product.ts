'use server'

import authFetch from '../../auth/auth-fetch'
import { ServerErrorResponse } from '@/types'
import { parseServerErrors } from '../../utils'
import { revalidateProds } from '../../cache/revalidators'

export async function deleteProduct(id: number) {
  try {
    const url = new URL('/products/' + id.toString(), process.env.NEXT_URL_PRODUCTS)
    const myRequest = await authFetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      cache: 'no-store',
    } as RequestInit & { user?: string })
    if (myRequest.status === 204) {
      return { success: true }
    }
    const json = (await myRequest.json()) as ServerErrorResponse | unknown
    if (!myRequest.ok || myRequest.status < 200 || myRequest.status > 399) {
      return {
        serverErrors: parseServerErrors(json as ServerErrorResponse),
        success: false,
      }
    }
    await revalidateProds()
  } catch (err) {
    console.error(err, 'failed product post!')
  }
  return { success: false }
}
