import React from 'react'
import { Skeleton } from './ui/skeleton'

function CardSkeleton() {
  return (
    <div className="w-[300px] h-full">
      <Skeleton className="h-[150px] rounded-md" />
      <div className="p-6 pt-2">
        <Skeleton className="h-[28px] rounded-md" />
        <Skeleton className="h-[20px] rounded-md" />
      </div>
    </div>
  )
}

export default CardSkeleton
