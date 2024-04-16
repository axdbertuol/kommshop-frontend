import { ResetPass, ResetPassResponse } from '@/types'
import { forgotPassword } from './forgot-password'
import { resetPassword } from './reset-password'
import { resetPasswordSchema } from './schemas'
import { z } from 'zod'
import { parseZodErrors } from '../../utils'

export async function handleResetPasswordSubmit(
  prevState: ResetPass,
  formData: FormData
): Promise<ResetPassResponse> {
  let password
  let password2
  let token
  let resetPass = {} as ResetPass
  try {
    password = formData.get('password')?.toString() ?? null
    password2 = formData.get('password2')?.toString() ?? null
    token = formData.get('token')?.toString() ?? null
    resetPass = {
      ...(password && { password }),
      ...(password2 && { password2 }),
      ...(token && { token }),
    } as ResetPass
  } catch (err) {
    console.error(err)
    return { ...prevState, success: false }
  }
  const validateResult = await resetPasswordSchema.spa(resetPass)
  if (!validateResult?.success) {
    return parseZodErrors(validateResult.error) as ResetPassResponse
  }
  const actionResult = (await resetPassword(
    resetPass.password,
    resetPass.token
  )) as ResetPassResponse

  if (!actionResult.success) {
    return {
      ...prevState,
      success: false,
      serverErrors: actionResult.serverErrors,
    } as ResetPassResponse
  }

  return { ...resetPass, success: true }
}
