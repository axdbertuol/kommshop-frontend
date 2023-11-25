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
  switch (pathname) {
    case 'confirmEmail':
      return new URL(process.env?.confirmEmailUrl ?? '')
    case 'signin':
      return new URL(process.env?.signinUrl ?? '')
    case 'signup':
      return new URL(process.env?.signupUrl ?? '')
    case 'signout':
      return new URL(process.env?.signoutUrl ?? '')
    case 'getMe':
      return new URL(process.env?.getMeUrl ?? '')
    case 'refresh':
      return new URL(process.env?.refreshTokenUrl ?? '')
    case 'google':
      return new URL(process.env?.googleAuthUrl ?? '')
    default:
      throw new Error('Path must be specified in the config file')
  }
}

export const getApiPath = (pathname: AuthPathname) => {
  const path = getApiPathSwitch(pathname)
  if (!path) throw new Error(`Path ${pathname} must be specified in the config file`)
  return path
}
