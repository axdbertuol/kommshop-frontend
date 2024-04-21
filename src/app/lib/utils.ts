import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { HTTP_CODES_ENUM } from '@/enum'
import { ServerErrorResponse } from '@/types'
import { ZodError } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isGoodHTTPResponseStatus = (status: number | string): boolean =>
  [
    HTTP_CODES_ENUM.ACCEPTED,
    HTTP_CODES_ENUM.OK,
    HTTP_CODES_ENUM.CREATED,
    HTTP_CODES_ENUM.NO_CONTENT,
  ].includes(Number(status))

export const isTokenExpired = (expiration: number | string) => {
  if (typeof expiration === 'number') {
    return expiration ? expiration < Date.now() : false
  }
  const expiry = Date.parse(expiration)
  return expiry < Date.now()
}

export function parseServerErrors(serverErrors: ServerErrorResponse) {
  if (!(serverErrors?.error || serverErrors?.errors)) {
    return undefined
  }
  const allErrors = {
    ...(serverErrors?.errors
      ? Object.fromEntries(
          Object.entries(serverErrors.errors).map(([key, value]) => [
            key,
            typeof value === 'string' ? [value] : value,
          ])
        )
      : {}),
    ...(serverErrors?.error ? { unknown: [serverErrors.error] } : {}),
  }
  return allErrors
}

export function parseZodErrors<T>(validationError: ZodError<T>) {
  const errorsMap = new Map<string, string[]>()
  validationError.errors.forEach(({ path, message }) => {
    const key = path[0].toString()
    if (key && message) {
      const newMessages = new Set([...(errorsMap.get(key) ?? []), message])
      errorsMap.set(key, Array.from(newMessages))
    }
  })
  return { success: false, errors: Object.fromEntries(errorsMap.entries()) } as {
    success: boolean
    errors: Record<keyof T, string[]>
  }
}
