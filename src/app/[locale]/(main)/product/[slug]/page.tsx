import { fetchProduct } from '@/app/lib/actions/getters/get-product'
import getProducts from '@/app/lib/actions/getters/get-products'
import ProductDetail from '@/components/product/ProductDetail'
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
  const { data } = await fetchProduct(id)

  if (!data) return notFound()

  return <ProductDetail {...data} />
}
