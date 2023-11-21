export type AuthPathname =
  | 'signup'
  | 'signin'
  | 'confirmEmail'
  | 'signout'
  | 'refresh'
  | 'getMe'
export type BackendService = 'auth' | 'product' | 'cart' | 'user'

export const getApiPath = (pathname: AuthPathname, service: BackendService) => {
  let baseUrl: string | undefined
  let endpoint: string | undefined

  switch (service) {
    case 'auth':
      baseUrl = process.env.NEXT_AUTH_URL
      break
    default:
      throw new Error('Backend service must be specified in the config file')
  }
  if (!baseUrl) {
    throw new Error(`${service} not found in env`)
  }

  switch (pathname) {
    case 'confirmEmail':
      endpoint = process.env.CONFIRM_EMAIL_ENDPOINT
      break
    case 'signin':
      endpoint = process.env.SIGNIN_CREDENTIAL_ENDPOINT
      break
    case 'signup':
      endpoint = process.env.SIGNUP_CREDENTIAL_ENDPOINT
      break
    case 'getMe':
      endpoint = process.env.GET_ME_ENDPOINT
      break
    case 'refresh':
      endpoint = process.env.REFRESH_TOKEN_ENDPOINT
      break
    default:
      throw new Error('Path must be specified in the config file')
  }
  if (!endpoint) {
    throw new Error(`${pathname} not found in env`)
  }

  return new URL(endpoint, baseUrl)
}
