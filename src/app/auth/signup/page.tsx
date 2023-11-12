'use server'
import DefaultForm from '@/components/forms/DefaultForm'
import SignupForm from '@/components/forms/SignupForm'
import { signupAndSignIn } from '../../lib/actions/form/signup-signin'

export default async function Page() {
  return (
    <DefaultForm action={signupAndSignIn}>
      <SignupForm />
    </DefaultForm>
  )
}
