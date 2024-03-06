'use server'
import { ZodSchema } from 'zod'

import { parseZodErrors } from '../utils'

export async function validateAuth<T>(data: Record<string, any>, schema: ZodSchema<T>) {
  const actionValidation = await schema.spa(data)
  if (!actionValidation.success) {
    return parseZodErrors<T>(actionValidation.error)
  }
  return actionValidation
}
