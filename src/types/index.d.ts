import type { Category, LoginResponseType, Product } from 'kommshop-types'
import { ReactElement } from 'react'

export type LabelValue = {
  label: string
  value: string
}
declare module 'server-only'
export type SearchParams = { cat?: string; search?: string }

export type Product = Product
export type Category = Category

export type Suggestion<T> = LabelValue & { type: T; _id?: string }
export type ServerErrorResponse = {
  status?: number | string
  errors?: Record<string, string[]>
  error?: string
}

export type CausedServerErrorResponse = {
  cause: { error?: ServerErrorResponse['error']; errors?: ServerErrorResponse['errors'] }
}

type Messages = typeof import('../../messages/en.json')
declare interface IntlMessages extends Messages {}

export type Tokens = {
  token?: string | null
  refreshToken?: string | null
  tokenExpires?: number | null
}

export type StatusSuccessful = {
  success: true
  status?: string | number
  errors?: undefined
  error?: undefined
  serverErrors?: undefined
}

export type StatusUnsuccessful = {
  success: false
  status?: string | number
  errors?: Record<string, string[]>
  error?: string | Array<{ message: string }>
  serverErrors?: Record<string, string[]>
}

export type StatusErrors = StatusSuccessful | StatusUnsuccessful

export type StatusErrorsWithJSX =
  | StatusErrors
  | {
      errors: Record<string, (string | ReactElement<any, string>)[]>
      serverErrors?: Record<string, (string | ReactElement<any, string>)[]>
    }

export type SigninFormValues = {
  email?: string
  password?: string
  idToken?: string
  formName: string
  provider: string
}
export type SignupFormValues = {
  email?: string
  password?: string
  password2?: string
  idToken?: string
  formName: string
  provider: string
}

export type FetchResponse<T> = {
  data?: T | null
  success: boolean
  serverErrors?: StatusErrors['serverErrors'] | null
}
