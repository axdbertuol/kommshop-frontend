'use client'

import { Sidebar } from 'flowbite-react'
import { useState } from 'react'
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi'

export default function KommSidebar() {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  return (
    <Sidebar
      aria-label="Sidebar"
      collapsed={collapsed}
      // collapseBehavior="hide"

      className="inline-block h-screen"
    >
      <Sidebar.Logo
        href="#"
        img="/favicon.ico"
        imgAlt="Flowbite logo"
        onClick={() => setCollapsed((prevState) => !prevState)}
      />
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="#"
            icon={HiChartPie}
          >
            <p>Dashboard</p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiViewBoards}
          >
            <p>Kanban</p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiInbox}
          >
            <p>Inbox</p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiUser}
          >
            <p>Users</p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiShoppingBag}
          >
            <p>Products</p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiArrowSmRight}
          >
            <p>Sign In</p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiTable}
          >
            <p>Sign Up</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
