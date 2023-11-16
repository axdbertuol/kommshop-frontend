'use server'
import DefaultForm from '@/components/forms/DefaultForm'
import LoginForm from '@/components/forms/LoginForm'
import { validateSignIn } from '../../lib/actions/form/signin'

export default async function Page() {
  return (
    <DefaultForm action={validateSignIn}>
      <LoginForm />
    </DefaultForm>
  )
}
