'use server'
import React, { Suspense } from 'react'
import { MainNav } from './MainNav'
import { MemoizedUserNav } from './UserNav'
import { LoginResponseUserDto } from 'kommshop-types'

async function Nav({ user }: { user: LoginResponseUserDto | null }) {
  return (
    <div className="border-b">
      <div className="flex h-16 ml-16 items-center px-4">
        <h2>Kommshop</h2>
        <MainNav className="ml-auto" />
        <div className="ml-auto flex items-center space-x-4">
          <Suspense fallback={<>...Loading</>}>
            <MemoizedUserNav user={user} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Nav
