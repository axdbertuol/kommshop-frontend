'use server'

import { ServerErrorResponse } from '@/types/common'
import { getApiPath } from '../../config'
import { TCredSignupSchema } from './schemas'
import { parseServerErrors } from '../../utils'

export const signupCred = async (credentials: Omit<TCredSignupSchema, 'provider'>) => {
  // const url = new URL(`http://localhost:3334/users/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const newCredentials = {
    email: credentials.email,
    password: credentials.password,
    firstName: 'asd',
    lastName: 'asd',
  }
  try {
    const url = getApiPath('signup')
    const myRequest = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newCredentials),
      headers: { 'Content-Type': 'application/json' },
      // cache: 'no-store',
    })
    console.log(myRequest.status)
    if (!myRequest.ok) {
      const json: ServerErrorResponse = await myRequest.json()

      return {
        serverErrors: parseServerErrors(json),
        success: false,
      }
    }

    return { success: myRequest.ok }
  } catch (err) {
    console.error(err, 'errro!')
    return { success: false }
  }
}
