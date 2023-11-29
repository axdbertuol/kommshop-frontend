import React from 'react'
import '@/app/globals.css'

type Props = { children: React.ReactNode }
export default async function Template({ children }: Props) {
  return (
    <div className="min-h-screen pb-4 w-full md:w-[66vw] lg:w-[40vw] bg-neutral-300 dark:bg-neutral-800 md:mx-auto">
      {children}
    </div>
  )
}
