'use server'
import { Button } from '@/components/ui/button'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode
  list: React.ReactNode
}

export default async function Layout({ list }: Props) {
  return (
    <div className="mx-auto mt-8 max-w-[80vw] min-h-[80vh] rounded-lg border ">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-max flex justify-center"
      >
        <ResizablePanel defaultSize={80}>
          <div className="flex flex-col gap-2 w-full min-h-max  p-6">
            <div>
              <Button className="">
                <Link
                  className="text-white active:ring-ring active:ring rounded-sm px-1"
                  href="/dashboard/add"
                >
                  <Plus />
                </Link>
              </Button>
            </div>
            {list}
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={20}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={10}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={10}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
      {/* Charts
      <ResizablePanelGroup
        direction="horizontal"
        className=" rounded-lg border flex "
      >
        <ResizablePanel defaultSize={100}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Four</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup> */}
    </div>
  )
}
