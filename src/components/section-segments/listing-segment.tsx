import React from 'react'
import getProducts from '@/app/lib/actions/get-products'
import { SearchParams } from '@/types/common'
import ProductListWrapper from '../product/ProductListWrapper'
import ProductList from '../product/ProductList'

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
      <ProductListWrapper>
        <ProductList data={data} />
      </ProductListWrapper>
    </div>
  )
}

export default ListingSegment
