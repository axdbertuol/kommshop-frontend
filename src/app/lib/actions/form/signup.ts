'use server'

import { CausedServerErrorResponse } from '@/types'
import { getApiPath } from '../../config'
import { TCredSignupSchema } from './schemas'
import { parseServerErrors } from '../../utils'

export const signupCred = async (credentials: Omit<TCredSignupSchema, 'provider'>) => {
  // const url = new URL(`http://localhost:3334/users/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const newCredentials = {
    firstName: credentials.firstName,
    lastName: credentials.lastName,
    email: credentials.email,
    password: credentials.password,
  }
  try {
    const url = getApiPath('signup')
    const myRequest = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newCredentials),
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    console.log('x', myRequest.status)
    if (!myRequest.ok || myRequest.status < 200 || myRequest.status > 399) {
      const json: CausedServerErrorResponse = await myRequest.json()
      console.log('signupcred', myRequest, json)
      return {
        serverErrors: parseServerErrors(json.cause),
        success: false,
      }
    }

    return { success: myRequest.ok }
  } catch (err) {
    console.error(err, 'errro!')
  }
  return { success: false }
}
