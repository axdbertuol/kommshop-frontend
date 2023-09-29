'use client'
import React from 'react'
import { CommandGroup, CommandItem } from './ui/command'
import { LabelValue } from '@/types/common'

type Props = {
  suggestions: LabelValue[] | null | undefined
  heading?: string
}
function CommandSearchSuggestions({ heading, suggestions }: Props) {
  return (
    <CommandGroup
      heading={heading || 'Suggestions'}
      className="z-30"
    >
      {suggestions?.map((suggestion, index) => (
        <CommandItem
          key={index}
          className="w-full"
          // onClick={}
        >
          {suggestion.label}
        </CommandItem>
      ))}
    </CommandGroup>
  )
}

export default CommandSearchSuggestions
