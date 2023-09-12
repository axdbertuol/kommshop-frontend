'use client'

import { Card, Rating } from 'flowbite-react'
import Image from 'next/image'

export type ProductProps = {
  imgSrc?: string
  name: string
  price: string
  description: string
  id?: string
}
export default function ProductCard(
  { name, price, description, id }: ProductProps
) {
  return (
    <Card className='flex items-center' renderImage={() => <Image width={250} height={250} src="https://i.zst.com.br/thumbs/12/3d/14/131312234.jpg" alt={'x'} />}
    >
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          <p>{name}</p>
        </h5>
      </a>
      <div className="mb-5 mt-2.5 flex items-center">
        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          <Rating>
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              4.95 out of 5
            </p>
          </Rating>
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>
        <a
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          href="#"
        >
          <p>Add to cart</p>
        </a>
      </div>
    </Card>
  )
}
