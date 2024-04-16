import { fetchUserProfile } from '@/app/lib/actions/form/get-user-profile'
import getQueryClient from '@/app/lib/get-query-client'
import { getUser } from '@/app/lib/get-user'
import ProfileDetail from '@/components/user/ProfileDetail'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'

import React, { Suspense } from 'react'

const defaultImg = process.env.DEFAULT_USER_IMG_URL ?? ''

export default async function Layout({
  params: { locale },
}: {
  params: { locale: string }
}) {
  // TODO: fetch from user microservice the whole information
  async function revalidate() {
    'use server'
    return revalidatePath('/' + locale + '/settings/profile')
  }
  const user = await getUser()
  if (!user) return null
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-profile', user.id],
    queryFn: fetchUserProfile,
  })
  return (
    <div className="flex justify-center gap-y-4">
      <div className="flex h-[70vh] w-[40vw]">
        <div className="bg-card rounded-lg p-4 shadow-lg ">
          <Suspense fallback={<>Loading...</>}>
            <Image
              src={defaultImg}
              alt={'pic'}
              width={300}
              height={300}
              className="w-full lg:rounded-tr-none border-primary object-cover rounded-t-lg"
            />
          </Suspense>
        </div>
        <Suspense fallback={<>Loading...</>}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ProfileDetail
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              email={user.email ?? 'noEmailRegistered'}
              userId={user.id}
              revalidate={revalidate}
            />
          </HydrationBoundary>
        </Suspense>
      </div>
    </div>
  )
}
