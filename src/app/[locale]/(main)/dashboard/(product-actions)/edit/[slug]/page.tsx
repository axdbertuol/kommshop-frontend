import getCategories from '@/app/lib/actions/getters/get-categories'
import { fetchProduct } from '@/app/lib/actions/getters/get-product'
import { revalidateProds } from '@/app/lib/cache/revalidators'
import { getCachedUser } from '@/app/lib/get-user'
import EditProductForm from '@/components/forms/product/EditProduct'
import { EditProduct } from '@/types'
import { notFound } from 'next/navigation'

export default async function Edit({ params: { slug } }: { params: { slug: string } }) {
  if (!slug) notFound()
  const user = await getCachedUser()
  if (!user) return null
  const [categories, product] = await Promise.all([getCategories(), fetchProduct(slug)])
  const { data } = product
  if (!data) return null
  if (data.ownerId !== user.id) {
    return notFound()
  }
  return (
    <EditProductForm
      initialValues={data as EditProduct}
      categories={categories}
      revalidateProducts={revalidateProds}
    />
  )
}
