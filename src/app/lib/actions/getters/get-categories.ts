import { cache } from 'react'
import { Category } from 'shared-kommshop-types'
import * as z from 'zod'
import 'server-only'
import { FetchResponse, ServerErrorResponse, Suggestion } from '@/types/common'
import { parseServerErrors } from '../../utils'

const schema = z
  .array(
    z.object({
      _id: z.coerce.string(),
      name: z.string(),
    })
  )
  .optional()
export const fetchCategories = async (
  search?: string | null
): Promise<FetchResponse<Category[] | null | undefined>> => {
  const url = new URL(`categories`, process.env.NEXT_URL_PRODUCTS)

  if (search) url.searchParams.set('name', search)
  const myRequest = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  })

  const response = {
    data: null,
    success: false,
    serverErrors: null,
  }

  try {
    const json = await myRequest.json()
    if (!myRequest.ok) {
      return {
        ...response,
        serverErrors: parseServerErrors(json),
      }
    }
    return { ...response, data: json, success: true }
  } catch (err: any) {
    return response
  }
}

export const parseResults = async (json: Category[] | null | undefined) => {
  if (!json) return null
  let data
  try {
    data = await schema.parseAsync(json)
  } catch (err) {
    console.warn(err)
  }
  if (!data) return null
  const result = data.map((category: { _id: string; name: string }) => ({
    value:
      category.name.at(0)?.toLowerCase() +
      category.name.substring(1, category.name.length),
    label: category.name,
    type: 'category',
    _id: category._id,
  }))
  return result as Suggestion[]
}

const getCategories = cache((name?: string) =>
  fetchCategories(name).then(({ data }) => parseResults(data))
)

export default getCategories
