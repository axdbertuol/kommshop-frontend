import getCategories from '@/app/lib/actions/getters/get-categories'
import AddProduct from '@/components/forms/product/AddProduct'
import { Modal } from '@/components/modals/Modal'
import { Suggestion } from '@/types'
import { revalidateProds } from '../add/page'

const initialValues = {
  name: '',
  price: 0,
  category: '',
  success: false,
}

function NewFunction({ categories }: { categories: Suggestion<'category'>[] | null }) {
  return (
    <Modal>
      <AddProduct
        initialValues={initialValues}
        categories={categories}
        revalidateProducts={revalidateProds}
      />
    </Modal>
  )
}

export default async function Add() {
  const categories = await getCategories()
  return <NewFunction categories={categories} />
}
