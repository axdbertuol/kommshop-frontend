'use server'
import { profileFormFactory } from './profile-form-factory'

export default async function validateProfileFormData(
  _prev: unknown,
  formData: FormData
) {
  return await profileFormFactory.validateFormData(formData)
}
