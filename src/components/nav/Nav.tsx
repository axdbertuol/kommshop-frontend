'use server'
import React, { Suspense } from 'react'
import { MainNav } from './MainNav'
import { UserNav } from './UserNav'
import { LoginResponse } from '@/types'
import { ModeToggle } from '../ModeToggle'

async function Nav({ user }: { user: LoginResponse['user'] | null }) {
  return (
    <div className="container border-b bg-muted ">
      <div className="flex h-16 ml-16 items-center px-4">
        <h2>Kommshop</h2>
        <MainNav className="ml-auto w-full" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <Suspense fallback={<>...Loading</>}>
            <UserNav user={user} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Nav
