'use server'
import DefaultForm from '@/components/forms/DefaultForm'
import LoginForm from '@/components/forms/LoginForm'
import { validateSignIn } from '@/app/lib/actions/form/signin'

export default async function Page() {
  return (
    <DefaultForm
      action={validateSignIn}
      className={'w-full md:flex md:place-content-center'}
    >
      <LoginForm className="pt-12 px-16 md:px-0 w-full md:w-[33vw] lg:w-[20vw] flex flex-col flex-auto gap-4" />
    </DefaultForm>
  )
}
