'use client'
import { Product } from '@/types'
import { Suspense } from 'react'
import CardSkeleton from '../CardSkeleton'
import ProductCard from './ProductCard'

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
            <ProductCard {...product} />
          </Suspense>
        )
      })}
    </>
  )
}
