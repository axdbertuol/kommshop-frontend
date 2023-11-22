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
      return process.env.confirmEmailUrl
    case 'signin':
      return process.env.signinUrl
    case 'signup':
      return process.env.signupUrl
    case 'signout':
      return process.env.signoutUrl
    case 'getMe':
      return process.env.getMeUrl
    case 'refresh':
      return process.env.refreshTokenUrl
    case 'google':
      return process.env.googleAuthUrl
    default:
      throw new Error('Path must be specified in the config file')
  }
}

export const getApiPath = (pathname: AuthPathname) => {
  const path = getApiPathSwitch(pathname)
  if (!path) throw new Error(`Path ${pathname} must be specified in the config file`)
  return path
}
