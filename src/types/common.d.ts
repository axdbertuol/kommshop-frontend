import type { Category, Product } from 'kommshop-types'

export type LabelValue = {
  label: string
  value: string
}

export type SearchParams = { cat?: string; search?: string }

export type Product = Product
export type Category = Category

export type Suggestion = LabelValue & { type: string; _id?: string }
