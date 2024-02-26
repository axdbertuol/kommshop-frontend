'use client'
import Link from 'next/link'

import { cn } from '@/app/lib/utils'
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import { useState } from 'react'

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const [selectedLink, setSelectedLink] = useState<string>('')

  const active = 'text-sm font-medium transition-colors hover:text-primary'
  const inactive = active + ' text-muted-foreground'
  return (
    <NavigationMenu className={cn(className)}>
      <NavigationMenuList
        data-orientation="horizontal"
        className={'flex items-center space-x-4 lg:space-x-6'}
      >
        <NavigationMenuItem
          data-orientation="horizontal"
          className=""
        >
          <Link
            href="/store"
            className={cn(selectedLink === 'store' ? active : inactive)}
            onClick={() => setSelectedLink('store')}
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Store
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem data-orientation="horizontal">
          <Link
            href="/dashboard"
            className={cn(selectedLink === 'dashboard' ? active : inactive)}
            onClick={() => setSelectedLink('dashboard')}
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/dashboard"
            className={cn(selectedLink === 'settings' ? active : inactive)}
            onClick={() => setSelectedLink('settings')}
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Settings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
