import 'server-only'
import React from 'react'
import getProducts from '@/app/lib/actions/getters/get-products'
import { SearchParams } from '@/types'
import ProductListWrapper from '@/components/product/ProductListWrapper'
import ProductList from '@/components/product/ProductList'

type Props = {
  searchParams?: SearchParams
}

async function Default({ searchParams }: Props) {
  const { data } = await getProducts(searchParams?.search)
  if (!data) return null
  return (
    <div className="flex flex-col items-center gap-y-4 min-h-screen">
      <ProductListWrapper>
        <ProductList data={data} />
      </ProductListWrapper>
    </div>
  )
}

export default Default
