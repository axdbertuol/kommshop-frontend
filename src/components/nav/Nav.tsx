'use client'
import React from 'react'
import { MainNav } from './MainNav'
import { UserNav } from './UserNav'

function Nav() {
  return (
    <div className="border-b">
      <div className="flex h-16 ml-16 items-center px-4">
        <h2>Kommshop</h2>
        <MainNav className="ml-auto" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  )
}

export default Nav
