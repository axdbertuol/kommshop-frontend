'use client'
import { cn } from '@/app/lib/utils'
import InputBox from '@/components/forms/input/InputBox'
import { Button } from '@/components/ui/button'
import {
  IntlMessages,
  ResetPassResponse,
  StatusErrors,
  StatusUnsuccessful,
} from '@/types'
import { useRouter } from '@/navigation'
import { ReactElement, useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { handleResetPasswordSubmit } from '@/app/lib/actions/form/submit-reset-password'
import useMemoizedIntlErrors from '@/hooks/useMemoIntlErrors'

type Props = {
  translatedErrors: Record<string, string | ReactElement<unknown, string>>
  intl: IntlMessages['Auth']['reset']
  resetToken: string
} & React.HTMLAttributes<HTMLElement>

export default function ResetPassForm({
  resetToken,
  intl,
  translatedErrors,
  className,
}: Props) {
  const [state, formAction] = useFormState<ResetPassResponse, FormData>(
    handleResetPasswordSubmit,
    { password: '', password2: '', token: resetToken, success: false }
  )
  const router = useRouter()
  const { pending } = useFormStatus()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true)
      setTimeout(() => {
        router.push('/signin')
      }, 5000)
    }
  }, [state, router])

  const memoizedIntlServerErrors = useMemoizedIntlErrors<
    StatusUnsuccessful['serverErrors']
  >((state as StatusErrors)?.serverErrors, translatedErrors)

  const memoizedIntlErrors = useMemoizedIntlErrors<StatusUnsuccessful['errors']>(
    (state as StatusErrors)?.errors,
    translatedErrors
  )
  return (
    <form
      action={formAction}
      className={cn(className, 'transition-all', pending ? 'opacity-30' : ' opacity-1')}
    >
      {showSuccess ? (
        <div>{intl.success}</div>
      ) : (
        <>
          <h2 className="font-thin text-lg text-center">{intl.heading}</h2>
          <input
            type="hidden"
            id="token"
            name="token"
            value={resetToken}
          />
          <InputBox
            id="password"
            name="password"
            autoComplete="new-password"
            disabled={pending}
            aria-disabled={pending}
            required={true}
            type="password"
            labelText={intl.password}
            errors={memoizedIntlErrors?.['password']}
          />
          <InputBox
            id="password2"
            name="password2"
            autoComplete="confirm-password"
            disabled={pending}
            aria-disabled={pending}
            required={true}
            type="password"
            labelText={intl.password2}
            errors={memoizedIntlErrors?.['password2']}
          />
          <Button
            type="submit"
            aria-disabled={pending}
            disabled={pending}
            className="w-[50%] mt-6 self-center"
          >
            {intl.submit}
          </Button>
        </>
      )}
    </form>
  )
}
