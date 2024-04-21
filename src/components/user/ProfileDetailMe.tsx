'use client'

import { fetchUserProfile } from '@/app/lib/actions/form/get-user-profile'
import getQueryClient from '@/app/lib/get-query-client'
import { mergeForm, useTransform } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import { useFormState } from 'react-dom'
import { z } from 'zod'
import { profileFormFactory } from './profile-form-factory'
import validateProfileFormData from './validate-profile-form'
import InputBox from '../forms/input/InputBox'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Input } from '../ui/input'
import { cn } from '@/app/lib/utils'
import { ProfileMeEditReq } from '@/types'

type ProfileDetailProps = {
  email: string
  userId: string
  revalidate: () => void
}
function formatCreatedAtDate(timestamp?: string) {
  const parsedTimestamp = Date.parse(timestamp ?? '')
  if (!isNaN(parsedTimestamp)) {
    const date = new Date(parsedTimestamp)
    return date.toLocaleDateString()
  } else {
    return 'Invalid date'
  }
}
function ProfileDetailMe({ userId, revalidate }: ProfileDetailProps) {
  const queryClient = getQueryClient()
  const [editMode, setEditMode] = useState(false)
  const { data, refetch } = useQuery(
    {
      queryKey: ['get-profile', userId],
      queryFn: fetchUserProfile,
      _optimisticResults: 'optimistic',
      refetchOnMount: true,
    },
    queryClient
  )

  const [state, formAction] = useFormState(
    validateProfileFormData,
    profileFormFactory.initialFormState
  )
  const { useStore, Subscribe, handleSubmit, Field, reset } = profileFormFactory.useForm({
    transform: useTransform(
      (baseForm) => {
        if (data) {
          state.values = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            success: data.success,
          } as (ProfileMeEditReq & { success: boolean }) | undefined
        }
        return mergeForm(baseForm, state)
      },
      [state, data]
    ),
  })
  const formErrors = useStore((formState) => formState.errors)

  async function handleFormSubmission() {
    setEditMode(false)
    if (formErrors.length > 0) {
      return
    }
    await handleSubmit()
    revalidate()
    await queryClient.invalidateQueries({ queryKey: ['get-profile', userId] })
  }
  return (
    <form
      action={formAction as never}
      onSubmit={handleFormSubmission}
      className="flex flex-col gap-2 h-full"
    >
      <div className="flex justify-center">
        <span className="text-center text-3xl">Your Profile Details</span>
      </div>
      {formErrors.map((error) => (
        <p key={error as string}>{error}</p>
      ))}
      <Field
        name="firstName"
        validators={{
          onChange: z.string().min(3, 'Nome deve ter mais de 3 caracteres'),
        }}
      >
        {(field) => {
          return (
            <InputBox
              id="firstName"
              horizontal={true}
              name="firstName"
              type="text"
              labelText={'First Name'}
              disabled={field.state.meta.isValidating || !editMode}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              errors={field.state.meta.errors}
            >
              {!editMode && (
                <Input
                  className={cn(
                    'dark:border-secondary-black-400 transition-all focus-within:border-transparent placeholder:font-extralight disabled:cursor-default disabled:opacity-1 '
                  )}
                  disabled={true}
                  value={field.state.value}
                />
              )}
            </InputBox>
          )
        }}
      </Field>
      <Field
        name="lastName"
        validators={{
          onChange: z.string().min(3, 'Nome deve ter mais de 3 caracteres'),
        }}
      >
        {(field) => {
          return (
            <InputBox
              id="lastName"
              horizontal={true}
              name="lastName"
              type="text"
              labelText={'Last Name'}
              disabled={field.state.meta.isValidating}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              errors={field.state.meta.errors}
            >
              {!editMode && (
                <Input
                  className={cn(
                    'dark:border-secondary-black-400 transition-all focus-within:border-transparent placeholder:font-extralight disabled:cursor-default disabled:opacity-1 '
                  )}
                  disabled={true}
                  value={field.state.value}
                />
              )}
            </InputBox>
          )
        }}
      </Field>
      <Field
        name="email"
        validators={{
          onChange: z.string().email('Deve ser um email válido.'),
        }}
      >
        {(field) => {
          return (
            <InputBox
              id="email"
              horizontal={true}
              name="email"
              type="email"
              labelText={'Email'}
              disabled={field.state.meta.isValidating}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              errors={field.state.meta.errors}
            >
              {!editMode && (
                <Input
                  className={cn(
                    'dark:border-secondary-black-400 transition-all focus-within:border-transparent placeholder:font-extralight disabled:cursor-default disabled:opacity-1 '
                  )}
                  disabled={true}
                  value={field.state.value}
                />
              )}
            </InputBox>
          )
        }}
      </Field>
      <Field
        name="username"
        validators={{
          onChange: z.string().min(5, 'Username deve ter mais de 5 caracteres'),
        }}
      >
        {(field) => {
          return (
            <InputBox
              id="username"
              horizontal={true}
              name="username"
              type="text"
              disabled={field.state.meta.isValidating}
              labelText={'Username'}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              errors={field.state.meta.errors}
            >
              {!editMode && (
                <Input
                  className={cn(
                    'dark:border-secondary-black-400 transition-all focus-within:border-transparent placeholder:font-extralight disabled:cursor-default disabled:opacity-1 '
                  )}
                  disabled={true}
                  value={field.state.value}
                />
              )}
            </InputBox>
          )
        }}
      </Field>

      <InputBox
        id="createdat"
        horizontal={true}
        name="createdat"
        type="text"
        disabled={true}
        labelText={'Created Date'}
        value={formatCreatedAtDate(data?.createdAt)}
      >
        {!editMode && (
          <Input
            className={cn(
              'dark:border-secondary-black-400 transition-all focus-within:border-transparent placeholder:font-extralight disabled:cursor-default disabled:opacity-1 '
            )}
            disabled={true}
            value={formatCreatedAtDate(data?.createdAt)}
          />
        )}
      </InputBox>
      <div className="flex justify-around mt-8 h-full">
        <Button
          type="button"
          variant={'outline'}
          className={cn(
            'ring-1 ring-ring transition-all',
            editMode &&
              ' transition-all bg-inherit ring-primary-200 ring-offset-primary-100 ring-offset-4'
          )}
          onClick={async () => {
            if (editMode) {
              reset()
            }
            setEditMode((prevState) => !prevState)
          }}
        >
          {editMode ? 'Editing..' : 'Edit'}
        </Button>
        <Subscribe
          selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || !editMode}
              className="place-self-end"
            >
              {isSubmitting ? '...' : 'Save'}
            </Button>
          )}
        </Subscribe>
      </div>
    </form>
  )
}

export default ProfileDetailMe
