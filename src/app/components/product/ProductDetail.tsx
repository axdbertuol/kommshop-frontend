import React, { Suspense } from 'react'
import Image from 'next/image'
import { Product } from '@/types/common'

type ProductDetailProps = Product & { image?: string }

const ProductDetail = ({
  name,
  description,
  image,
  price,
  favouritedBy,
  category,
}: ProductDetailProps) => {
  return (
    <div className="flex flex-col  md:justify-start bg-background md:w-8/12">
      <div className="flex flex-col lg:flex-row md:gap-2 rounded-lg p-4 w-full max-h-[calc(100vh-72px)]">
        <div className="bg-secondary md:max-h-[calc(100vh-72px)] w-full">
          <Suspense fallback={<>Loading...</>}>
            <Image
              src={
                image ??
                'https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80'
              }
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
            {favouritedBy?.map((user: any, index: React.Key | null | undefined) => (
              <span
                key={index}
                className="text-accent ml-2"
              >
                {String(user)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
