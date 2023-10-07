import type { LabelValue } from '@/types/common'
export type Action =
  | {
      type: SearchActionsEnum.INIT
      searchValue: string | null
      filters: LabelValue[] | null
    }
  | { type: SearchActionsEnum.SET_SEARCH_VALUE; searchValue: string | undefined }
  | {
      type: SearchActionsEnum.SET_FILTERS
      filters: LabelValue[] | null
    }
  | {
      type: SearchActionsEnum.SET_CATEGORIES
      categories: LabelValue[] | null
    }

export enum SearchActionsEnum {
  INIT = 'INIT',
  SET_SEARCH_VALUE = 'SET_SEARCH_VALUE',
  SET_FILTERS = 'SET_FILTERS',
  SET_CATEGORIES = 'SET_CATEGORIES',
  SET_PRODUCTS = 'SET_PRODUCTS',
}

export type SearchContextActions = {
  setCategories: (categories: { label: string; value: string }[]) => void
  setSearchValue: (value: string | undefined) => void
  // setProducts: (value: Entity.Product[] | null) => void
  setFilters: (
    value:
      | {
          label: string
          value: string
        }[]
      | null
  ) => void
}
