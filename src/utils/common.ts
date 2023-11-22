import { TypedFormData, TypedFormDataValue } from '@/types/common'

export function getTypedFormData<T extends Record<string, TypedFormDataValue>>(
  form?: HTMLFormElement | null
): TypedFormData<T> {
  return new FormData(form || undefined) as unknown as TypedFormData<T>
}
