import React from 'react'
import { cn } from '@/app/lib/utils'

type Props = React.HTMLAttributes<HTMLBaseElement>
function WarningBox({ children, className }: Props) {
  return (
    <div
      className={cn('flex items-center gap-4  ease-in-out text-yellow-500 ', className)}
    >
      {children}
    </div>
  )
}

export default WarningBox
