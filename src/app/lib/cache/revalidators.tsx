import { revalidatePath, revalidateTag } from 'next/cache'

export async function revalidateProds(slug?: string, id?: number) {
  'use server'
  revalidateTag('get-products-ownerid')
  revalidateTag('get-products')
  if (id) {
    revalidateTag('get-product')
    revalidateTag(id.toString())
  }
  if (slug) {
    revalidatePath('/product/' + slug, 'page')
  }
}
