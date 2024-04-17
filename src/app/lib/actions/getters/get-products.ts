'use server'
import { FetchResponse, Product, ServerErrorResponse } from '@/types'
import { parseServerErrors } from '../../utils'

export default async function fetchProducts(
  search?: string | null,
  category?: string | null,
  options?: {
    page?: number
  } | null
): Promise<FetchResponse<Product[] | null | undefined>> {
  const url = new URL(
    `products?page=` + options?.page ?? 1,
    process.env.NEXT_URL_PRODUCTS
  )
  if (search) url.searchParams.set('search', search)
  if (category) url.searchParams.set('cat', category)
  const response = {
    data: null,
    success: false,
    serverErrors: null,
  }
  try {
    const myRequest = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      // cache: 'no-store',
      next: {
        tags: [
          'get-products',
          search ?? '',
          category ?? '',
          options?.page?.toString() ?? '1',
        ],
        revalidate: 3600,
      },
    })
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
