import { cache } from 'react'
import { Entity } from 'kommshop-types'
import * as z from 'zod'
import 'server-only'
import { LabelValue } from '@/types/common'

const schema = z
  .array(
    z.object({
      _id: z.coerce.string(),
      name: z.string(),
    })
  )
  .optional()
export const fetchCategories = async (search?: string | null) => {
  const url = new URL('http://localhost:3333/categories')
  if (search) url.searchParams.set('name', search)
  try {
    const myRequest = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    })
    return (await myRequest.json()) as Entity.Category[] | null | undefined
  } catch (err) {
    console.error(err, 'errro!')
  }
}

export const parseResults = async (json: Entity.Category[] | null | undefined) => {
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
  return result as LabelValue[] & { _id: string; type: string }[]
}

const getCategories = cache((name?: string) => fetchCategories(name).then(parseResults))

export default getCategories
