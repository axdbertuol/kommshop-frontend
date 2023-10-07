import { useMemo } from 'react'
import { useDeferredValue } from 'react'

function useDeferredFilteredData<T>(filterFn: () => T) {
  const filteredData = useMemo(() => filterFn(), [filterFn])
  const deferredFilteredData = useDeferredValue(filteredData)

  return deferredFilteredData
}

export default useDeferredFilteredData
