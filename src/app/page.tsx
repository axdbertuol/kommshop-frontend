import { cookies } from 'next/headers'

export default async function Page() {
  const cookiesList = cookies()
  return <pre>{JSON.stringify(cookiesList.get('user'), null, 2)}</pre>
}
