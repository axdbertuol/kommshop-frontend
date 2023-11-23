import React from 'react'
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { notFound } from 'next/navigation'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import QueryClientWrapper from '@/components/providers/QueryClientWrapper'
import { defaultLocale, locales } from '../lib/get-locale'
import { cn } from '../lib/utils'
import GoogleAuthProvider from '@/components/providers/GoogleAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const td = await getTranslations({ locale: defaultLocale, namespace: 'Metadata' })

  return {
    title: t('title') ?? td('title'),
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
    <html lang={locale}>
      <body className={cn(inter.className, 'h-screen w-full')}>
        <QueryClientWrapper>
          <GoogleAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
              {children}
            </ThemeProvider>
          </GoogleAuthProvider>
        </QueryClientWrapper>
      </body>
    </html>
  )
}
