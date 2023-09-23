import { SearchContextType } from './SearchContextProvider'
import { defaultSearchCtxValues } from '@/lib/constants'
import { Action } from './actions'

export function searchReducer(
  state: SearchContextType,
  action: Action
): SearchContextType {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        ...defaultSearchCtxValues,
      }
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.searchValue,
      }
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.filters,
      }
    default:
      return state
  }
}
