import { Product } from '@/types/common'
import { cache } from 'react'
import 'server-only'

export const fetchProduct = async (id: string) => {
  const url = new URL(`products/${id}`, process.env.NEXT_URL_PRODUCTS)

  const myRequest = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    // cache: 'no-store',
  })
  if (!myRequest.ok) {
    throw new Error(myRequest.statusText)
  }
  try {
    const json = await myRequest.json()
    return json as Product | null | undefined
  } catch (err: any) {
    throw new Error('JSON error: ' + err.message)
  }
}
const getProduct = cache(fetchProduct)

export default getProduct
