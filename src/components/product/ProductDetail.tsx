import React, { Suspense } from 'react'
import Image from 'next/image'
import { Product } from '@/types'

type ProductDetailProps = Product
const defaultImg = process.env.DEFAULT_PRODUCT_IMG_URL ?? ''
const ProductDetail = ({ name, description, imageUrl, price }: ProductDetailProps) => {
  return (
    <div className="flex flex-col  md:justify-start bg-background md:w-8/12">
      <div className="flex flex-col lg:flex-row md:gap-2 rounded-lg p-4 w-full max-h-[calc(100vh-72px)]">
        <div className="bg-secondary md:max-h-[calc(100vh-72px)] w-full">
          <Suspense fallback={<>Loading...</>}>
            <Image
              src={imageUrl ?? defaultImg}
              alt={name}
              width={300}
              height={300}
              className="w-full border-t-2 border-l-2 h-[80vh] sm:object-center object-cover rounded-t-lg"
            />
          </Suspense>
        </div>
        <div className="p-4 bg-secondary rounded-t-lg border-t-2 border-r-2 shadow-2xl text-primary-100 lg:w-4/12">
          <h1 className="text-2xl font-bold text-primary mb-2">{name}</h1>
          <p className="text-secondary-100">{description}</p>
          <p className="text-primary mt-2">${price}</p>
          <div className="text-sm mt-4">
            <span className="text-primary-100">Favorited by:</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
