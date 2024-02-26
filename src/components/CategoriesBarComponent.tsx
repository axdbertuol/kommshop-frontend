'use client'
import { cn } from '@/app/lib/utils'
import { Suggestion, SearchParams } from '@/types'
import { useState } from 'react'
import { LinkURLText } from './LinkURLText'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  searchParams?: SearchParams
  categories?: Suggestion<'category'>[] | null
}
export default function CategoriesBarComponent({ categories }: Props) {
  // const { categories } = useSearchContext(null)
  const [selected, setSelected] = useState<number | null>(null)
  const pathname = usePathname()
  // TODO: make a page for each category
  return (
    <div className="flex gap-x-4">
      {categories?.map((category: Suggestion<'category'>, index) => (
        <LinkURLText
          key={index}
          searchParamName={'cat'}
          onClick={() => setSelected(category?.id ?? null)}
          className={cn(
            'border-r last-of-type:border-0 border-primary-400',
            selected == category?.id ? 'text-white' : ' text-muted-foreground'
          )}
          data={category}
        />
      ))}
      <Link
        href={pathname}
        className="text-[0.5em]"
      >
        Clear all
      </Link>
    </div>
  )
}
