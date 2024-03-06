import cachedGetProductsByOwnerid from '@/app/lib/actions/getters/get-products-ownerid'
import { getUser } from '@/app/lib/get-user'
import ProductSmallDetail from '@/components/product/ProductSmallDetail'

export default async function Page() {
  console.log('oi')
  const user = await getUser()
  console.log(user)
  if (!user) return null
  const { data } = await cachedGetProductsByOwnerid(user.id.toString())
  console.log(data)
  if (!data) return null
  const maxPriceProduct = data.reduce((maxProduct, product) => {
    return Math.max(maxProduct.price, product.price) === maxProduct.price
      ? maxProduct
      : product
  }, data[0])
  console.log('oi', maxPriceProduct)
  return <ProductSmallDetail {...maxPriceProduct} />
}
