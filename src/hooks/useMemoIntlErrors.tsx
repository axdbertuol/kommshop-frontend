import { ReactElement, useMemo } from 'react'

function useMemoizedIntlErrors<T extends Record<string, string[]> | undefined>(
  serverErrors: T,
  translatedErrors: Record<string, string | ReactElement<any, string>>
) {
  const memoizedIntlServerErrors = useMemo(() => {
    if (!serverErrors) {
      return undefined
    }
    const translatedErrorsMap = new Map(Object.entries(translatedErrors))
    return Object.fromEntries(
      Object.entries(serverErrors).map(([key, values]) => [
        key,
        values.map((value) => translatedErrorsMap.get(value) ?? value),
      ])
    )
  }, [serverErrors, translatedErrors])

  return memoizedIntlServerErrors
}

export default useMemoizedIntlErrors
