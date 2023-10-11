'use client'

import React from 'react'
// import Image from 'next/image'
export type ProductProps = {
  imgSrc?: string
  name: string
  price: string
  description: string
  id?: string
}

function Product({ name, price, description, id }: ProductProps) {
  return (
    <div className="flex flex-col">
      {/* <Image src={imgSrc} alt={'prod' + name} width={150} height={150} /> */}
      <div className="flex flex-col items-center">
        <span>{name}</span>
        <span>{id ?? 'blabla'}</span>
        <span>{price}</span>
        <span>{description}</span>
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default Product
