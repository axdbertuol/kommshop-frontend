'use server'

import { CreateProductDto } from 'shared-kommshop-types'
import { cache } from 'react'
import authFetch from '../../auth/auth-fetch'
import { getApiPath } from '../../config'
import { CausedServerErrorResponse } from '@/types'
import { parseServerErrors } from '../../utils'

type CreateProductBody = CreateProductDto & {
  ownerUsername: string
  ownerId: number
}

export const postProduct = async (body: CreateProductDto, image?: any) => {
  // const url = new URL(`http://localhost:3334/users/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   const newBody = {
  //     ...body,
  //     ownerId:
  //   }
  try {
    const url = new URL('', process.env.NEXT_URL_PRODUCTS)
    const myRequest = await authFetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
      // cache: 'no-store',
    } as RequestInit & { user?: string })
    const json = (await myRequest.json()) as CreateProductDto | CausedServerErrorResponse
    if (!myRequest.ok || myRequest.status < 200 || myRequest.status > 399) {
      return {
        serverErrors: parseServerErrors((json as CausedServerErrorResponse).cause),
        success: false,
      }
    }
    return { ...(json as CreateProductDto), success: myRequest.status === 204 }
  } catch (err) {
    console.error(err, 'getMe!')
  }
  return { success: false }
}

export const cachedGetMe = cache(postProduct)
