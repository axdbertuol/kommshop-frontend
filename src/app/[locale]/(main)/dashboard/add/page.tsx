import getCategories from '@/app/lib/actions/getters/get-categories'
import AddProduct from '@/components/forms/product/AddProduct'
import { Suggestion } from '@/types'
import { revalidateTag } from 'next/cache'

const initialValues = {
  name: '',
  price: 0,
  category: '',
  success: false,
}
export async function revalidateProds() {
  'use server'
  revalidateTag('get-products-ownerid')
}
function NewFunction({ categories }: { categories: Suggestion<'category'>[] | null }) {
  return (
    <AddProduct
      initialValues={initialValues}
      categories={categories}
      revalidateProducts={revalidateProds}
    />
  )
}

export default async function Add() {
  'use server'
  const categories = await getCategories()
  return <NewFunction categories={categories} />
}
