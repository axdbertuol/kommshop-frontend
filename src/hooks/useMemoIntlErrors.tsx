import { useMemo } from 'react'

function useMemoizedIntlErrors<T extends Record<string, string[]> | undefined>(
  serverErrors: T,
  translatedErrors: Record<string, string>
) {
  const memoizedIntlServerErrors = useMemo(() => {
    if (!serverErrors) {
      return undefined
    }

    return Object.fromEntries(
      Object.entries(serverErrors).map(([key, values]) => [
        key,
        values.map((value) => translatedErrors?.[value] ?? value),
      ])
    )
  }, [serverErrors, translatedErrors])

  return memoizedIntlServerErrors
}

export default useMemoizedIntlErrors
