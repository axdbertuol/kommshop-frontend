'use server'

import { ErrorResponse } from '@/types/common'
import { getApiPath } from '../../config'

export const signupCred = async (credentials: { email: string; password: string }) => {
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
    const success = myRequest.status === 201 || myRequest.status === 204
    if (!success) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { status, ...rest }: ErrorResponse = await myRequest.json()
      return { success, ...rest }
    }

    return { success }
  } catch (err) {
    console.error(err, 'errro!')
    return { success: false }
  }
}
