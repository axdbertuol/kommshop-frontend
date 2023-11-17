'use server'

import { ErrorResponse } from '@/types/common'

export const signupCred = async (credentials: { email: string; password: string }) => {
  // const url = new URL(`http://localhost:3334/users/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const signupUrl = process.env.SIGNUP_CREDENTIAL_ENDPOINT!

  const newCredentials = {
    email: credentials.email,
    password: credentials.password,
    firstName: 'asd',
    lastName: 'asd',
  }
  try {
    const myRequest = await fetch(signupUrl, {
      method: 'POST',
      body: JSON.stringify(newCredentials),
      headers: { 'Content-Type': 'application/json' },
      // cache: 'no-store',
    })
    console.log(myRequest.status)
    const success = myRequest.status === 201 || myRequest.status === 204
    if (!success) {
      const { status, ...rest }: ErrorResponse = await myRequest.json()
      return { success, ...rest }
    }

    return { success }
  } catch (err) {
    console.error(err, 'errro!')
  }
}
