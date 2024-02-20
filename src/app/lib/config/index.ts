export type AuthPathname =
  | 'signup'
  | 'signin'
  | 'confirmEmail'
  | 'signout'
  | 'refresh'
  | 'getMe'
  | 'google'
export type BackendService = 'auth' | 'product' | 'cart' | 'user'

export const getApiPathSwitch = (pathname: AuthPathname) => {
  const nextAuthUrl = process.env.ROUTER_URL!
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

export const getApiPath = (pathname: AuthPathname) => {
  const path = getApiPathSwitch(pathname)
  if (!path) throw new Error(`Path ${pathname} must be specified in the config file`)
  return path
}
