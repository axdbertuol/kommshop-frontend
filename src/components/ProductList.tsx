// 'use client'
import React, { Suspense } from 'react'
// import { useState } from 'react'
import Product from './Product'
// import fetchProducts from '@/app/_fetch-products'
import ProductCard from './ProductCard'

// type Props = {}

export type Product = {
  name: string
  description?: string | ''
  category: string
  price: string
  _id?: string
}

export default function ProductList({ data }: { data: Product[] | null | undefined }) {
  // const [products, setProducts] = useState<Product[] | null>(data ?? null)
  // const [loading, setLoading] = useState<boolean>(false)
  // console.log('darta', data)
  // const deferredProds = useDeferredValue(products)
  // console.log(products, initialProducts)
  // const setProdCallback = useCallback(
  //   () => setProducts(products),
  //   [products]
  // )
  // useEffect(() => {
  //   if (products) {
  //     setLoading(false)
  //   }
  // }, [products])

  return (
    <div className="grid grid-flow-row md:grid-cols-3 lg:grid-cols-4 gap-4 border-t border-t-primary-300 py-8">
      {data?.map((product, index) => {
        return (
          <Suspense
            key={index}
            fallback={<>Carregando...</>}
          >
            <ProductCard
              imgSrc={''}
              name={product.name}
              price={product.price}
              description={product?.description ?? ''}
              id={product._id}
            />
          </Suspense>
        )
      })}
    </div>
  )
}
