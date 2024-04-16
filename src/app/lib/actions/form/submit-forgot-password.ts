import { ForgotPass, ForgotPassResponse } from '@/types'
import { forgotPassword } from './forgot-password'

export async function handleForgotPasswordSubmit(
  prevState: ForgotPass,
  formData: FormData
): Promise<ForgotPassResponse> {
  let email
  let forgotPass = {} as ForgotPass
  try {
    email = formData.get('email')?.toString() ?? null
    forgotPass = {
      ...(email && { email }),
    } as ForgotPass
  } catch (err) {
    console.error(err)
    return { ...prevState, success: false }
  }

  const actionResult = (await forgotPassword(forgotPass.email)) as ForgotPassResponse
  if (!actionResult.success) {
    return {
      ...prevState,
      success: false,
      serverErrors: actionResult.serverErrors,
    } as ForgotPassResponse
  }

  return { ...forgotPass, success: true }
}
