'use server'
import { redirect } from '@/navigation'
import { revalidatePath, revalidateTag } from 'next/cache'

export default async function Page() {
  revalidatePath('/')
  revalidateTag('my-app-user')
  return redirect('/signin')
}
