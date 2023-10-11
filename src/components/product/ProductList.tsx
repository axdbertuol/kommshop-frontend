'use client'
import { Product } from '@/types/common'
import { Suspense, memo } from 'react'
import CardSkeleton from '../CardSkeleton'
import ProductCard from './ProductCard'

type Props = {
  data: Product[] | null | undefined
}
function ProductList({ data }: Props) {
  if (!data || data.length === 0) return <>Nothing was found :(</>
  return (
    <>
      {data.map((product, index) => {
        return (
          <Suspense
            key={index}
            fallback={<CardSkeleton />}
          >
            <ProductCard
              _id={product._id}
              imgSrc={''}
              name={product.name}
              price={product.price}
              description={product?.description ?? ''}
            />
          </Suspense>
        )
      }) ?? <Suspense fallback={<CardSkeleton />}>not found</Suspense>}
    </>
  )
}

export default memo(ProductList)
