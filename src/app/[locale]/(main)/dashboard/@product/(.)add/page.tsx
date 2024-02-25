import getCategories from '@/app/lib/actions/getters/get-categories'
import AddProduct from '@/components/forms/product/AddProduct'
import { Modal } from '@/components/modals/Modal'

const initialValues = {
  name: '',
  price: 0,
  category: '',
  success: false,
}
export default async function Add() {
  const categories = await getCategories()
  return (
    <Modal>
      <AddProduct
        initialValues={initialValues}
        categories={categories}
      />
    </Modal>
  )
}
