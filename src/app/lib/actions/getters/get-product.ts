import { FetchResponse, Product } from '@/types'
import { cache } from 'react'
import 'server-only'
import { parseServerErrors } from '../../utils'

export const fetchProduct = async (
  id: string
): Promise<FetchResponse<Product | null | undefined>> => {
  const url = new URL(`products/${id}`, process.env.NEXT_URL_PRODUCTS)

  const myRequest = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    // cache: 'no-store',
  })

  const response = {
    data: null,
    success: false,
    serverErrors: null,
  }

  try {
    const json = await myRequest.json()
    if (!myRequest.ok) {
      return {
        ...response,
        serverErrors: parseServerErrors(json),
      }
    }
    return { ...response, data: json, success: true }
  } catch (err: any) {
    return { ...response }
  }
}
const getProduct = cache(fetchProduct)

export default getProduct
