'use server'

import { cache } from 'react'
import authFetch from '../../auth/auth-fetch'
import { CreateProduct, ServerErrorResponse } from '@/types'
import { parseServerErrors } from '../../utils'
import { getUser } from '../../get-user'
import { revalidateTag } from 'next/cache'

type CreateProductBody = CreateProduct & {
  ownerUsername: string
  ownerId: number
}

export const postProduct = async (body: CreateProduct) => {
  const user = await getUser()
  const newBody = {
    ...body,
    ownerId: user?.id,
    ownerUsername: user?.username,
  } as CreateProductBody

  try {
    const url = new URL('', process.env.NEXT_URL_PRODUCTS)
    const myRequest = await authFetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(newBody),
      cache: 'no-store',
    } as RequestInit & { user?: string })
    const json = (await myRequest.json()) as CreateProduct | ServerErrorResponse
    console.log('json', json, myRequest.status, myRequest.ok)
    if (!myRequest.ok || myRequest.status < 200 || myRequest.status > 399) {
      return {
        serverErrors: parseServerErrors(json as ServerErrorResponse),
        success: false,
      }
    }
    // revalidateTag('get-products')
    return { ...(json as CreateProduct & { id: number }), success: true }
  } catch (err) {
    console.error(err, 'failed product post!')
  }
  return { success: false }
}

export const cachedPostProduct = cache(postProduct)
