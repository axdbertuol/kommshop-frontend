'use client'
import { cn } from '@/app/lib/utils'
import useSearchContext from '@/hooks/useSearchContext'
import useURLSearchParams from '@/hooks/useURLSearchParams'
import { Suggestion } from '@/types'
import React, { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import CommandSearchList from './CommandSearchList'
import { Button } from './ui/button'
import { Command, CommandInput } from './ui/command'
import { SendHorizontalIcon } from 'lucide-react'

type Props = React.HTMLAttributes<HTMLElement> & {
  suggestions: Record<string, Suggestion<'product'>[]> | null
}

function CommandSearch({ ...props }: Props) {
  const { searchValue, setSearchValue, suggestionsListOpen, setSuggestionsListOpen } =
    useSearchContext()
  const { updateSearchParams } = useURLSearchParams()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('')

  function handleOnChange(search: string) {
    setSearchValue(search)
    if (search) setSuggestionsListOpen(true)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement | HTMLInputElement>) {
    e.preventDefault()
    if (searchValue) {
      updateSearchParams('search', searchValue, { replace: true })
      setSearchValue('')
      setSuggestionsListOpen(false)
    }
  }

  function handleSelect(value: string) {
    setSearchValue(value)
    setSuggestionsListOpen(false)
    inputRef.current?.focus()
  }
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearchValue(searchValue!)
    }, 150) // Adjust the delay as needed

    return () => {
      clearTimeout(debounceTimer)
    }
  }, [searchValue])

  return (
    <form
      className="relative flex items-center"
      onSubmit={handleSubmit}
      onMouseLeave={() => {
        setSuggestionsListOpen(false)
      }}
    >
      <Command className="transition-all flex flex-row w-full border border-input rounded-md focus-within:ring-1 focus-within:ring-ring  ">
        <CommandInput
          ref={inputRef}
          data-testid="command-input"
          className="text-primary flex-auto md:w-[25vw]"
          placeholder="Search products..."
          value={searchValue ?? undefined}
          onClick={() => {
            setSuggestionsListOpen(true)
          }}
          onMouseEnter={() => {
            setSuggestionsListOpen(true)
          }}
          onKeyDownCapture={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' || e.key === 'Return') {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          onValueChange={handleOnChange}
        />
        {suggestionsListOpen && (
          <CommandSearchList
            suggestions={props.suggestions}
            debouncedSearchValue={debouncedSearchValue}
            className={cn(
              suggestionsListOpen &&
                'h-fit opacity-100 transition-transform translate-y-0'
            )}
            onSelectSuggestion={handleSelect}
          />
        )}
        <Button
          type="submit"
          value="Search"
          variant={'destructive'}
          className={'self-center w-12'}
        >
          <SendHorizontalIcon
            color="white"
            size={16}
          />
        </Button>
      </Command>
    </form>
  )
}

export default CommandSearch
