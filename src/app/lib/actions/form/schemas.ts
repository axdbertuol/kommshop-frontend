import { AuthProvidersEnum } from '@/enum'
import { z } from 'zod'
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
const alphaRegex = /^[A-Za-z\s]+$/
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
      firstName: z
        .string()
        .regex(alphaRegex)
        .min(2)
        .transform(
          (arg) => arg[0].toLocaleUpperCase() + arg.substring(1).toLocaleLowerCase()
        ),
      lastName: z
        .string()
        .regex(alphaRegex)
        .min(2)
        .transform(
          (arg) => arg[0].toLocaleUpperCase() + arg.substring(1).toLocaleLowerCase()
        ),
      password: z
        .string()
        .regex(strongPasswordRegex, { message: 'passwordRegexInvalid' }),
      password2: z.string(),
    })
  )
  .merge(schemaAuthBasic)
  .refine(
    (values) => values.password === values.password2,
    () => ({ message: `passwordsMustMatch`, path: ['password2'] })
  )

export type TCredSignupSchema = z.infer<typeof credSignupSchema>
export type TCredSigninSchema = z.infer<typeof credSigninSchema>
export type TGoogleSigninSchema = z.infer<typeof googleSigninSchema>
