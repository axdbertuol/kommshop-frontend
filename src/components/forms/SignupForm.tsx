'use client'
import { Input } from '../ui/input'
import React, { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import Link from 'next/link'
import { AuthProvidersEnum } from '@/enum'
import { useRouter } from 'next/router'
import { FormValues } from './DefaultForm'

export default function SignupForm({
  success,
  errors,
}: {
  success?: boolean
  errors?: Record<string, string>
}) {
  const { pending, data } = useFormStatus()
  const [provider, setProvider] = useState(AuthProvidersEnum.credentials)
  console.log(data, success, errors)
  if (success) {
    return <>Check your email!</>
  }
  return (
    <>
      <div>
        <div className="mb-2 block">
          <label htmlFor="email">Email</label>
        </div>
        <Input
          id="email"
          name="email"
          disabled={pending}
          aria-disabled={pending}
          placeholder="name@flowbite.com"
          required
          type="text"
        />
        {errors?.['email'] && (
          <>
            <span>{errors['email']}</span>
          </>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <label htmlFor="password">Your password</label>
        </div>
        <Input
          id="password"
          name="password"
          aria-disabled={pending}
          disabled={pending}
          required
          type="password"
        />
        {errors?.['password'] && (
          <>
            <span>{errors['password']}</span>
          </>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <label htmlFor="password2">Confirm password</label>
        </div>
        <Input
          id="password2"
          name="password2"
          aria-disabled={pending}
          disabled={pending}
          required
          type="password"
        />
        {errors?.['password2'] && (
          <>
            <span>{errors['password2']}</span>
          </>
        )}
      </div>
      <input
        type="hidden"
        id="provider"
        name="provider"
        value={provider}
      />
      <div className="flex items-center gap-2">
        {/* <Checkbox id="remember" /> */}
        {/* <Label htmlFor="remember">Remember me</Label> */}
      </div>
      <Button
        type="submit"
        aria-disabled={pending}
        disabled={pending}
        className="w-[50%] self-center"
      >
        Signup
      </Button>
      <span className="text-center">
        Already have an account?{' '}
        <Link
          href="/signin"
          className="underline"
        >
          Sign in!
        </Link>
      </span>
    </>
  )
}
