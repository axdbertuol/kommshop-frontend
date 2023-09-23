'use client'
import React from 'react'
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Command,
} from './ui/command'
import { Button } from './ui/button'
import useURLSearchParams from '@/hooks/useURLSearchParams'

type Props = {
  defaultFilters: {
    label: string
    value: string
  }[]
} & React.HTMLAttributes<HTMLElement>

function CommandSearch({ defaultFilters, ...props }: Props) {
  const { searchParams } = useURLSearchParams()
  const searchValue = searchParams.get('search') ?? undefined

  function handleOnChange(search: string) {
    // handleSearchValue(search)
  }

  function handleSubmit(): React.FormEventHandler<HTMLInputElement> | undefined {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="relative md:w-[25vw] flex items-center w-full border border-input rounded-md focus-within:ring-1 focus-within:ring-ring">
      <Command className="group transition-all flex flex-row  ">
        <CommandInput
          className="text-primary-foreground flex-auto md:w-[12vw]"
          placeholder="Search products..."
          value={searchValue}
          onValueChange={handleOnChange}
        />
        <CommandList className="absolute scale-y-0 top-10 flex z-30 h-fit w-full transition-transform rounded  group-focus-within:scale-y-100">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup
            heading="Suggestions"
            className="z-30"
          >
            {defaultFilters?.map((filter, index) => (
              <CommandItem
                key={index}
                className="w-full"
                // onClick={}
              >
                {filter.label}
              </CommandItem>
            ))}
          </CommandGroup>
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
