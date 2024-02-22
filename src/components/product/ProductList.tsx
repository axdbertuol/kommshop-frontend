import { Product } from '@/types'
import { Suspense, memo } from 'react'
import CardSkeleton from '../CardSkeleton'
import ProductCard from './ProductCard'

type Props = {
  data: Product[] | null | undefined
}
function ProductList({ data }: Props) {
  if (!data || data.length === 0) return <>Nothing was found :(</>
  // TODO: cleanup this
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
              imgSrc={''}
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

export default memo(ProductList)
