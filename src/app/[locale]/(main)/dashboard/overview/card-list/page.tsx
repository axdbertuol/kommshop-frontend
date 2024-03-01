import cachedGetProductsByOwnerid from '@/app/lib/actions/getters/get-products-ownerid'
import { getUser } from '@/app/lib/get-user'
import ProductDashboardList from '@/components/product/ProductDashboardList'
import React from 'react'
import 'server-only'

async function CardListingPage() {
  const user = await getUser()
  if (!user?.id) return null
  const { data } = await cachedGetProductsByOwnerid(user.id.toString())
  if (!data) return null

  return <ProductDashboardList data={data} />
}

export default CardListingPage
