'use client'
import React, { KeyboardEvent } from 'react'
import { LabelValue } from '@/types/common'
import { CommandGroup } from './ui/command'
import { cn } from '@/app/lib/utils'

type Props = {
  suggestions: LabelValue[] | null | undefined
  heading?: string
  onSelectSuggestion: (value: string) => void
} & React.HTMLAttributes<HTMLDivElement>
function CommandSearchSuggestions({
  heading,
  suggestions,
  className,
  onSelectSuggestion,
}: Props) {
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
              'w-full cursor-pointer ring-0 z-40 py-2 transition-all group rounded-md',
              className
            )}
          >
            <span
              className="w-full text-left transition-all rounded-md bg-inherit px-2  py-2 shadow-none group-hover:bg-primary-400"
              role="listitem"
              tabIndex={0}
              onClick={() => {
                onSelectSuggestion(suggestion.value)
              }}
              onKeyDownCapture={(e: KeyboardEvent<HTMLButtonElement>) => {
                if (e.key === 'Enter' || e.key === 'Return') {
                  e.preventDefault()
                  onSelectSuggestion(suggestion.value)
                }
              }}
            >
              {suggestion.label}
            </span>
          </li>
        ))}
      </ul>
    </CommandGroup>
  )
}

export default CommandSearchSuggestions
