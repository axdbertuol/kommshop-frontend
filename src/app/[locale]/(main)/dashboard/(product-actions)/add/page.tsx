import getCategories from '@/app/lib/actions/getters/get-categories'
import { revalidateProds } from '@/app/lib/cache/revalidators'
import AddProduct from '@/components/forms/product/AddProduct'
import { Suggestion } from '@/types'

const initialValues = {
  name: '',
  price: 0,
  categoryId: 0,
  slug: '',
  success: false,
}

function AddProd({ categories }: { categories: Suggestion<'category'>[] | null }) {
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
  return <AddProd categories={categories} />
}
