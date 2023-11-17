'use client'
import { Input } from '../ui/input'
import React, { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import Link from 'next/link'
import { AuthProvidersEnum } from '@/enum'
import { cn } from '@/app/lib/utils'
import { IntlMessages } from '@/types/common'

export default function SignupForm({
  success,
  errors,
  text,
  className,
}: {
  success?: boolean
  errors?: Record<string, string>
  text: IntlMessages['Auth']['signup']
} & React.HTMLAttributes<HTMLElement>) {
  const { pending, data } = useFormStatus()
  const [provider, setProvider] = useState(AuthProvidersEnum.credentials)
  console.log(data, success, errors)
  if (success) {
    return <>{text.success}</>
  }
  return (
    <div className={cn(className)}>
      <div>
        <div className="mb-2 block">
          <label htmlFor="email">{text.email}</label>
        </div>
        <Input
          id="email"
          name="email"
          disabled={pending}
          aria-disabled={pending}
          placeholder="name@example.com"
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
          <label htmlFor="password">{text.password}</label>
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
          <label htmlFor="password2">{text.password2}</label>
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
        {text.submit}
      </Button>
      <span className="text-center">
        {text.already}{' '}
        <Link
          href="/signin"
          className="underline"
        >
          {text.signin}
        </Link>
      </span>
    </div>
  )
}
