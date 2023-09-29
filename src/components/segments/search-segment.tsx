// 'use client'

import React from 'react'
import CommandSearch from '../CommandSearch'
import CategoriesBar from '../CategoriesBar'
import { getCategories } from '@/app/lib/get-categories'
import { getProducts } from '@/app/lib/get-products'

type Props = {
  searchParams: { cat: string; search: string }
}

async function SearchSegment({ searchParams }: Props) {
  const categories = await getCategories(searchParams.search)
  const products = await getProducts(searchParams.search).then((products) =>
    products?.map((products) => ({ label: products.name, value: products.name }))
  )
  return (
    <div className="flex flex-col items-center gap-y-4 ">
      <CategoriesBar searchParams={searchParams} />
      <CommandSearch suggestions={{ categories, products }} />
    </div>
  )
}

export default SearchSegment
