import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

export const locales = ['en', 'pt']
export const defaultLocale = 'en'

export function getLocale(headers: Headers) {
  const languages = new Negotiator({
    headers: Object.fromEntries(headers.entries()),
  }).languages()

  return match(languages, locales, defaultLocale) // -> 'en-US'
}
