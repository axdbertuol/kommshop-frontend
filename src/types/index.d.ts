import type { LoginResponseType } from 'kommshop-types'
import { ReactElement } from 'react'

export type LabelValue = {
  label: string
  value: string
}
declare module 'server-only'
export type SearchParams = { cat?: string; search?: string }

export type Product = {
  id: number
  name: string
  description?: string
  price: number
  category: Category
  slug: string
}
export type Category = {
  id: number
  name: string
}

export type Suggestion<T> = LabelValue & { type: T; id?: string | number }
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
  firstName?: string
  lastName?: string
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

export type User = {
  email: string | null
  firstName: string | null
  lastName: string | null
  username: string
  id: numer
  role?: Role | null
  status?: Status
}
