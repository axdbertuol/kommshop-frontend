/* eslint-disable @typescript-eslint/no-non-null-assertion */
export type AuthPathname =
  | 'signup'
  | 'signin'
  | 'confirmEmail'
  | 'signout'
  | 'refresh'
  | 'getMe'
  | 'google'

export type ProductPathname = 'post' | 'get' | 'delete' | 'put' | 'uploadimg' | 'getimg'

export type BackendService = 'auth' | 'product' | 'cart' | 'user'

export const getAuthPathSwitch = (pathname: AuthPathname) => {
  const nextAuthUrl = process.env.NEXT_URL_AUTH
  const makeUrl = (path: string) => new URL(path, nextAuthUrl)
  switch (pathname) {
    case 'confirmEmail':
      return makeUrl(process.env.CONFIRM_EMAIL_ENDPOINT!)
    case 'signin':
      return makeUrl(process.env.SIGNIN_CREDENTIAL_ENDPOINT!)
    case 'signup':
      return makeUrl(process.env.SIGNUP_CREDENTIAL_ENDPOINT!)
    case 'signout':
      return makeUrl(process.env.SIGNOUT_ENDPOINT!)
    case 'getMe':
      return makeUrl(process.env.GET_ME_ENDPOINT!)
    case 'refresh':
      return makeUrl(process.env.REFRESH_TOKEN_ENDPOINT!)
    case 'google':
      return makeUrl(process.env.SIGNIN_GOOGLE_ENDPOINT!)
    default:
      throw new Error('Path must be specified in the config file')
  }
}

export const getProductPathSwitch = (pathname: ProductPathname) => {
  const productUrl = process.env.NEXT_URL_PRODUCTS
  const makeUrl = (path: string) => new URL(path, productUrl)
  switch (pathname) {
    case 'get':
      return makeUrl(process.env.CONFIRM_EMAIL_ENDPOINT!)
    case 'delete':
      return makeUrl(process.env.SIGNIN_CREDENTIAL_ENDPOINT!)
    case 'getimg':
      return makeUrl(process.env.SIGNUP_CREDENTIAL_ENDPOINT!)
    case 'post':
      return makeUrl('')
    case 'put':
      return makeUrl(process.env.SIGNOUT_ENDPOINT!)
    case 'uploadimg':
      return makeUrl(process.env.SIGNOUT_ENDPOINT!)
    default:
      throw new Error('Path must be specified in the config file')
  }
}

export const getApiPath = (pathname: AuthPathname) => {
  const path = getAuthPathSwitch(pathname)
  if (!path) throw new Error(`Path ${pathname} must be specified in the config file`)
  return path
}

export const getApiPathByService = (
  pathname: AuthPathname & ProductPathname,
  service: BackendService
) => {
  let path: URL | null = null
  try {
    switch (service) {
      case 'auth': {
        path = getAuthPathSwitch(pathname)
      }
      case 'product': {
        path = getProductPathSwitch(pathname)
      }
    }
  } catch (err) {
    throw new Error(`Path ${pathname} must be specified in the config file`)
  }
  return path
}
