import cachedGetProductsByOwnerid from '@/app/lib/actions/getters/get-products-ownerid'
import { getUser } from '@/app/lib/get-user'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Suspense } from 'react'

export default async function ProductDataTable() {
  const user = await getUser()
  if (!user?.id) return null
  const { data } = await cachedGetProductsByOwnerid(user.id.toString())
  if (!data) return null
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
