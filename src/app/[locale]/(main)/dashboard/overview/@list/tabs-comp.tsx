'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { usePathname } from '@/navigation'

export function TabsComp() {
  const tab = usePathname().split('/').at(-1)
  return (
    <Tabs defaultValue={tab}>
      <TabsList>
        <TabsTrigger value="card-list">
          <Link
            className="text-white active:ring-ring active:ring rounded-sm px-1"
            href="/dashboard/overview/card-list"
          >
            List
          </Link>
        </TabsTrigger>
        <TabsTrigger value="data-table">
          <Link
            className="text-white"
            href="/dashboard/overview/data-table"
          >
            Table
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
