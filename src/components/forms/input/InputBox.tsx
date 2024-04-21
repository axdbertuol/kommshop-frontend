import { cn } from '@/app/lib/utils'
import { Input, InputProps } from '@/components/ui/input'
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react'
import WarningBox from '../../text/Error'
import { Tooltip } from 'react-tooltip'
import { useFormStatus } from 'react-dom'
import { ValidationError } from '@tanstack/react-form'

type Props = {
  horizontal?: boolean
  labelText?: string
  errors?: (string | ReactElement<unknown, string> | ValidationError)[]
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  InputProps

function InputBox({
  disabled = false,
  id,
  labelText,
  required,
  placeholder,
  errors,
  name,
  className,
  type,
  autoComplete,
  children,
  defaultValue,
  value,
  onChange,
  horizontal,
}: Props) {
  const hasErrors = useCallback(() => errors && errors.length > 0, [errors])
  const [showWarning, setShowWarning] = useState(false)
  const _id = useId()
  const timeout = 10000
  const { pending } = useFormStatus()

  useEffect(() => {
    if (hasErrors()) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), timeout)
    }
  }, [hasErrors])

  return (
    <>
      <div className={cn('flex flex-col', horizontal && 'flex-row gap-4')}>
        <div
          className={cn('block mb-1', horizontal && 'flex items-center w-[5rem] text-sm')}
        >
          <label
            htmlFor={id}
            className="font-extralight"
          >
            {labelText}
          </label>
        </div>
        <div className="flex relative">
          {children || (
            <Input
              key={id}
              id={id}
              data-testid="input-box"
              className={cn(
                'dark:border-secondary-black-400 transition-all focus-within:border-transparent placeholder:font-extralight ',
                className,
                showWarning && 'outline outline-yellow-300 '
              )}
              onInput={() => setShowWarning(false)}
              onChange={onChange}
              name={name}
              disabled={pending || disabled}
              aria-disabled={pending || disabled}
              placeholder={placeholder}
              required={required}
              type={type}
              autoComplete={autoComplete}
              value={value}
              defaultValue={defaultValue}
            />
          )}
          {showWarning && (
            <span
              data-tooltip-id={_id}
              className={cn('transition-all hidden', 'block absolute top-2 right-2')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-yellow-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </span>
          )}
        </div>
      </div>
      {showWarning && (
        <Tooltip
          id={_id}
          isOpen={showWarning}
          place="right"
        >
          {hasErrors() &&
            errors?.map((error, index) => (
              <WarningBox
                key={index}
                role="status"
              >
                <span
                  className={cn(
                    'text-left align-middle text-[0.66rem] font-extralight',
                    className
                  )}
                  data-testid={`error-message-${id ?? name ?? 'x'}-${index}`}
                >
                  {error}
                </span>
              </WarningBox>
            ))}
        </Tooltip>
      )}
    </>
  )
}

export default InputBox
