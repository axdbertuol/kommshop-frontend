import { AuthProvidersEnum } from '@/enum'
import { z } from 'zod'

export const credSigninSchema = z.object({
  password: z.string(),
  email: z.string().email(),
})
export const credSignupSchema = credSigninSchema
  .merge(
    z.object({
      password2: z.string(),
    })
  )
  .refine(
    (values) => values.password === values.password2,
    () => ({ message: `Passwords must match.` })
  )

export const googleSigninSchema = z.object({
  idToken: z.string(),
})

export const schemaAuthBasic = z.object({
  provider: z.enum([AuthProvidersEnum.credentials, AuthProvidersEnum.google]),
})
