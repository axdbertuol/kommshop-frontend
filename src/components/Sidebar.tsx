'use client'
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { cn } from '@/app/lib/utils'
import React, { useState } from 'react'
import SideNavLink from './SideNavLink'
import ShopBag from './icons/ShopBag'
import AnimatedArrow from './icons/AnimatedArrow'

const links = [
  {
    label: 'Home',
    href: '/',
    icon: <ShopBag />,
  },
  {
    label: 'Home',
    href: '/',
    icon: <ShopBag />,
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg
        xmlns="http://www.w4.org/2000/svg"
        fill="none"
        viewBox="1 0 24 24"
        strokeWidth="2.5"
        stroke="currentColor"
        className="w-5 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
        />
      </svg>
    ),
  },
]

function Sidebar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const [isOpen, setIsOpen] = useState(false)
  const sizes = { min: 25, max: '48rem' }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn('fixed z-30 top-0 flex ', className)}
      {...props}
    >
      <NavigationMenu
        data-orientation="vertical"
        className={cn(
          'max-w-[4rem] min-w-[4rem] w-16 pt-7 border border-r-2  ring ring-primary rounded md:h-screen bg-neutral-950 bg-opacity-30 items-start',
          isOpen ? `md:w-[13rem] md:min-w-[12rem]` : ''
        )}
      >
        <ul
          data-orientation="vertical"
          className="w-full mt-32 flex flex-col divide-y border-t border-b"
        >
          {links.map((link, index) => (
            <SideNavLink
              key={link.label + index}
              to={link.href}
              icon={link.icon}
              label={link.label}
              className="text-center"
            />
          ))}
        </ul>
      </NavigationMenu>

      <CollapsibleTrigger className={cn(`flex pt-${sizes.min} w-4 h-screen group`)}>
        <AnimatedArrow
          direction={isOpen ? 'left' : 'right'}
          className={cn('z-20', `mt-${'24'} group-hover:block`)}
        />
      </CollapsibleTrigger>
    </Collapsible>
  )
}

export default Sidebar
