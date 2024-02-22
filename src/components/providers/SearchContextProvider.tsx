'use client'
import { defaultSearchCtxValues } from '@/store/constants'
import React, {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useReducer,
} from 'react'
import { searchReducer } from '@/store/reducers'
import { Action, SearchActionsEnum, SearchContextActions } from '@/store/actions'
import { LabelValue, Product } from '@/types'

export type SearchContextType = {
  searchValue?: string
  filters: LabelValue[] | null
  categories: LabelValue[] | null
  products?: Product[] | null
  suggestionsListOpen?: boolean
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
    setSuggestionsListOpen: () => null,
  },
  dispatch: () => null,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initializer = (action: Action): SearchContextType => {
  return {
    searchValue: '',
    suggestionsListOpen: false,
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

  const setSearchValue = useCallback((searchValue: string | undefined) => {
    dispatch({ type: SearchActionsEnum.SET_SEARCH_VALUE, searchValue })
  }, [])

  const setFilters = useCallback((filters: LabelValue[] | null) => {
    dispatch({ type: SearchActionsEnum.SET_FILTERS, filters })
  }, [])

  const setCategories = useCallback((categories: LabelValue[] | null) => {
    dispatch({ type: SearchActionsEnum.SET_CATEGORIES, categories })
  }, [])
  const setSuggestionsListOpen = (open?: boolean) => {
    dispatch({ type: SearchActionsEnum.SET_SUGGESTIONS_LIST_OPEN, open })
  }

  const contextValue = useMemo(() => {
    return {
      ...state,
    }
  }, [state])

  return (
    <SearchContext.Provider
      value={{
        state: contextValue,
        actions: { setSearchValue, setFilters, setCategories, setSuggestionsListOpen },
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider
