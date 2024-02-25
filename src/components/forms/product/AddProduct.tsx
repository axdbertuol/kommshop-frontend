'use client'
import { handleProductSubmission } from '@/app/lib/auth/utils'
import { cn } from '@/app/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { CreateProductResponse, Suggestion } from '@/types'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import InputBox from '../input/InputBox'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter } from '@/navigation'
import Image from 'next/image'
import { Button } from '../../ui/button'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   children: ReactElement<any, string>
  initialValues: CreateProductResponse
  categories: Suggestion<'category'>[] | null
  //   translatedErrors: Record<string, string | ReactElement<unknown, string>>
  //   intl: Partial<IntlMessages['Auth']['signup'] & IntlMessages['Auth']['signin']>
} & React.HTMLAttributes<HTMLElement>

export default function AddProduct({ initialValues, categories }: Props) {
  const [state, formAction] = useFormState<CreateProductResponse, FormData>(
    handleProductSubmission,
    initialValues
  )
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const router = useRouter()
  const { pending } = useFormStatus()
  const formRef = useRef<HTMLFormElement>(null)
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0] ?? null

    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage)
      setPreviewUrl(imageUrl)
    }
  }
  useEffect(() => {
    if (state?.success) {
      // TODO: show success message
      router.push('/dashboard')
    }
  }, [router, state])
  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col w-[50%] m-auto gap-2"
    >
      <div className="flex flex-col gap-3">
        {previewUrl && (
          <picture>
            <Image
              src={previewUrl}
              alt="Preview"
              width={75}
              height={75}
              style={{ maxWidth: '75px', maxHeight: '75px' }}
            />
          </picture>
        )}

        <span>Image upload</span>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <InputBox
        autoComplete="name"
        id="name"
        name="name"
        required={true}
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
        // disabled={pending}
        labelText={'Description'}
        // errors={memoizedIntlErrors?.['firstName']}
      >
        <Textarea
          id="description"
          disabled={pending}
          name="description"
          autoComplete="description"
          // placeholder=""
          className={cn(
            'dark:border-secondary-black-400 transition-all focus-within:border-transparent placeholder:font-extralight'
          )}
        />
      </InputBox>
      <Select required={true}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories?.map((category, index) => (
            <SelectItem
              key={index}
              value={category.value}
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <InputBox
        autoComplete="price"
        id="price"
        name="price"
        required={true}
        // disabled={pending}
        // aria-disabled={pending}
        placeholder="22.0"
        // required={required}
        type="number"
        labelText={'Price'}
        // errors={memoizedIntlErrors?.['firstName']}
      />
      <Button
        type="submit"
        aria-disabled={pending}
        disabled={pending}
        className="w-[50%] mt-6 self-center"
      >
        Submit
      </Button>
    </form>
  )
}
