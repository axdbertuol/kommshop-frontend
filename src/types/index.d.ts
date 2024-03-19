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
  category: string
  categoryId: number
  slug: string
  imageUrl?: string
  ownerId?: number
  owner?: {
    username?: string
    userId?: string
  }
  CreatedAt?: string
}
export type Category = {
  id: number
  name: string
  parentId?: number | null
  children?: Category[] | null
}

export type Suggestion<T> = LabelValue & { type: T; id?: number }
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
  id: string
  role?: Role | null
  status?: Status
  provider?: string
}

export type UserProfile = {
  firstName: string
  lastName: string
  username: string
  id: string
}
export type LoginResponse = Readonly<{
  token: string
  refreshToken: string
  tokenExpires: number
  user: User
}>

export type CreateProduct = {
  name: string
  description?: string
  price: number
  category?: string
  categoryId: number
  imageUrl?: string
  slug: string
}
export type CreateProductResponse = (CreateProduct & StatusErrors) & { id?: number }

export type EditProduct = Partial<CreateProduct> & { id: number; slug: string }
export type EditProductResponse = EditProduct & StatusErrors
export interface ImageData {
  id: string
  title: string
  url_viewer: string
  url: string
  display_url: string
  width: string
  height: string
  size: string
  time: string
  expiration: string
  image: ImageDetails
  thumb: ImageDetails
  medium: ImageDetails
  delete_url: string
}

export interface ImageDetails {
  filename: string
  name: string
  mime: string
  extension: string
  url: string
}

export interface ImgBBResponse {
  data: ImageData
  success: boolean
  status: number
}
