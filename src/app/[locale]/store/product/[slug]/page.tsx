import getProduct from '@/app/lib/actions/getters/get-product'
import getProducts from '@/app/lib/actions/getters/get-products'
import ProductDetailSegment from '@/app/components/section-segments/product-detail-segment'
import { slug } from '@/utils/slug'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  try {
    const products = await getProducts()
    if (!products || products.length === 0) {
      return []
    }
    return products.map((product) => ({
      slug: slug(product.name, String(product._id)),
    }))
  } catch (err) {
    return []
  }
}
export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').at(-1)
  if (!id) return notFound()
  getProduct(id)
  return <ProductDetailSegment id={id} />
}
