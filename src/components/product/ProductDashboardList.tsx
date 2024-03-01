import { Product } from '@/types'
import { Suspense } from 'react'
import CardSkeleton from '../CardSkeleton'
import ProductCard from './ProductCard'

type Props = {
  data: Product[] | null | undefined
}
export default function ProductDashboardList({ data }: Props) {
  if (!data || data.length === 0)
    return (
      <div className="flex justify-center items-center container h-full min-h-[60vh]">
        <span>You have no active products.</span>
      </div>
    )
  return (
    <div className="flex">
      {data.map((product, index) => {
        return (
          <Suspense
            key={index}
            fallback={<CardSkeleton />}
          >
            <ProductCard
              omit={['content', 'addCart']}
              {...product}
            />
          </Suspense>
        )
      })}
    </div>
  )
}
