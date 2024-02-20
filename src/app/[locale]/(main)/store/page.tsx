import SearchSegment from '@/app/components/section-segments/search-segment'
import ListingSegment from '@/app/components/section-segments/listing-segment'
import { SearchParams } from '@/types'
import getProducts from '@/app/lib/actions/getters/get-products'
import 'server-only'

const filtersMock = [
  {
    label: 'Red',
    value: 'red',
  },
  {
    label: 'Black',
    value: 'black',
  },
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Blue',
    value: 'blue',
  },
  {
    label: 'Purple',
    value: 'purple',
  },
]

const getFilters = async () => {
  // const res = await fetch()
  const res = await new Promise<typeof filtersMock>((resolve) =>
    setTimeout(() => resolve(filtersMock), 50)
  )
  return res
}

export default function Page({
  params,
  searchParams,
}: {
  params: { username: string }
  searchParams: SearchParams
}) {
  // TODO: pegar de props.searchParams os filters, pegar os resultados e passar os resultados para ProductList

  // const defaultCategories = await getCategories()
  getProducts(searchParams?.search).catch((err) => console.log(err))
  return (
    <div className="flex flex-col gap-y-16 items-center bg-zinc-900 py-4">
      {/* <SuspenseList revealOrder="forwards"> */}
      <SearchSegment searchParams={searchParams} />
      <ListingSegment searchParams={searchParams} />
      {/* </SuspenseList> */}
    </div>
  )
}
