'use server'
import { CreateProductResponse, StatusErrors } from '@/types'
import { patchMe } from './patch-me'

export type ProfileEdit = {
  username?: string
  firstName?: string
  lastName?: string
}
export type ProfileEditResponse = ProfileEdit & StatusErrors
export async function handleProfileEditSubmission(
  prevState: ProfileEditResponse,
  formData: FormData
): Promise<ProfileEditResponse> {
  let username
  let firstName
  let lastName
  let profile = {} as ProfileEdit
  try {
    username = formData.get('username')?.toString() ?? null
    firstName = formData.get('firstName')?.toString() ?? null
    lastName = formData.get('lastName')?.toString() ?? null
    profile = {
      ...(username && { username }),
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
    } as ProfileEdit
  } catch (err) {
    console.error(err)
    return prevState
  }

  const actionResult = (await patchMe(profile)) as ProfileEditResponse
  if (!actionResult.success) {
    return {
      ...prevState,
      success: false,
      serverErrors: actionResult.serverErrors,
    } as CreateProductResponse
  }

  return { ...profile, success: true }
}
