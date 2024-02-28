'use client'
import React, { useEffect, useRef } from 'react'

import { cn } from '@/app/lib/utils'
import { useFormState, useFormStatus } from 'react-dom'
import { handleProfileEditSubmission } from '@/app/lib/actions/form/submit-user-edit'
import { Button } from '../ui/button'
import { useRouter } from '@/navigation'
import { UserProfile } from '@/types'
import getQueryClient from '@/app/lib/get-query-client'

type ProfileDetailProps = {
  email: string
  userId: number
  data: UserProfile
  setDidSave: (did: boolean) => void
}

function ProfileDetailEdit({ email, userId, data, setDidSave }: ProfileDetailProps) {
  const queryClient = getQueryClient()
  const [state, formAction] = useFormState(handleProfileEditSubmission, {
    ...data,
    success: false,
  })

  const { pending } = useFormStatus()
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      setDidSave(true)
      router.push('/settings/profile')
    }
  }, [state, router, setDidSave])

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={async () => {
        await queryClient.invalidateQueries({ queryKey: ['get-profile', userId] })
      }}
      className="p-4 h-full bg-secondary border-b-2 border-r-2 border-primary rounded-b-lg lg:w-full"
    >
      <p>first name</p>
      <p className="text-primary-light">{data?.firstName}</p>
      <p>last name</p>
      <p className="text-primary-light">{data?.lastName}</p>
      <p>email</p>
      <p className="text-primary-light">{email}</p>
      <>
        <sub>username</sub>
        <div className="flex gap-2">
          <input
            id="username"
            name="username"
            disabled={pending}
            className={cn('text-primary-light bg-card-foreground')}
            defaultValue={state.username}
          />
        </div>
      </>
      <div className="w-full text-right mt-2">
        <Button
          type="submit"
          variant={'secondary'}
          disabled={pending}
        >
          Save
        </Button>
      </div>
    </form>
  )
}

export default ProfileDetailEdit
