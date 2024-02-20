import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

export const locales = ['en', 'pt']
const localePatterns = ['en_US', 'pt_BR']
export const defaultLocale = 'en'

export const getLocaleWebPattern = (locale: string) => {
  return localePatterns.find((pattern) => pattern.split('_')[0] === locale)
}

export function getLocale(headers: Headers) {
  const languages = new Negotiator({
    headers: Object.fromEntries(headers.entries()),
  }).languages()

  return match(languages, locales, defaultLocale) // -> 'en-US'
}
