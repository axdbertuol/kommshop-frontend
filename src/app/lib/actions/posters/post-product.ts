'use server'

import authFetch from '../../auth/auth-fetch'
import { CreateProduct, Product, ServerErrorResponse } from '@/types'
import { parseServerErrors } from '../../utils'
import { getUser } from '../../get-user'
import { revalidateProds } from '../../cache/revalidators'

type CreateProductBody = CreateProduct & {
  userId: string
}

export default async function postProduct(body: CreateProduct) {
  const user = await getUser()
  const newBody = {
    ...body,
    userId: user?.id,
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
    if (!myRequest.ok || myRequest.status < 200 || myRequest.status > 399) {
      return {
        serverErrors: parseServerErrors(json as ServerErrorResponse),
        success: false,
      }
    }
    await revalidateProds((json as Product).slug, (json as Product).id)
    return { ...(json as CreateProduct & { id: number }), success: true }
  } catch (err) {
    console.error(err, 'failed product post!')
  }
  return { success: false }
}
