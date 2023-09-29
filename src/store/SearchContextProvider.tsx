'use client'
import { defaultSearchCtxValues } from './constants'
import React, {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useReducer,
} from 'react'
import { searchReducer } from './reducers'
import { Action, SearchActionsEnum, SearchContextActions } from './actions'
import { Product } from '@/components/ProductList'

export type SearchContextType = {
  searchValue?: string | null
  filters: LabelValue[] | null
  categories: LabelValue[] | null
  products?: Product[] | null
}

export type LabelValue = {
  label: string
  value: string
}

export const SearchContext = createContext<{
  state: SearchContextType
  actions: SearchContextActions
  dispatch: Dispatch<Action>
}>({
  state: defaultSearchCtxValues,
  actions: {
    setSearchValue: () => null,
    setFilters: () => null,
    setCategories: () => null,
    // setProducts: () => null,
  },
  dispatch: () => null,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initializer = (action: Action): SearchContextType => {
  return {
    searchValue: null,
    filters: null,
    categories: null,
    products: null,
  }
}

function SearchContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    searchReducer,
    { type: SearchActionsEnum.INIT, searchValue: null, filters: null },
    initializer
  )

  const setSearchValue = useCallback((searchValue: string | null) => {
    dispatch({ type: SearchActionsEnum.SET_SEARCH_VALUE, searchValue })
  }, [])

  const setFilters = useCallback((filters: LabelValue[] | null) => {
    dispatch({ type: SearchActionsEnum.SET_FILTERS, filters })
  }, [])

  const setCategories = useCallback((categories: LabelValue[] | null) => {
    dispatch({ type: SearchActionsEnum.SET_CATEGORIES, categories })
  }, [])

  const contextValue = useMemo(() => {
    return {
      ...state,
    }
  }, [state])

  return (
    <SearchContext.Provider
      value={{
        state: contextValue,
        actions: { setSearchValue, setFilters, setCategories },
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider
