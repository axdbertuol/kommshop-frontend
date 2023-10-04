'use client'
import React, { FormEvent, useState } from 'react'
import { CommandInput, Command } from './ui/command'
import { Button } from './ui/button'
import useURLSearchParams from '@/hooks/useURLSearchParams'
import { Suggestion } from '@/types/common'
import useSearchContext from '@/hooks/useSearchContext'
import CommandSearchList from './CommandSearchList'

type Props = React.HTMLAttributes<HTMLElement> & {
  suggestions: Suggestion[] | null
}

function CommandSearch({ ...props }: Props) {
  const [open, setOpen] = useState(false)
  const { searchValue, setSearchValue } = useSearchContext()
  // const { shouldRefetch, setShouldRefetch } = useSearchContext()
  const { updateSearchParams } = useURLSearchParams()

  async function handleOnChange(search: string) {
    setSearchValue(search)
    // await mutation.mutateAsync(search)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (searchValue) {
      updateSearchParams('search', searchValue, { replace: true })
      setSearchValue('')
    }
  }
  // console.log('data', data, props.suggestions)
  // console.log('isLoading', isLoading)
  // console.log('isError', isError)
  // console.log('isSuccess', isSuccess)
  // console.log('isFetching', isFetching)
  return (
    <form
      className="relative flex items-center "
      onSubmit={handleSubmit}
      onMouseLeave={() => {
        setOpen(() => false)
      }}
    >
      <Command className="transition-all flex flex-row w-full border border-input rounded-md focus-within:ring-1 focus-within:ring-ring  ">
        <CommandInput
          className="text-primary-foreground flex-auto md:w-[25vw]"
          placeholder="Search products..."
          value={searchValue ?? undefined}
          onClick={() => {
            setOpen(() => true)
          }}
          onMouseEnter={() => {
            setOpen(() => true)
          }}
          onValueChange={handleOnChange}
        />
        <CommandSearchList
          suggestions={props?.suggestions}
          open={open}
        />
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
