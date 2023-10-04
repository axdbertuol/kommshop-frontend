'use server'

import { cache } from 'react'
import { fetchProducts } from './get-products'
import { parseResults, fetchCategories } from './get-categories'
import { Suggestion } from '@/types/common'

export const fetchSuggestions = async (search?: string) => {
  const [products, categories] = await Promise.all([
    fetchProducts(search).then((products) =>
      products?.map((products) => ({
        label: products.name,
        value: products.name,
        type: 'product',
      }))
    ),
    fetchCategories(search).then(parseResults),
  ])
  if ((!products || products.length === 0) && (!categories || categories?.length === 0))
    return null
  const result = [products, categories].flat()
  return result as Suggestion[]
}
export const getSuggestions = cache(fetchSuggestions)

export const fetchSuggestionsClient = async (search?: string) => {
  return await fetchSuggestions(search)
}
