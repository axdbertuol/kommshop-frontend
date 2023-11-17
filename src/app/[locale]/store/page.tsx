import SearchSegment from '@/components/section-segments/search-segment'
import ListingSegment from '@/components/section-segments/listing-segment'
import { SearchParams } from '@/types/common'
import getProducts from '@/app/lib/actions/getters/get-products'

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

export default async function Page({
  params,
  searchParams,
}: {
  params: { username: string }
  searchParams: SearchParams
}) {
  // TODO: pegar de props.searchParams os filters, pegar os resultados e passar os resultados para ProductList

  // const defaultCategories = await getCategories()
  console.log('preload starting', searchParams)
  getProducts(searchParams?.search).then(() => console.log('preload finished'))
  return (
    <div className="flex flex-col gap-y-16 items-center bg-zinc-900 py-4">
      {/* <SuspenseList revealOrder="forwards"> */}
      <SearchSegment searchParams={searchParams} />
      <ListingSegment searchParams={searchParams} />
      {/* </SuspenseList> */}
    </div>
  )
}