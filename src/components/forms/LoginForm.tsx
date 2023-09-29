'use client'

import { signIn } from 'next-auth/react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function DefaultForm() {
  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <label htmlFor="email1">Email</label>
        </div>
        <Input
          id="email1"
          placeholder="name@flowbite.com"
          required
          type="text"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <label htmlFor="password1">Your password</label>
        </div>
        <Input
          id="password1"
          required
          type="password"
        />
      </div>
      <div className="flex items-center gap-2">
        {/* <Checkbox id="remember" /> */}
        {/* <Label htmlFor="remember">Remember me</Label> */}
      </div>
      <Button
        type="submit"
        onClick={() => signIn('keycloak', { callbackUrl: 'http://localhost:3000/store' })}
      >
        Submit
      </Button>
    </form>
  )
}
