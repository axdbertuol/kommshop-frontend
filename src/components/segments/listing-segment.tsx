import React, { Suspense } from 'react'
import ProductList from '../ProductList'
import { getProducts } from '@/app/lib/actions/get-products'

type Props = {
  searchParams?: { cat?: string }
}

async function ListingSegment({ searchParams }: Props) {
  // useSearchContext({ products: initialProducts })
  const data = await getProducts(searchParams?.cat ?? '')
  return (
    <div className="flex flex-col items-center gap-y-4 ">
      <Suspense fallback={<>Loading...</>}>
        <ProductList data={data} />
      </Suspense>
    </div>
  )
}

export default ListingSegment
