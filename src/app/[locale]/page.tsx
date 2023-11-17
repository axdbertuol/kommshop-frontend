import { getCookiesList } from '../lib/get-cookies-list'
import { getTranslations } from 'next-intl/server'
import { defaultLocale } from '../lib/get-locale'

export default async function LocalePage() {
  const cookiesList = await getCookiesList()
  return <pre>{JSON.stringify(cookiesList, null, 2)}</pre>
}
