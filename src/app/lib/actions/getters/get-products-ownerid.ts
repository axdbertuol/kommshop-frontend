import { FetchResponse, Product } from '@/types'
import { cache } from 'react'
import 'server-only'
import { parseServerErrors } from '../../utils'

export const fetchProductsByOwnerId = async (
  id: string
): Promise<FetchResponse<Product[] | null | undefined>> => {
  const url = new URL(`products/o/${id}`, process.env.NEXT_URL_PRODUCTS)

  const myRequest = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    // TODO: when editing or adding new product, revalidate path
    // cache: 'no-store',
    next: { tags: ['get-products-ownerid'], revalidate: 120 },
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
    return { ...response, data: json as Product[], success: true }
  } catch (err: any) {
    return { ...response }
  }
}
const cachedGetProductsByOwnerid = cache(fetchProductsByOwnerId)

export default cachedGetProductsByOwnerid
