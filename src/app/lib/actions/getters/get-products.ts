import { Product } from '@/types/common'
import { cache } from 'react'
import 'server-only'

export const fetchProducts = async (search?: string | null, category?: string | null) => {
  const url = new URL(`http://localhost:3333/products`)
  if (search) url.searchParams.set('search', search)
  if (category) url.searchParams.set('cat', category)
  try {
    const myRequest = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      // cache: 'no-store',
    })
    const json = await myRequest.json()
    return json as Product[] | null | undefined
  } catch (err) {
    console.error(err, 'errro!')
  }
}
const getProducts = cache(fetchProducts)

export default getProducts
