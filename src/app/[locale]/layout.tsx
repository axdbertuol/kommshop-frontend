import React from 'react'
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/app/components/providers/ThemeProvider'
import { notFound } from 'next/navigation'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import QueryClientWrapper from '@/app/components/providers/QueryClientWrapper'
import { locales } from '../lib/get-locale'
import { cn } from '../lib/utils'
import GoogleAuthProvider from '@/app/components/providers/GoogleAuthProvider'
import SearchContextProvider from '../components/providers/SearchContextProvider'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('title'),
  }
}
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Props = { children: React.ReactNode; params: { locale: string } }

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale)) notFound()
  unstable_setRequestLocale(locale)

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body className={cn(inter.className, 'h-screen w-full')}>
        <QueryClientWrapper>
          <GoogleAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
            >
              <SearchContextProvider>{children}</SearchContextProvider>
            </ThemeProvider>
          </GoogleAuthProvider>
        </QueryClientWrapper>
      </body>
    </html>
  )
}
