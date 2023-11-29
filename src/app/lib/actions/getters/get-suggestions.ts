'use server'

import { cache } from 'react'
import { fetchProducts } from './get-products'
import { parseResults, fetchCategories } from './get-categories'
import { Suggestion } from '@/types/common'

export const fetchSuggestions = async (search?: string) => {
  const [products, categories] = await Promise.all([
    fetchProducts(search).then(
      ({ data }) =>
        data?.map(
          (prod) =>
            ({
              label: prod.name,
              value: prod.name,
              type: 'product',
            } as Suggestion)
        ) ?? null
    ),
    fetchCategories(search).then(({ data }) => parseResults(data)),
  ])
  if ((!products || products.length === 0) && (!categories || categories?.length === 0))
    return null
  const result = { products, categories }
  return result as Record<string, Suggestion[]>
}
const getSuggestions = cache(fetchSuggestions)

export default getSuggestions
