'use client'
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { cn } from '@/app/lib/utils'
import React, { useState } from 'react'
import SideNavLink from './nav/SideNavLink'
import AnimatedArrow from './icons/AnimatedArrow'
import { BookOpenText } from 'lucide-react'
const links = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: <BookOpenText />,
  },
  // {
  //   label: 'Store',
  //   href: '/store',
  //   icon: <ShopBag />,
  // },
  // {
  //   label: 'Home',
  //   href: '/',
  //   icon: <ShopBag />,
  // },
]

function Sidebar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const [isOpen, setIsOpen] = useState(false)
  const sizes = { min: 25, max: '48rem' }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(' z-30 flex', className)}
      {...props}
    >
      <NavigationMenu
        data-orientation="vertical"
        className={cn(
          'max-w-[4rem] min-w-[4rem] w-16 pt-7 border-r-2 border-primary-400 opacity-75 rounded-b md:h-screen items-start',
          isOpen ? `md:w-[13rem] md:min-w-[12rem] ` : ''
        )}
      >
        <ul
          data-orientation="vertical"
          className="w-full mt-32 flex flex-col divide-y"
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
          color="red"
        />
      </CollapsibleTrigger>
    </Collapsible>
  )
}

export default Sidebar
