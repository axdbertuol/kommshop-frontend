import { Product } from '@/components/ProductList'
import { cache } from 'react'
import 'server-only'

export const preload = (id: string) => {
  void getProducts(id)
}
export const getProducts = cache(
  async (search?: string | null, category?: string | null) => {
    const url = new URL(`http://localhost:3333/products`)
    if (search) url.searchParams.set('search', search)
    if (category) url.searchParams.set('cat', category)
    try {
      const myRequest = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      })
      console.log('req', myRequest)
      return (await myRequest.json()) as Product[] | null | undefined
    } catch (err) {
      console.error(err, 'errro!')
    }
  }
)
