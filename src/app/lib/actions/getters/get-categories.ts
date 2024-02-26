import { Category, FetchResponse, Suggestion } from '@/types'
import { cache } from 'react'
import 'server-only'
import { z } from 'zod'
import { parseServerErrors } from '../../utils'

const CategorySchema: any = z.lazy(() =>
  z.object({
    id: z.number(),
    name: z.string(),
    parentId: z.number().or(z.null()),
    children: z.null().or(z.array(CategorySchema)).optional(),
  })
)
const schema = z.array(CategorySchema).optional()

export const fetchCategories = async (
  search?: string | null
): Promise<FetchResponse<Category[] | null | undefined>> => {
  const url = new URL(`categories`, process.env.NEXT_URL_PRODUCTS)

  if (search) url.searchParams.set('name', search)
  const myRequest = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    // cache: 'no-store',
    next: { revalidate: 60 },
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
  const result = data
    .map((category: Category) => ({
      value:
        category.name.at(0)?.toLowerCase() +
        category.name.substring(1, category.name.length),
      label: category.name,
      type: 'category',
      parentId: category?.parentId ?? null,
      id: category.id,
      children: category.children,
    }))
    .filter((cat) => cat.parentId == null)
  return result as Suggestion<'category'>[]
}

const getCategories = cache((name?: string) =>
  fetchCategories(name).then(({ data }) => parseResults(data))
)

export default getCategories
