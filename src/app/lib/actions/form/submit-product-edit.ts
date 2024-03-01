'use server'
import { EditProduct, EditProductResponse, ImgBBResponse } from '@/types'
import { postProductImage } from '../posters/post-product-image'
import { patchProduct } from '../patchers/patch-product'

export async function handleProductEdit(
  prevState: EditProduct,
  formData: FormData
): Promise<EditProductResponse> {
  let name = undefined
  let description = undefined
  let price = undefined
  let categoryId = undefined
  let id = undefined
  let prod = {} as EditProduct
  const image = formData.get('image')

  try {
    name = formData.get('name')?.toString()
    description = formData.get('description')?.toString()
    price = Number(formData.get('price')?.toString())
    categoryId = Number(formData.get('categoryId')?.toString())
    id = Number(formData.get('prodId')?.toString())
    prod = {
      ...(name !== prevState.name ? { name } : undefined),
      ...(description !== prevState.description ? { description } : undefined),
      ...(categoryId !== prevState.categoryId ? { categoryId } : undefined),
      ...(price !== prevState.price ? { price } : undefined),
      slug: '',
      id,
    }
  } catch (err) {
    console.error(err)
    return { prevState, id, slug: '', success: false } as EditProductResponse
  }

  if (image && image.toString().length > 0) {
    const imgFormData = new FormData()
    imgFormData.append('image', image)
    const imgBbResp = (await postProductImage(imgFormData)) as ImgBBResponse
    if (imgBbResp.success) {
      prod = { ...prod, imageUrl: imgBbResp.data.url }
    }
  }

  const actionResult = (await patchProduct(
    id.toString(),
    prod as EditProduct
  )) as EditProductResponse
  if (!actionResult.success) {
    return {
      ...prevState,
      success: false,
      serverErrors: actionResult.serverErrors,
    } as EditProductResponse
  }

  return { ...prod, success: true }
}
