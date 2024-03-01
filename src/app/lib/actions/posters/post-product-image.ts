'use server'

import { ImgBBResponse } from '@/types'
import { cache } from 'react'
import authFetch from '../../auth/auth-fetch'

export const postProductImage = async (body: FormData) => {
  try {
    const bbImgUrl = process.env.BB_IMG_URL
    if (!bbImgUrl) return { success: false, error: 'bb IMG URL not provided' }
    const url = new URL(bbImgUrl)

    const bbImgKey = process.env.BB_IMG_KEY
    if (!bbImgKey) return { success: false, error: 'bb api key not provided' }
    url.searchParams.append('key', bbImgKey)

    console.log('url', url)
    const myRequest = await authFetch(url, {
      method: 'POST',
      body,
      cache: 'no-store',
    } as RequestInit)
    const json = (await myRequest.json()) as ImgBBResponse
    if (!myRequest.ok || myRequest.status < 200 || myRequest.status > 399) {
      return {
        // serverErrors: parseServerErrors(json as ServerErrorResponse),
        success: false,
      }
    }
    return { ...json, success: json.success }
  } catch (err) {
    console.error(err, 'upload product image!')
  }
  return { success: false }
}

export const postProdImageCached = cache(postProductImage)
