import { redirect } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { revalidateTag } from 'next/cache'

type Props = {
  params: { locale: string }
}
export default async function LocalePage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)
  // revalidatePath('/pt/store', 'layout')
  revalidateTag('get-products')
  redirect('/store')
}
