import { cn } from '@/app/lib/utils'
import { useTheme } from 'next-themes'
import React from 'react'

type Props = {
  direction: 'right' | 'left'
} & React.HTMLAttributes<HTMLElement>

const AnimatedArrow = ({ direction = 'left', className }: Props) => {
  const { resolvedTheme } = useTheme()
  return (
    <div className={cn('cursor-pointer hidden', className)}>
      <svg
        width="12"
        height="12"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 23 24"
        className={cn(
          'w-6 h-6 transition-transform transform-gpu',
          `animate-arrow-${direction}`
        )}
        stroke={(resolvedTheme === 'dark' && 'red') || 'black'}
        fill={'transparent'}
      >
        {direction === 'left' ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        )}
      </svg>
    </div>
  )
}

export default AnimatedArrow
