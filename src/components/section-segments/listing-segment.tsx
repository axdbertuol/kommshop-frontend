import React, { Suspense } from 'react'
import ProductList from '../ProductList'
import { getProducts } from '@/app/lib/actions/get-products'
import { SearchParams } from '@/types/common'

type Props = {
  searchParams?: SearchParams
}

async function ListingSegment({ searchParams }: Props) {
  // useSearchContext({ products: initialProducts })
  const data = await getProducts(searchParams?.search)
  return (
    <div className="flex flex-col items-center gap-y-4 ">
      <Suspense fallback={<>Loading...</>}>
        <ProductList data={data} />
      </Suspense>
    </div>
  )
}

export default ListingSegment
