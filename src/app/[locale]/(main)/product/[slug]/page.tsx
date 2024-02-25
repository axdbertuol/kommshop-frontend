import getProduct from '@/app/lib/actions/getters/get-product'
import getProducts from '@/app/lib/actions/getters/get-products'
import ProductDetailSegment from '@/components/section-segments/product-detail-segment'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  try {
    const { data, success } = await getProducts()

    if (!success || !data || data.length === 0) {
      return []
    }
    return data.map((product) => ({
      slug: product.slug,
    }))
  } catch (err) {
    return []
  }
}
export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').at(-1)
  if (!id) return notFound()
  // revalidatePath('/store/product/' + params.slug)
  // getProduct(id)
  return <ProductDetailSegment id={id ?? ''} />
}
