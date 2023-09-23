import SearchContextWrapper from '@/store/SearchContextProvider'
import React from 'react'
import { ReactNode } from 'react'

export default function Template({ children }: { children: ReactNode }) {
  return <SearchContextWrapper>{children}</SearchContextWrapper>
}
