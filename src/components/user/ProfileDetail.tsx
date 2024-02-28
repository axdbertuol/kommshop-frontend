'use client'
import React, { useEffect, useState } from 'react'

import { getUserProfile } from '@/app/lib/actions/form/get-user-profile'
import getQueryClient from '@/app/lib/get-query-client'
import { cn } from '@/app/lib/utils'
import { Link, useRouter } from '@/navigation'
import { UserProfile } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import ProfileDetailEdit from './ProfileDetailEdit'

type ProfileDetailProps = {
  email: string
  userId: number
}

// TODO: change this ssr. remember this query is not updated quickly enough
function ProfileDetail({ email, userId }: ProfileDetailProps) {
  const timeout = 10000
  const router = useRouter()
  const searchParams = useSearchParams()
  const [didSave, setDidSave] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const queryClient = getQueryClient()

  const { data, refetch } = useQuery(
    {
      queryKey: ['get-profile', userId],
      queryFn: () => getUserProfile(userId) as Promise<UserProfile>,
      _optimisticResults: 'optimistic',
      notifyOnChangeProps: 'all',
      refetchOnMount: true,
    },
    queryClient
  )

  const isEditMode = searchParams.get('edit') === 'true'

  useEffect(() => {
    if (didSave) {
      setDidSave(false)
      setIsWaiting(true)
      setTimeout(async () => {
        await refetch()
        setIsWaiting(false)
      }, timeout)
    }
  }, [didSave, router, refetch])

  return (
    <>
      {isEditMode && data ? (
        <ProfileDetailEdit
          data={data}
          email={email}
          userId={userId}
          setDidSave={setDidSave}
        />
      ) : (
        <div className="p-4 h-full bg-secondary border-b-2 border-r-2 border-primary rounded-b-lg lg:w-full transition-all">
          {isWaiting && <>Updating your new data on our database...</>}
          <div className={cn(isWaiting ? 'blur-sm' : '')}>
            <div className="text-xs w-full text-right">
              <Link
                className="text-xs w-full text-right"
                href={'/settings/profile?edit=true'}
              >
                edit
              </Link>
            </div>
            <p>first name</p>
            <p className="text-primary-light">{data?.firstName}</p>
            <p>last name</p>
            <p className="text-primary-light">{data?.lastName}</p>
            <p>email</p>
            <p className="text-primary-light">{email}</p>
            <p>username</p>
            <p className="text-primary-light">{data?.username}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileDetail
