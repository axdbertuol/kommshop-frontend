'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function TabsComp() {
  const tab = useSearchParams()
  return (
    <Tabs defaultValue={tab.get('as')?.toString()}>
      <TabsList>
        <TabsTrigger value="as=card-list">
          <Link
            className="text-primary active:ring-ring active:ring rounded-sm px-1"
            href="/dashboard/overview?as=card-list"
          >
            List
          </Link>
        </TabsTrigger>
        <TabsTrigger value="as=data-table">
          <Link
            className="text-primary"
            href="/dashboard/overview?as=data-table"
          >
            Table
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
