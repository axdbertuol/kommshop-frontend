'use client'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { cacheSignInCred } from '@/app/lib/actions/form/signin'
import { AuthProvidersEnum } from 'kommshop-types/src/auth/enum'

export default function LoginForm() {
  const { pending, data } = useFormStatus()
  const [provider, setProvider] = useState(AuthProvidersEnum.credentials)

  useEffect(() => {
    // TODO: check provider
    if (data?.get('success') == 'true' && data.get('email') && data.get('password')) {
      cacheSignInCred({
        email: data.get('email')!.toString(),
        password: data.get('password')!.toString(),
      })
    }
  }, [data])
  return (
    <>
      <div>
        <div className="mb-2 block">
          <label htmlFor="email">Email</label>
        </div>
        <Input
          id="email"
          name="email"
          placeholder="name@flowbite.com"
          required
          type="text"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <label htmlFor="password">Your password</label>
        </div>
        <Input
          id="password"
          name="password"
          required
          type="password"
        />
      </div>
      <div className="flex items-center gap-2">
        {/* <Checkbox id="remember" /> */}
        {/* <Label htmlFor="remember">Remember me</Label> */}
      </div>
      <input
        type="hidden"
        id="provider"
        name="provider"
        value={provider}
      />
      <Button
        type="submit"
        variant={'default'}
        aria-disabled={pending}
        disabled={pending}
        className="w-[50%] self-center"
      >
        Submit
      </Button>
      <span className="text-center">
        Do not have an account yet?{' '}
        <Link
          href={'/signup'}
          className="underline"
        >
          Sign up!
        </Link>
      </span>
    </>
  )
}
