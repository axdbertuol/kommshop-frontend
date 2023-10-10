// 'use client'
import React, { Suspense } from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types/common'
import CardSkeleton from './CardSkeleton'

export default async function ProductList({
  data,
}: {
  data: Product[] | null | undefined
}) {
  return (
    <div className="grid grid-flow-row md:grid-cols-3 lg:grid-cols-4 gap-4 border-t border-t-primary-300 py-8">
      {data?.map((product, index) => {
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
      })}
    </div>
  )
}
