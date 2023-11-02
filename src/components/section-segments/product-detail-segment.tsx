import React from 'react'
import getProduct from '@/app/lib/actions/get-product'
import ProductDetail from '../product/ProductDetail'
import { redirect } from 'next/navigation'

type Props = {
  id: string
}

async function ProductDetailSegment({ id }: Props) {
  const data = await getProduct(id).then((r) => {
    console.log('get product finished')
    return r
  })

  if (!data) return redirect('/')

  return (
    <div className="flex flex-col items-center gap-y-4">
      <ProductDetail {...data} />
    </div>
  )
}

export default ProductDetailSegment
