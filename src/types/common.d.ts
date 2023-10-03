import type { Entity } from 'kommshop-types'

export type LabelValue = {
  label: string
  value: string
}

export type SearchParams = { cat?: string; search?: string }

export type Product = Entity.Product
export type Category = Entity.Category
