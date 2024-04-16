import { unstable_setRequestLocale } from 'next-intl/server'

export default async function Page({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  return <>{children}</>
}
