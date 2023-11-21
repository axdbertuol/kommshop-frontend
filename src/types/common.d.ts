import type { Category, LoginResponseType, Product } from 'kommshop-types'

export type LabelValue = {
  label: string
  value: string
}

export type SearchParams = { cat?: string; search?: string }

export type Product = Product
export type Category = Category

export type Suggestion = LabelValue & { type: string; _id?: string }
export type ErrorResponse = {
  status: number | string
  errors?: Record<string, string>
  error?: string
}

type Messages = typeof import('../../messages/en.json')
declare interface IntlMessages extends Messages {}

export type Tokens = {
  token?: string | null
  refreshToken?: string | null
  tokenExpires?: number | null
}
