import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from './app/lib/get-locale'
export const localePrefix = undefined

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(
  { locales, localePrefix }
)
