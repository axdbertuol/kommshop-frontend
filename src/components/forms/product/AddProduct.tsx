'use client'
import { StatusErrors, SignupFormValues, SigninFormValues, IntlMessages } from '@/types'
import { ReactElement } from 'react'
import InputBox from '../input/InputBox'
import { useFormState } from 'react-dom'
import { CreateProductDto } from 'kommshop-types'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/app/lib/utils'
import { Button } from '../../ui/button'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   children: ReactElement<any, string>
  initialValues: StatusErrors & CreateProductDto
  //   translatedErrors: Record<string, string | ReactElement<unknown, string>>
  //   intl: Partial<IntlMessages['Auth']['signup'] & IntlMessages['Auth']['signin']>
} & React.HTMLAttributes<HTMLElement>
export default function AddProduct({ initialValues }: Props) {
  return (
    <form className="flex flex-col w-[50%] m-auto gap-2">
      <div className="flex flex-col gap-3">
        <span>Image upload</span>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          // onChange={handleImageChange}
        />
      </div>
      <InputBox
        autoComplete="name"
        id="name"
        name="name"
        // disabled={pending}
        // aria-disabled={pending}
        placeholder="John"
        // required={required}
        type="text"
        labelText={'Name'}
        // errors={memoizedIntlErrors?.['firstName']}
      />
      <InputBox
        // disabled={pending}
        // aria-disabled={pending}
        // required={required}
        labelText={'Description'}
        // errors={memoizedIntlErrors?.['firstName']}
      >
        <Textarea
          id="description"
          name="description"
          autoComplete="description"
          placeholder="John"
          className={cn(
            'dark:border-secondary-black-400 transition-all focus-within:border-transparent placeholder:font-extralight'
          )}
        />
      </InputBox>
      <InputBox
        autoComplete="price"
        id="price"
        name="price"
        // disabled={pending}
        // aria-disabled={pending}
        placeholder="John"
        // required={required}
        type="number"
        labelText={'Price'}
        // errors={memoizedIntlErrors?.['firstName']}
      />
      <Button
        type="submit"
        // aria-disabled={pending}
        // disabled={pending}
        className="w-[50%] mt-6 self-center"
      >
        Submit
      </Button>
    </form>
  )
}
