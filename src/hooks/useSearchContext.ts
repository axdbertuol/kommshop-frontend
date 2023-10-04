'use client'
import { SearchContext } from '@/components/providers/SearchContextProvider'
import { LabelValue, Product } from '@/types/common'
import { useContext, useEffect } from 'react'

type Props =
  | {
      filters?: LabelValue[] | null
      categories?: LabelValue[] | null
      products?: Product[] | null
    }
  | undefined

function useSearchContext(props: Props = {}) {
  const { state, actions } = useContext(SearchContext)
  useEffect(() => {
    if (props?.filters) {
      console.log('só uma')
      actions.setFilters(props.filters)
    }
    if (props?.categories) {
      console.log(props)
      actions.setCategories(props.categories)
    }
    if (props?.products) {
      console.log(props, 'xxx')
    }
  }, [])
  return { ...state, ...actions }
}

export default useSearchContext
