import { AuthProvidersEnum } from '@/enum'
import { z } from 'zod'

export const schemaAuthBasic = z.object({
  provider: z.enum([AuthProvidersEnum.credentials, AuthProvidersEnum.google]),
})

export const googleSigninSchema = z
  .object({
    idToken: z.string(),
  })
  .merge(schemaAuthBasic)

export const credSigninSchema = z
  .object({
    password: z.string(),
    email: z.string().email(),
  })
  .merge(schemaAuthBasic)

export const credSignupSchema = credSigninSchema
  .merge(
    z.object({
      password2: z.string(),
    })
  )
  .merge(schemaAuthBasic)
  .refine(
    (values) => values.password === values.password2,
    () => ({ message: `Passwords must match.`, path: ['password2'] })
  )

export type TCredSignupSchema = z.infer<typeof credSignupSchema>
export type TCredSigninSchema = z.infer<typeof credSigninSchema>
export type TGoogleSigninSchema = z.infer<typeof googleSigninSchema>
