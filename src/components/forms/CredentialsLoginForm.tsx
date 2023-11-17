'use client'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { AuthProvidersEnum } from '@/enum'
import { FormValues } from './DefaultForm'
import { useRouter } from '@/navigation'
import { cn } from '@/app/lib/utils'
import { IntlMessages } from '@/types/common'

export default function CredentialsLoginForm({
  formState,
  className,
  intl,
}: {
  formState?: FormValues
  intl: IntlMessages['Auth']['signin']
} & React.HTMLAttributes<HTMLElement>) {
  const router = useRouter()
  const { pending, data } = useFormStatus()
  const [provider, setProvider] = useState(AuthProvidersEnum.credentials)
  if (formState?.success) {
    router.push('/dashboard')
  }
  return (
    <div className={cn(className)}>
      <div>
        <div className="mb-2 block">
          <label htmlFor="email">{intl.email}</label>
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
          <label htmlFor="password">{intl.password}</label>
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
        {intl.submit}
      </Button>
      <span className="text-center">
        {intl.notyet}{' '}
        <Link
          href={'/signup'}
          className="underline"
        >
          {intl.signup}
        </Link>
      </span>
    </div>
  )
}
