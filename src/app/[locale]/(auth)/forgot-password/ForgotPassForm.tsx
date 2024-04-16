'use client'
import { handleForgotPasswordSubmit } from '@/app/lib/actions/form/submit-forgot-password'
import { cn } from '@/app/lib/utils'
import InputBox from '@/components/forms/input/InputBox'
import { Button } from '@/components/ui/button'
import {
  ForgotPassResponse,
  IntlMessages,
  StatusErrors,
  StatusUnsuccessful,
} from '@/types'
import { useRouter } from '@/navigation'
import { ReactElement, useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import useMemoizedIntlErrors from '@/hooks/useMemoIntlErrors'

type Props = {
  translatedErrors: Record<string, string | ReactElement<unknown, string>>
  intl: IntlMessages['Auth']['forgot']
} & React.HTMLAttributes<HTMLElement>

export default function ForgotPassForm({ translatedErrors, intl, className }: Props) {
  const [state, formAction] = useFormState<ForgotPassResponse, FormData>(
    handleForgotPasswordSubmit,
    { email: '', success: false }
  )
  const router = useRouter()
  const { pending } = useFormStatus()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true)
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
        <div>Confira seu email</div>
      ) : (
        <>
          <h2 className="font-thin text-lg text-center">{intl.heading}</h2>
          <InputBox
            autoComplete="email"
            id="email"
            name="email"
            disabled={pending}
            aria-disabled={pending}
            placeholder="name@example.com"
            required={true}
            type="text"
            labelText={intl.email}
            errors={memoizedIntlErrors?.['email']}
          />
          <Button
            type="submit"
            aria-disabled={pending}
            disabled={pending}
            className="mt-6 self-center"
          >
            {intl.submit}
          </Button>
        </>
      )}
    </form>
  )
}
