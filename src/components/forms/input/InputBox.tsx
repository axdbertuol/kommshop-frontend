import { cn } from '@/app/lib/utils'
import { Input, InputProps } from '@/components/ui/input'
import React from 'react'

type Props = {
  labelText?: string
  errors?: string[] | string
} & React.HTMLAttributes<HTMLInputElement> &
  InputProps

function InputBox({
  disabled,
  id,
  labelText,
  required,
  placeholder,
  errors,
  name,
  className,
  type,
}: Props) {
  if (typeof errors === 'string') {
    errors = [errors]
  }
  const hasErrors = errors && errors.length > 0
  return (
    <div>
      <div className="mb-2 block">
        <label htmlFor={id}>{labelText}</label>
      </div>
      <Input
        id={id}
        className={cn(className)}
        name={name}
        disabled={disabled}
        aria-disabled={disabled}
        placeholder={placeholder}
        required={required}
        type={type}
      />
      {hasErrors &&
        errors?.map((error, index) => (
          <div
            key={index}
            className="flex items-center gap-2 mt-2 transition-all before:opacity-0 opacity-1 ease-in-out text-yellow-500 text-center "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <span className="text-center align-middle text-xs  font-extralight">
              {error}
            </span>
          </div>
        ))}
    </div>
  )
}

export default InputBox
