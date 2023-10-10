import React, { Suspense } from 'react'
import ProductList from '../ProductList'
import getProducts from '@/app/lib/actions/get-products'
import { SearchParams } from '@/types/common'

type Props = {
  searchParams?: SearchParams
}

async function ListingSegment({ searchParams }: Props) {
  const data = await getProducts(searchParams?.search).then((r) => {
    console.log('get products finished')
    return r
  })

  return (
    <div className="flex flex-col items-center gap-y-4 min-h-screen">
      <Suspense fallback={<>Loading...</>}>
        <ProductList data={data} />
      </Suspense>
    </div>
  )
}

export default ListingSegment
