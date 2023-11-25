import { cache } from 'react'
import { Category } from 'shared-kommshop-types'
import * as z from 'zod'
import 'server-only'
import { Suggestion } from '@/types/common'

const schema = z
  .array(
    z.object({
      _id: z.coerce.string(),
      name: z.string(),
    })
  )
  .optional()
export const fetchCategories = async (search?: string | null) => {
  const url = new URL(`categories`, process.env.NEXT_URL_PRODUCTS)

  if (search) url.searchParams.set('name', search)
  const myRequest = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (!myRequest.ok) {
    throw new Error(`Could not find categories`)
  }
  try {
    const json = (await myRequest.json()) as Category[] | null | undefined
    return json
  } catch (err: any) {
    throw new Error('JSON error: ' + err.message)
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

const getCategories = cache((name?: string) => fetchCategories(name).then(parseResults))

export default getCategories
