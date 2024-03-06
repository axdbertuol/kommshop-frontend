// 'use client'
import React, { Suspense } from 'react'
import { SearchParams } from '@/types'

type Props = {
  searchParams: SearchParams
}

export default async function Default({ searchParams }: Props) {
  return <div className="flex flex-col items-center gap-y-4 "></div>
}
