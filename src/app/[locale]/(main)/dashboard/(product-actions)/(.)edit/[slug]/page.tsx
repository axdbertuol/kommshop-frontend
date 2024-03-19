import getCategories from '@/app/lib/actions/getters/get-categories'
import { fetchProduct } from '@/app/lib/actions/getters/get-product'
import { revalidateProds } from '@/app/lib/cache/revalidators'
import { getUser } from '@/app/lib/get-user'
import EditProductForm from '@/components/forms/product/EditProduct'
import Modal from '@/components/modals/Modal'
import { EditProduct } from '@/types'
import { notFound } from 'next/navigation'

export default async function Edit({ params: { slug } }: { params: { slug: string } }) {
  if (!slug) notFound()
  const user = await getUser()
  if (!user) return null
  const [categories, product] = await Promise.all([getCategories(), fetchProduct(slug)])
  const { data } = product
  if (!data) return null
  if (data.owner?.userId !== user.id) {
    return notFound()
  }
  return (
    <Modal>
      <EditProductForm
        initialValues={data as EditProduct}
        categories={categories}
        revalidateProducts={revalidateProds}
      />
    </Modal>
  )
}
