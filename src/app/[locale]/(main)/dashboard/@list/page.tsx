import cachedGetProductsByOwnerid from '@/app/lib/actions/getters/get-products-ownerid'
import { getUser } from '@/app/lib/get-user'
import ProductList from '@/components/product/ProductList'
import ProductListWrapper from '@/components/product/ProductListWrapper'
import { redirect } from '@/navigation'
import 'server-only'

async function ListingPage() {
  const user = await getUser()
  console.log('Listing', user)
  if (!user?.id) return redirect('/signin')
  const { data } = await cachedGetProductsByOwnerid(user.id.toString()).then((r) => {
    console.log('get products finished')
    return r
  })
  if (!data) return null
  return (
    <div className="flex flex-col items-center gap-y-4 min-h-screen">
      <ProductListWrapper>
        <ProductList data={data} />
      </ProductListWrapper>
    </div>
  )
}

export default ListingPage
