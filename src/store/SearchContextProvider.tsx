'use client'
import { defaultSearchCtxValues } from '@/lib/constants'
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

export type SearchContextType = {
  searchValue?: string | null
  filters: string[] | null
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
  },
  dispatch: () => null,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initializer = (action: Action): SearchContextType => {
  return {
    searchValue: null,
    filters: null,
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

  const setFilters = useCallback((filters: string[] | null) => {
    dispatch({ type: SearchActionsEnum.SET_FILTERS, filters })
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
        actions: { setSearchValue, setFilters },
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider
