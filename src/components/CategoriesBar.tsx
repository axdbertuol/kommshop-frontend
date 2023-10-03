'use server'
import { getCategories } from '@/app/lib/actions/get-categories'
import React from 'react'
import { LinkURLText } from './LinkURLText'

type Props = {
  searchParams: { search: string }
}
async function CategoriesBar({ searchParams }: Props) {
  // const { categories } = useSearchContext(null)
  const data = await getCategories()
  // TODO: make a page for each category
  return (
    <div className="flex gap-x-4">
      {data?.map((category, index) => (
        <LinkURLText
          key={index}
          searchParamName={'cat'}
          className="border-r last-of-type:border-0 border-primary-400"
          data={category}
        />
      ))}
    </div>
  )
}

export default CategoriesBar
