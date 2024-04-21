import { patchMe } from '@/app/lib/actions/form/patch-me'
import { createFormFactory } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'

export const profileFormFactory = createFormFactory({
  defaultValues: {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    success: false,
  },
  validatorAdapter: zodValidator,
  onServerValidate({ value }) {
    // verify email and username not exists
    return zodValidator().validate({ value }, userProfileMeSchema)
  },
  async onSubmit({ value }) {
    const actionResult = await patchMe(value)
    if (!actionResult.success) {
      return {
        ...value,
        success: false,
        serverErrors: actionResult.serverErrors,
      }
    }
    return { ...value, success: true }
  },
})

export const userProfileMeSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  username: z.string().min(5),
})
export type TUserProfileMeSchema = z.infer<typeof userProfileMeSchema>
