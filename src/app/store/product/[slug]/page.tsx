import getProduct from '@/app/lib/actions/get-product'
import getProducts from '@/app/lib/actions/get-products'
import ProductDetailSegment from '@/components/section-segments/product-detail-segment'
import { slug } from '@/utils/slug'
import { redirect } from 'next/navigation'

export async function generateStaticParams() {
  const products = await getProducts()

  return products?.map((product) => ({
    slug: slug(product.name, String(product._id)),
  }))
}
export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').at(-1)
  if (!id) return redirect('/404')
  getProduct(id)
  return <ProductDetailSegment id={id} />
}
