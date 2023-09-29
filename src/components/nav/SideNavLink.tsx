import { CollapsibleContent } from '../ui/collapsible'
import { NavigationMenuLink } from '../ui/navigation-menu'
import Link from 'next/link'
import { navigationMenuTriggerStyle } from '../ui/navigation-menu'
import { cn } from '@/app/lib/utils'
import React from 'react'

type Props =
  | {
      to: string
      label: string
      icon: React.ReactNode | React.JSX.Element
    } & React.HTMLAttributes<HTMLElement>

function SideNavLink({ to, label, icon, className, ...props }: Props) {
  return (
    <li className="w-full">
      <Link
        href={to}
        legacyBehavior
        passHref
        {...props}
      >
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            'flex justify-between gap-x-4 min-w-full',
            className
          )}
        >
          <span className="self-start max-w-[25%]">{icon}</span>
          <CollapsibleContent className="w-full self-center">
            <span>{label}</span>
          </CollapsibleContent>
        </NavigationMenuLink>
      </Link>
    </li>
  )
}

export default SideNavLink
