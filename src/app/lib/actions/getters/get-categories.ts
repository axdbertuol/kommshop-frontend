import { cache } from 'react'
import { Category } from '@/types'
import * as z from 'zod'
import 'server-only'
import { FetchResponse, ServerErrorResponse, Suggestion } from '@/types'
import { parseServerErrors } from '../../utils'

const schema = z
  .array(
    z.object({
      id: z.number(),
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
    cache: 'no-store',
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
    console.error('categories', err)
    return { success: false }
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
  const result = data.map((category) => ({
    value:
      category.name.at(0)?.toLowerCase() +
      category.name.substring(1, category.name.length),
    label: category.name,
    type: 'category',
    id: category.id,
  }))
  return result as Suggestion<'category'>[]
}

const getCategories = cache((name?: string) =>
  fetchCategories(name).then(({ data }) => parseResults(data))
)

export default getCategories
