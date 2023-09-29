import { Product } from '@/components/ProductList'
import { cache } from 'react'
import 'server-only'

export const preload = (id: string) => {
  void getProducts(id)
}
export const getProducts = cache(async (search?: string | null) => {
  try {
    const myRequest = await fetch(
      new URL(`http://localhost:3333/products${search ? `?cat=${search}` : ''}`),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    console.log('req', myRequest)
    return (await myRequest.json()) as Product[] | null | undefined
  } catch (err) {
    console.error(err, 'errro!')
  }
})
