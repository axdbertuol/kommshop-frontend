import { PageProps } from '.next/types/app/dashboard/page'
import FiltersBar from '@/components/FiltersBar'
import ProductList from '@/components/ProductList'
import SearchSegment from '@/components/segments/SearchSegment'
import { Suspense, cache } from 'react'
import 'server-only'

const filtersMock = [
  {
    label: 'Bike',
    value: 'bike',
  },
  {
    label: 'Car',
    value: 'car',
  },
  {
    label: 'Motor',
    value: 'motor',
  },
  {
    label: 'Truck',
    value: 'truck',
  },
  {
    label: 'Other',
    value: 'other',
  },
]
const getFilters = async () => {
  // const res = await fetch()
  const res = await new Promise<typeof filtersMock>((resolve) =>
    setTimeout(() => resolve(filtersMock), 200)
  )
  return res
}

// export const preload = (id: string) => {
//   void getItem(id)
// }

export default async function Page(props: PageProps) {
  console.log('props', props)
  // TODO: pegar de props.searchParams os filters e passar para ProductList
  const defaultFilters = await getFilters()
  return (
    <div className="flex flex-col gap-y-32 pl-[4rem]">
      <Suspense fallback={<>Loading...</>}>
        <SearchSegment defaultFilters={defaultFilters} />
      </Suspense>
      <ProductList />
    </div>
  )
}
