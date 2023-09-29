import React from 'react'
import { Badge, BadgeProps } from './ui/badge'
import { cn } from '@/app/lib/utils'

type Props = {
  children: React.ReactNode
} & BadgeProps
function FilterBadge({ children, className, ...props }: Props) {
  return (
    <Badge
      className={cn(className)}
      {...props}
    >
      {children}
    </Badge>
  )
}

export default FilterBadge
