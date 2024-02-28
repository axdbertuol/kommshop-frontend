import cachedGetProductsByOwnerid from '@/app/lib/actions/getters/get-products-ownerid'
import { getUser } from '@/app/lib/get-user'
import ProductList from '@/components/product/ProductList'
import ProductListWrapper from '@/components/product/ProductListWrapper'
import { redirect } from '@/navigation'
import { RedirectType } from 'next/navigation'
import { Suspense } from 'react'
import 'server-only'

export const revalidate = 60
async function ListingPage() {
  const user = await getUser()
  console.log('Listing', user)
  if (!user?.id) return redirect('/signin', RedirectType.replace)
  const { data } = await cachedGetProductsByOwnerid(user.id.toString())
  if (!data) return null
  return (
    <div className="flex flex-col items-center gap-y-4 min-h-screen">
      <ProductListWrapper>
        <Suspense>
          <ProductList data={data} />
        </Suspense>
      </ProductListWrapper>
    </div>
  )
}

export default ListingPage
