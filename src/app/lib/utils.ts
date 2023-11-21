import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { HTTP_CODES_ENUM } from '@/enum'
import { cookies } from 'next/headers'

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

export const isTokenExpired = (expiration: number): boolean => expiration <= Date.now()
