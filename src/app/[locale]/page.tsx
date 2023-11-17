import { getCookiesList } from '../lib/get-cookies-list'

export default async function LocalePage() {
  const cookiesList = await getCookiesList()
  return <pre>{JSON.stringify(cookiesList, null, 2)}</pre>
}
