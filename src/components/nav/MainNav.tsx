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
interface NavigationMenuItemProps {
  path: string
  selectedLink: string
  setSelectedLink: React.Dispatch<React.SetStateAction<string>>
  children: React.ReactNode
}
interface MenuItem {
  path: string
  label: string
}
interface NavigationMenuProps {
  items: MenuItem[]
}
// Usage
const items: MenuItem[] = [
  { path: '/store', label: 'Store' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/settings', label: 'Settings' },
]

const NavigationMenuItemComp = ({
  path,
  selectedLink,
  setSelectedLink,
  children,
}: NavigationMenuItemProps) => {
  const active = 'active'
  const inactive = 'inactive'

  return (
    <NavigationMenuItem data-orientation="horizontal">
      <Link
        href={path}
        className={cn(selectedLink === path ? active : inactive)}
        onClick={() => setSelectedLink(path)}
      >
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const [selectedLink, setSelectedLink] = useState<string>('')

  return (
    <NavigationMenu className={cn(className)}>
      <NavigationMenuList
        data-orientation="horizontal"
        className={'flex items-center space-x-4 lg:space-x-6'}
      >
        {items.map((item) => (
          <NavigationMenuItemComp
            key={item.path}
            path={item.path}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
          >
            {item.label}
          </NavigationMenuItemComp>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
