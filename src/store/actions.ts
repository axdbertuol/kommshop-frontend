import type { LabelValue } from '@/types'
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
  | {
      type: SearchActionsEnum.SET_SUGGESTIONS_LIST_OPEN
      open?: boolean
    }

export enum SearchActionsEnum {
  INIT = 'INIT',
  SET_SEARCH_VALUE = 'SET_SEARCH_VALUE',
  SET_FILTERS = 'SET_FILTERS',
  SET_CATEGORIES = 'SET_CATEGORIES',
  SET_PRODUCTS = 'SET_PRODUCTS',
  SET_SUGGESTIONS_LIST_OPEN = 'SET_SUGGESTIONS_LIST_OPEN',
}

export type SearchContextActions = {
  setCategories: (categories: { label: string; value: string }[]) => void
  setSearchValue: (value: string | undefined) => void
  setSuggestionsListOpen: (open?: boolean) => void
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
