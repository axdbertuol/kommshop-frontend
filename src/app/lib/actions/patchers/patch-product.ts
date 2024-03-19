'use server'

import authFetch from '../../auth/auth-fetch'
import { EditProduct, Product, ServerErrorResponse } from '@/types'
import { parseServerErrors } from '../../utils'

export const patchProduct = async (idParam: string, body: EditProduct) => {
  try {
    const url = new URL('/products/' + idParam, process.env.NEXT_URL_PRODUCTS)
    const myRequest = await authFetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(body),
      cache: 'no-store',
    } as RequestInit & { user?: string })
    const json = (await myRequest.json()) as Product | ServerErrorResponse
    if (!myRequest.ok || myRequest.status < 200 || myRequest.status > 399) {
      return {
        serverErrors: parseServerErrors(json as ServerErrorResponse),
        success: false,
      }
    }

    return { ...(json as Product & { id: number }), success: true }
  } catch (err) {
    console.error(err, 'failed product post!')
  }
  return { success: false }
}
