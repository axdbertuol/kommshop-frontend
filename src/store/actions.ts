export type Action =
  | { type: SearchActionsEnum.INIT; searchValue: string | null; filters: string[] | null }
  | { type: SearchActionsEnum.SET_SEARCH_VALUE; searchValue: string | null }
  | { type: SearchActionsEnum.SET_FILTERS; filters: string[] | null }

export enum SearchActionsEnum {
  INIT = 'INIT',
  SET_SEARCH_VALUE = 'SET_SEARCH_VALUE',
  SET_FILTERS = 'SET_FILTERS',
}

export type SearchContextActions = {
  setSearchValue: (value: string | null) => void
  setFilters: (value: string[] | null) => void
}
