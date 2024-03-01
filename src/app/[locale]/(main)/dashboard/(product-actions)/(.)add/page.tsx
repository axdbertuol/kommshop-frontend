import getCategories from '@/app/lib/actions/getters/get-categories'
import { revalidateProds } from '@/app/lib/cache/revalidators'
import AddProduct from '@/components/forms/product/AddProduct'
import { Modal } from '@/components/modals/Modal'
import { Suggestion } from '@/types'
import { Suspense } from 'react'

const initialValues = {
  name: '',
  price: 0,
  categoryId: 0,
  slug: '',
  success: false,
}

function ModalAddProduct({
  categories,
}: {
  categories: Suggestion<'category'>[] | null
}) {
  return (
    <Modal>
      <Suspense fallback={<>Loading...</>}>
        <AddProduct
          initialValues={initialValues}
          categories={categories}
          revalidateProducts={revalidateProds}
        />
      </Suspense>
    </Modal>
  )
}

export default async function Add() {
  const categories = await getCategories()
  return <ModalAddProduct categories={categories} />
}
