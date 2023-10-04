'use client'
import { useCallback } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

function useURLSearchParams() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const updateSearchParams = useCallback(
    (name: string, value: string, options?: { replace: boolean }) => {
      const params = new URLSearchParams(searchParams as unknown as URLSearchParams)
      const allParams = params.getAll(name)
      console.log(params, allParams, name, value, options)
      if (params.has(name)) {
        if (options?.replace === true) params.set(name, value)
        else params.append(name, value)
      } else {
        params.set(name, value)
      }
      router.push(pathname + '?' + params.toString())
    },
    [searchParams, router, pathname]
  )
  const clearSearchParams = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  const deleteSearchParam = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams as unknown as URLSearchParams)
      params.delete(name)
    },
    [searchParams]
  )

  return {
    clearSearchParams,
    updateSearchParams,
    deleteSearchParam,
    searchParams,
    router,
    pathname,
  }
}

export default useURLSearchParams
