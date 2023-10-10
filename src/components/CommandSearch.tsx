'use client'
import React, { FormEvent, useState, KeyboardEvent, useRef } from 'react'
import { CommandInput, Command } from './ui/command'
import { Button } from './ui/button'
import useURLSearchParams from '@/hooks/useURLSearchParams'
import { Suggestion } from '@/types/common'
import useSearchContext from '@/hooks/useSearchContext'
import CommandSearchList from './CommandSearchList'
import { cn } from '@/app/lib/utils'

type Props = React.HTMLAttributes<HTMLElement> & {
  suggestions: Suggestion[] | null
}

function CommandSearch({ ...props }: Props) {
  const [open, setOpen] = useState(false)
  const { searchValue, setSearchValue } = useSearchContext()
  const { updateSearchParams } = useURLSearchParams()
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleOnChange(search: string) {
    setSearchValue(search)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement | HTMLInputElement>) {
    e.preventDefault()
    if (searchValue) {
      updateSearchParams('search', searchValue, { replace: true })
      setSearchValue('')
      setOpen(false)
    }
  }

  function handleSelect(value: string) {
    setSearchValue(value)
    setOpen(false)
    inputRef.current?.focus()
  }

  return (
    <form
      className="relative flex items-center"
      onSubmit={handleSubmit}
      onMouseLeave={() => {
        setOpen(() => false)
      }}
    >
      <Command className="transition-all flex flex-row w-full border border-input rounded-md focus-within:ring-1 focus-within:ring-ring  ">
        <CommandInput
          ref={inputRef}
          className="text-primary-foreground flex-auto md:w-[25vw]"
          placeholder="Search products..."
          value={searchValue ?? undefined}
          onClick={() => {
            setOpen(() => true)
          }}
          onMouseEnter={() => {
            setOpen(() => true)
          }}
          onKeyDownCapture={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' || e.key === 'Return') {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          onValueChange={handleOnChange}
        />
        {props?.suggestions && (
          <CommandSearchList
            suggestions={props.suggestions}
            className={cn(open && 'h-fit opacity-100 transition-transform translate-y-0')}
            onSelectSuggestion={handleSelect}
          />
        )}
      </Command>
      <Button
        type="submit"
        value="Search"
        className={'ml-auto w-[1rem] h-full scale-y-125'}
      >
        {'>'}
      </Button>
    </form>
  )
}

export default CommandSearch
