import {
  getAuthTokens,
  getCookiesList,
  getEncryptedAuthCookie,
} from '../lib/get-cookies-list'

export default async function LocalePage() {
  const cookiesList = await getCookiesList()
  getEncryptedAuthCookie().then((cookie) => (cookie ? getAuthTokens(cookie) : null))

  return <pre>{JSON.stringify(cookiesList, null, 2)}</pre>
}
