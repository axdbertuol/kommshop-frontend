import getProducts from '@/app/lib/actions/getters/get-products'
import { SearchParams } from '@/types'
import 'server-only'

export default async function StoreLayout({
  children, // will be a page or nested layout
  search,
  listing,
  searchParams,
}: {
  searchParams: SearchParams
  children: React.ReactNode
  search: React.ReactNode
  listing: React.ReactNode
}) {
  getProducts(searchParams?.search).catch((err) => console.log(err))
  return (
    <div className="flex">
      <div className="w-full">
        <div className="flex flex-col gap-y-16 items-center bg-zinc-900 py-4">
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
