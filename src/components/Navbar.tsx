'use client'

import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import Image from 'next/image'

const theme = {
  root: {
    base: 'bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4',
    rounded: {
      on: 'rounded',
      off: '',
    },
    bordered: {
      on: 'border',
      off: '',
    },
    inner: {
      base: 'mx-auto flex flex-wrap items-center justify-between',
      fluid: {
        on: '',
        off: 'container',
      },
    },
  },
  brand: {
    base: 'flex items-center',
  },
  collapse: {
    base: 'w-full md:block md:w-auto text-center',
    list: 'mt-4 flex flex-col  md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium',
    hidden: {
      on: 'hidden',
      off: '',
    },
  },
  link: {
    base: 'block py-2 pr-4 pl-3 md:p-0',
    active: {
      on: 'bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700',
      off: 'border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white',
    },
    disabled: {
      on: 'text-gray-400 hover:cursor-not-allowed dark:text-gray-600',
      off: '',
    },
  },
  toggle: {
    base: 'inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden',
    icon: 'h-6 w-6 shrink-0',
  },
}

export default function NavbarWithDropdown() {
  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand
        className="mx-12 md:mx-16"
        href="https://flowbite-react.com"
      >
        <span className="self-center z-10 whitespace-nowrap text-xl font-semibold dark:text-white">
          KommShop
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <span>Dashboard</span>
          <span>Settings</span>
          <span>Earnings</span>
          <Dropdown.Divider />
          <span>Sign out</span>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse theme={theme.collapse}>
        <Navbar.Link
          active
          href="#"
          className="text-center"
        >
          <p>Home</p>
        </Navbar.Link>
        <Navbar.Link
          href="#"
          className="text-center"
        >
          About
        </Navbar.Link>

        <Navbar.Link
          href="#"
          className="text-center"
        >
          Services
        </Navbar.Link>
        <Navbar.Link
          href="#"
          className="text-center"
        >
          Pricing
        </Navbar.Link>
        <Navbar.Link
          href="#"
          className="text-center"
        >
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
