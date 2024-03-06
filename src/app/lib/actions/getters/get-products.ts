'use server'
import { FetchResponse, Product, ServerErrorResponse } from '@/types'
import { parseServerErrors } from '../../utils'

export default async function fetchProducts(
  search?: string | null,
  category?: string | null
): Promise<FetchResponse<Product[] | null | undefined>> {
  const url = new URL(`products`, process.env.NEXT_URL_PRODUCTS)
  if (search) url.searchParams.set('search', search)
  if (category) url.searchParams.set('cat', category)
  const myRequest = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    // cache: 'no-store',
    next: { tags: ['get-products'] },
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
        serverErrors: parseServerErrors(json as ServerErrorResponse),
      }
    }
    return { ...response, data: json, success: true }
  } catch (err) {
    return response
  }
}
