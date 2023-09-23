import { SearchContext } from '@/store/SearchContextProvider'
import { useContext } from 'react'

function useSearchContext() {
  const { state, actions } = useContext(SearchContext)

  return { ...state, ...actions }
}

export default useSearchContext
