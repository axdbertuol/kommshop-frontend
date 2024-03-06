'use server'
import { SearchParams } from '@/types'
import { unstable_setRequestLocale } from 'next-intl/server'
export default async function StoreLayout({
  children, // will be a page or nested layout
  search,
  listing,
  params: { locale },
}: {
  searchParams: SearchParams
  children: React.ReactNode
  search: React.ReactNode
  listing: React.ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  return (
    <div className="flex">
      <div className="w-full">
        <div className="flex flex-col gap-y-16 items-center py-4">
          {/* <SuspenseList revealOrder="forwards"> */}
          {search}
          {listing}
          {/* </SuspenseList> */}
        </div>
        {children}
      </div>
    </div>
  )
}
