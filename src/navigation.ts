import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from './app/lib/get-locale'

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(
  { locales }
)
