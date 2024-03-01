import { fetchProduct } from '@/app/lib/actions/getters/get-product'
import { revalidateProds } from '@/app/lib/cache/revalidators'
import { getCachedUser } from '@/app/lib/get-user'
import DialogWrap from '@/components/dialog/DialogWrap'
import DeleteProduct from '@/components/forms/product/DeleteProduct'
import { notFound } from 'next/navigation'

export default async function DeletePage({ params }: { params: { slug: string } }) {
  const id = Number(params.slug)
  const user = await getCachedUser()
  if (!user) return null
  const { data } = await fetchProduct(params.slug)
  if (!data) return null
  if (data.ownerId !== user.id) {
    return notFound()
  }
  return (
    <DialogWrap open={true}>
      <DeleteProduct
        productId={id}
        slug={data.slug}
        revalidate={revalidateProds}
      />
    </DialogWrap>
  )
}
