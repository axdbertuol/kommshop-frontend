import { revalidateTag } from 'next/cache'

export async function revalidateProds() {
  'use server'
  revalidateTag('get-products-ownerid')
  revalidateTag('get-product')
}
