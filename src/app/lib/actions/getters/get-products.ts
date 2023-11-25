import { Product } from '@/types/common'
import { cache } from 'react'
import 'server-only'

export const fetchProducts = async (search?: string | null, category?: string | null) => {
  const url = new URL(`products`, process.env.NEXT_URL_PRODUCTS)
  if (search) url.searchParams.set('search', search)
  if (category) url.searchParams.set('cat', category)
  const myRequest = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    // cache: 'no-store',
  })
  if (!myRequest.ok) {
    throw new Error(myRequest.statusText)
  }
  try {
    const json = await myRequest.json()
    return json as Product[] | null | undefined
  } catch (err: any) {
    throw new Error('JSON error: ' + err.message)
  }
}
const getProducts = cache(fetchProducts)

export default getProducts
