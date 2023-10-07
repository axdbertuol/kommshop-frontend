'use client'
import React, { KeyboardEvent } from 'react'
import { LabelValue } from '@/types/common'
import useSearchContext from '@/hooks/useSearchContext'
import { CommandGroup } from './ui/command'
import { cn } from '@/app/lib/utils'

type Props = {
  suggestions: LabelValue[] | null | undefined
  heading?: string
  // handleSelect: (value: string) => void
} & React.HTMLAttributes<HTMLDivElement>
function CommandSearchSuggestions({ heading, suggestions, className }: Props) {
  const { setSearchValue } = useSearchContext()

  return (
    <CommandGroup className="flex flex-col gap-1">
      <span className="text-xs text-secondary-black-100">{heading}</span>
      <ul
        className="z-30"
        role="list"
      >
        {suggestions?.map((suggestion, index) => (
          <li
            key={index + suggestion.label}
            className={cn(
              'w-full cursor-pointer ring-0 z-40 px-2 transition-all group ',
              className
            )}
          >
            <button
              type="button"
              value={suggestion.value}
              className="w-full text-left focus-within:border transition group-hover:bg-secondary-black-200 rounded-md"
              role="listitem"
              onClick={() => {
                setSearchValue(suggestion.value)
              }}
              onKeyDownCapture={(e: KeyboardEvent<HTMLButtonElement>) => {
                if (e.key === 'Enter' || e.key === 'Return') {
                  e.preventDefault()
                  setSearchValue(suggestion.value)
                }
              }}
            >
              <span className="text-sm">{suggestion.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </CommandGroup>
  )
}

export default CommandSearchSuggestions
