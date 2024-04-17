'use server'
import { getUser } from '@/app/lib/get-user'
import { ModeToggle } from '@/components/ModeToggle'
import { MainNav } from '@/components/nav/MainNav'
import { UserNav } from '@/components/nav/UserNav'
import { unstable_setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { ReactNode, Suspense } from 'react'

export default async function Layout({
  children,
  searchbar,
  params: { locale },
}: {
  children: ReactNode
  searchbar: ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const user = await getUser()
  return (
    <>
      <div className="container border-b bg-muted ">
        <div className="flex h-16 ml-16 items-center px-4 gap-2">
          <div>
            <Image
              src={'/kshop.svg'}
              alt="kommshop"
              width={85}
              height={85}
            />
          </div>
          {searchbar}
          <MainNav className="ml-auto w-full" />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <Suspense fallback={<>...Loading</>}>
              <UserNav user={user} />
            </Suspense>
          </div>
        </div>
      </div>
      {children}
    </>
  )
}
