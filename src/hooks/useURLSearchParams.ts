import { useCallback } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

function useURLSearchParams() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const updateSearchParams = useCallback(
    (name: string, value: string) => {
      if (!searchParams) return
      const params = new URLSearchParams(searchParams as unknown as URLSearchParams)

      params.set(name, value)

      const updatedQueryString = params.toString()
      router.push(pathname + '?' + updatedQueryString)
    },
    [searchParams, router, pathname]
  )
  const clearSearchParams = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  return { clearSearchParams, updateSearchParams, searchParams, router, pathname }
}

export default useURLSearchParams
