import cachedGetProductsByOwnerid from '@/app/lib/actions/getters/get-products-ownerid'
import { getUser } from '@/app/lib/get-user'
import ProductSmallDetail from '@/components/product/ProductSmallDetail'

export default async function Page() {
  const user = await getUser()
  if (!user) return null
  const { data } = await cachedGetProductsByOwnerid(user.id.toString())
  if (!data) return null
  const maxPriceProduct = data.reduce((maxProduct, product) => {
    return Math.max(maxProduct.price, product.price) === maxProduct.price
      ? maxProduct
      : product
  }, data[0])
  return <ProductSmallDetail {...maxPriceProduct} />
}
