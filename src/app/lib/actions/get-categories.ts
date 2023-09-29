import { cache } from 'react'
import { Entity } from 'kommshop-types'
import * as z from 'zod'
import 'server-only'
import { LabelValue } from '@/types/common'

export const preload = (id?: string) => {
  void getCategories(id)
}
const schema = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
  })
)
const fetchCategories = async (search?: string | null) => {
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

const parseResults = async (json: Entity.Category[] | null | undefined) => {
  const parsedJson = await schema.parseAsync(json)

  const result = parsedJson.map((category) => ({
    value:
      category.name.at(0)?.toLowerCase() +
      category.name.substring(1, category.name.length),
    label: category.name,
    _id: category._id,
  }))
  return result as LabelValue[]
}

export const getCategories = cache((id?: string) =>
  fetchCategories(id).then(parseResults)
)
