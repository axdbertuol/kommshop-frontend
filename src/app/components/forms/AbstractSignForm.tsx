'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { AuthProvidersEnum } from '@/enum'
import { cn } from '@/app/lib/utils'
import { IntlMessages, StatusErrors } from '@/types/common'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useRouter } from '@/navigation'
import InputBox from './input/InputBox'

export default function AbstractSignForm({
  success,
  errors,
  intl,
  className,
  children,
  locale,
  formName,
}: {
  success?: boolean
  errors?: StatusErrors['errors']
  intl: Partial<IntlMessages['Auth']['signup'] & IntlMessages['Auth']['signin']>
  locale?: string
  formName: string
} & React.HTMLAttributes<HTMLElement>) {
  const { pending } = useFormStatus()
  const router = useRouter()
  const [provider, setProvider] = useState(AuthProvidersEnum.credentials)
  const required = provider === AuthProvidersEnum.credentials
  const [idToken, setIdToken] = useState<string>()
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleGoogleAuthSuccess = async (credentials: CredentialResponse) => {
    if (!credentials?.credential) return
    setProvider(AuthProvidersEnum.google)
    setIdToken(credentials.credential)
  }

  useEffect(() => {
    if (idToken) {
      buttonRef.current?.click()
    }
  }, [buttonRef, idToken])

  if (success) {
    if (provider === AuthProvidersEnum.credentials) {
      return <>{intl.success}</>
    }
    router.push('/')
  }
  console.log('errors', errors)

  return (
    <div className={cn(className)}>
      <InputBox
        id="email"
        name="email"
        disabled={pending}
        aria-disabled={pending}
        placeholder="name@example.com"
        required={required}
        type="text"
        labelText={intl.email}
        errors={errors?.['email']}
      />
      <InputBox
        id="password"
        name="password"
        disabled={pending}
        aria-disabled={pending}
        required={required}
        type="password"
        labelText={intl.password}
        errors={errors?.['password']}
      />
      {intl?.password2 && (
        <InputBox
          id="password2"
          name="password2"
          disabled={pending}
          aria-disabled={pending}
          required={required}
          type="password"
          labelText={intl.password2}
          errors={errors?.['password2']}
        />
      )}
      <input
        type="hidden"
        id="provider"
        name="provider"
        value={provider}
      />
      <input
        type="hidden"
        id="formName"
        name="formName"
        value={formName}
      />
      <input
        type="hidden"
        id="idToken"
        name="idToken"
        value={idToken}
      />
      <Button
        ref={buttonRef}
        type="submit"
        aria-disabled={pending}
        disabled={pending}
        className="w-[50%] self-center"
      >
        {intl.submit}
      </Button>
      <div className="flex place-content-center gap-2">
        <GoogleLogin
          onSuccess={handleGoogleAuthSuccess}
          locale={locale}
        />
      </div>
      {children}
    </div>
  )
}
