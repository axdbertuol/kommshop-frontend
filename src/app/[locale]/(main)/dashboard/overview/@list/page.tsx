'use server'
import cachedGetProductsByOwnerid from '@/app/lib/actions/getters/get-products-ownerid'
import { getUser } from '@/app/lib/get-user'
import ProductDashboardList from '@/components/product/ProductDashboardList'
import React, { Suspense } from 'react'
import { DataTable } from '../data-table/data-table'
import { columns } from '../data-table/columns'

async function CardListingPage({
  searchParams: { as },
}: {
  searchParams: { as: string }
}) {
  const user = await getUser()
  if (!user?.id) return null
  const { data } = await cachedGetProductsByOwnerid(user.id.toString())
  if (!data) return null
  if (as == 'data-table') {
    return (
      <Suspense fallback={<>Loading table...</>}>
        <div className="container md:w-[80vw]  py-10">
          <DataTable
            columns={columns}
            data={data}
          />
        </div>
      </Suspense>
    )
  }
  return <ProductDashboardList data={data} />
}

export default CardListingPage
