import { SearchContextType } from './SearchContextProvider'
import { defaultSearchCtxValues } from './constants'
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
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.categories,
      }
    default:
      return state
  }
}
