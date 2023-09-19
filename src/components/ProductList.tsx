'use client'
import React from 'react'
import { useEffect, useState } from 'react'
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
const mock = [
  {
    name: 'Product 1',
    description: 'Description for Product 1',
    category: 'Category 1',
    price: '19.99',
    _id: '1',
  },
  {
    name: 'Product 2',
    description: 'Description for Product 2',
    category: 'Category 2',
    price: '29.99',
    _id: '2',
  },
  {
    name: 'Product 3 Product 3Product 3Product 3Product 3',
    description: '',
    category: 'Category 1',
    price: '14.99',
    _id: '3',
  },
  {
    name: 'Product 4',
    category: 'Category 2',
    price: '24.99',
    _id: '4',
  },
  {
    name: 'Product 4',
    category: 'Category 2',
    price: '24.99',
    _id: '4',
  },
  {
    name: 'Product 4',
    category: 'Category 2',
    price: '24.99',
    _id: '4',
  },
]

export default function ProductList() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const resp = mock
        return resp
      } catch (err) {
        throw err
      }
    }
    setLoading(true)
    fetchInitialProducts()
      .then((products) => {
        console.log(products)
        setProducts(products as Product[])
        // observe()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex sm:flex-col md:flex-row gap-y-8 gap-x-4 flex-wrap justify-start ">
      {loading ? (
        <span className="text-center">Loading...</span>
      ) : (
        products &&
        products.map((product, index) => {
          return (
            <ProductCard
              key={index}
              imgSrc={''}
              name={product.name}
              price={product.price}
              description={product?.description ?? ''}
              id={product._id}
            />
          )
        })
      )}
    </div>
  )
}
