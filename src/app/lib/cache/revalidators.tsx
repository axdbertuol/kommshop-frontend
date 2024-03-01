import { revalidatePath, revalidateTag } from 'next/cache'

export async function revalidateProds(slug?: string, id?: number) {
  'use server'
  revalidateTag('get-products-ownerid')
  if (id) {
    revalidateTag('get-product-' + id)
    revalidateTag(id.toString())
  }
  if (slug) {
    revalidatePath('/product/' + slug, 'page')
  }
}
