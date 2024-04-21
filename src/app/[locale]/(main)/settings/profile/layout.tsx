import { fetchUserProfile } from '@/app/lib/actions/form/get-user-profile'
import getQueryClient from '@/app/lib/get-query-client'
import { getUser } from '@/app/lib/get-user'
import ProfileDetail from '@/components/user/ProfileDetailMe'
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
    <div className="flex flex-col bg-primary-foreground">
      <div className="flex ml-32 justify-start gap-4 mt-4">
        <div className="bg-card rounded-lg p-4 shadow-lg h-fit">
          <Suspense fallback={<>Loading...</>}>
            <Image
              src={defaultImg}
              alt={'pic'}
              width={100}
              height={50}
              className="w-full lg:rounded-tr-none border-primary object-cover rounded-t-lg"
            />
          </Suspense>
        </div>
        <Suspense fallback={<>Loading...</>}>
          <div className="rounded-md p-16">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <ProfileDetail
                email={user.email ?? 'noEmailRegistered'}
                userId={user.id}
                revalidate={revalidate}
              />
            </HydrationBoundary>
          </div>
        </Suspense>
      </div>
    </div>
  )
}
