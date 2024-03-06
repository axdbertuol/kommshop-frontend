'use server'

import { cache } from 'react'
import fetchProducts from './get-products'
import { Suggestion } from '@/types'

export default async function fetchSuggestions(search?: string) {
  const products = await fetchProducts(search).then(
    ({ data }) =>
      data?.map(
        (prod) =>
          ({
            label: prod.name,
            value: prod.name,
            type: 'product',
          } as Suggestion<'product'>)
      ) ?? null
  )

  if (!products || products.length === 0) return null
  const result = { products }
  return result as Record<string, Suggestion<'product'>[]>
}
const getSuggestions = cache(fetchSuggestions)
