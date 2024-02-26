'use server'
import getCategories from '@/app/lib/actions/getters/get-categories'
import { SearchParams } from '@/types'
import CategoriesBarComponent from './CategoriesBarComponent'

type Props = {
  searchParams?: SearchParams
}

async function CategoriesBar({ searchParams }: Props) {
  const data = await getCategories()
  return (
    <CategoriesBarComponent
      categories={data ?? null}
      searchParams={searchParams}
    />
  )
}

export default CategoriesBar
