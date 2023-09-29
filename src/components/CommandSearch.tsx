'use client'
import React, { useState } from 'react'
import { CommandInput, CommandList, CommandEmpty, Command } from './ui/command'
import { Button } from './ui/button'
import useURLSearchParams from '@/hooks/useURLSearchParams'
import CommandSearchSuggestions from './CommandSearchSuggestions'
import { LabelValue } from '@/types/common'

type Props = React.HTMLAttributes<HTMLElement> & {
  suggestions?: {
    categories: LabelValue[] | null | undefined
    products: LabelValue[] | null | undefined
  }
}

function CommandSearch({ ...props }: Props) {
  const [searchInputValue, setSearchInputValue] = useState<string | undefined>()
  const { updateSearchParams } = useURLSearchParams()
  async function handleOnChange(search: string) {
    setSearchInputValue(search)
    updateSearchParams('search', search, { replace: true })
  }

  function handleSubmit(): React.FormEventHandler<HTMLInputElement> | undefined {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="relative flex items-center w-full border border-input rounded-md focus-within:ring-1 focus-within:ring-ring">
      <Command className="group transition-all flex flex-row  ">
        <CommandInput
          className="text-primary-foreground flex-auto md:w-[25vw]"
          placeholder="Search products..."
          value={searchInputValue}
          onValueChange={handleOnChange}
        />
        <CommandList className="absolute scale-y-0 top-10 flex z-30 h-fit w-full transition-transform rounded  group-focus-within:scale-y-100 bg-secondary-black-400">
          <CommandEmpty>No results found.</CommandEmpty>
          <div className="flex">
            <CommandSearchSuggestions
              suggestions={props?.suggestions?.categories}
              heading={'Categories'}
            />
            <CommandSearchSuggestions
              suggestions={props?.suggestions?.products}
              heading={'Suggestions'}
            />
          </div>
        </CommandList>
      </Command>
      <Button
        type="submit"
        value="Search"
        className={'ml-auto w-[1rem] h-full'}
        onSubmit={handleSubmit}
      >
        {'>'}
      </Button>
    </div>
  )
}

export default CommandSearch
