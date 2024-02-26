'use server'
import { CreateProduct, CreateProductResponse, ImgBBResponse } from '@/types'
import { postProduct } from '../posters/post-product'
import { postProductImage } from '../posters/post-product-image'

export async function handleProductSubmission(
  prevState: CreateProductResponse,
  formData: FormData
): Promise<CreateProductResponse> {
  let name = formData.get('name')?.toString()
  let description = formData.get('description')?.toString()
  let price = Number(formData.get('price')?.toString())
  let category = formData.get('category')?.toString()
  let prod = {} as CreateProduct
  try {
    name = formData.get('name')?.toString()
    description = formData.get('description')?.toString()
    price = Number(formData.get('price')?.toString())
    category = formData.get('category')?.toString()
    prod = { name, description, price, category } as CreateProduct
  } catch (err) {
    console.error(err)
    return prevState
  }

  const image = formData.get('image')
  if (image) {
    const imgFormData = new FormData()
    imgFormData.append('image', image)
    const imgBbResp = (await postProductImage(imgFormData)) as ImgBBResponse
    if (imgBbResp.success) {
      prod = { ...prod, imageUrl: imgBbResp.data.url }
    }
  }

  const actionResult = (await postProduct(prod as CreateProduct)) as CreateProductResponse
  if (!actionResult.success) {
    return {
      ...prevState,
      success: false,
      serverErrors: actionResult.serverErrors,
    } as CreateProductResponse
  }

  return { ...prod, success: true }
}
