import { Product } from '@/types/common'
import { cache } from 'react'
import 'server-only'

export const fetchProduct = async (id: string) => {
  const url = new URL(`http://localhost:3333/products/${id}`)
  try {
    const myRequest = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      // cache: 'no-store',
    })
    const json = await myRequest.json()
    return json as Product | null | undefined
  } catch (err) {
    console.error(err, 'errro!')
  }
}
const getProduct = cache(fetchProduct)

export default getProduct
