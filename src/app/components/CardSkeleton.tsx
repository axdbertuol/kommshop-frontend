import React from 'react'
import { Skeleton } from './ui/skeleton'

function CardSkeleton() {
  return (
    <Skeleton className="w-[300px] h-[450px] rounded-lg">
      <Skeleton className="block min-h-[300px] rounded-lg" />
      <div className="flex pt-4 gap-8 pl-4 justify-between">
        <div className="flex flex-col w-[75%] gap-y-2 ">
          <Skeleton className="h-[28px] rounded-lg" />
          <Skeleton className="h-[20px] rounded-lg" />
          <Skeleton className="h-[20px] rounded-lg" />
        </div>
        <div className="flex flex-1">
          <Skeleton className="self-center h-[25px] w-[25px] rounded-xl" />
        </div>
      </div>
    </Skeleton>
  )
}

export default CardSkeleton
