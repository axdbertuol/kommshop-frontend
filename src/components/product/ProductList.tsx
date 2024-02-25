'use client'
import { Product } from '@/types'
import { Suspense, memo } from 'react'
import CardSkeleton from '../CardSkeleton'
import ProductCard from './ProductCard'
import { useRouter } from '@/navigation'

type Props = {
  data: Product[] | null | undefined
}
export default function ProductList({ data }: Props) {
  // TODO: cleanup this
  if (!data || data.length === 0) return null
  return (
    <>
      {data.map((product, index) => {
        return (
          <Suspense
            key={index}
            fallback={<CardSkeleton />}
          >
            <ProductCard
              id={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              description={product?.description ?? ''}
              slug={product.slug}
            />
          </Suspense>
        )
      })}
    </>
  )
}
