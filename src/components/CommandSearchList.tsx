'use client'
import { Suggestion } from '@/types/common'
import { useQuery } from '@tanstack/react-query'
import CommandSearchSuggestions from './CommandSearchSuggestions'
import { fetchSuggestions } from '@/app/lib/actions/get-suggestions'
import useSearchContext from '@/hooks/useSearchContext'
import { cn } from '@/app/lib/utils'
import { Skeleton } from './ui/skeleton'

function CommandSearchList({
  suggestions,
  open,
}: {
  suggestions: Suggestion[] | null
  open: boolean
}) {
  const { searchValue } = useSearchContext()
  const { data, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ['suggestions', searchValue],
    queryFn: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(
          async () => resolve(await fetchSuggestions(searchValue ?? undefined)),
          1000
        )
      }) as Promise<Suggestion[] | null>
    },
    initialData: suggestions,
    retry: 3,
    retryDelay: 1000,
    // cacheTime: 50,
    // suspense: true,
    // enabled: !!searchValue,
  })
  // if (!open) return null
  if (isLoading || isFetching)
    return (
      <Skeleton className="absolute top-11 flex flex-col gap-y-2 z-30 min-w-full h-[200px] rounded bg-secondary-black-300 px-4 py-4">
        <Skeleton className="bg-secondary-black-100 h-[20px] w-[50px] blur-[1px]" />
        <Skeleton className="bg-secondary-black-100 h-[20px] w-[150px] blur-[1px]" />
        <Skeleton className="bg-secondary-black-100 h-[20px] w-[150px] blur-[1px]" />
        <Skeleton className="bg-secondary-black-100 h-[20px] w-[150px] blur-[1px]" />
        <Skeleton className="bg-secondary-black-100 h-[20px] w-[150px] blur-[1px]" />
      </Skeleton>
    )

  const products = data?.filter((suggest) => suggest.type === 'product')
  const categories = data?.filter((suggest) => suggest.type === 'category')

  return (
    <div
      className={cn(
        'absolute top-11 flex flex-col z-30  opacity-0 w-full transition-transform rounded bg-secondary-black-400 px-4 py-2',
        open && 'h-fit opacity-100 transition-transform translate-y-0'
      )}
    >
      {!data && <span className="h-[20px]">No results found.</span>}
      {isSuccess && data && data?.length > 0 && (
        <div className="flex flex-row">
          {[products, categories].map((suggest, index) => {
            return (
              <CommandSearchSuggestions
                key={index}
                suggestions={suggest}
                heading={suggest?.[0].type}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CommandSearchList
