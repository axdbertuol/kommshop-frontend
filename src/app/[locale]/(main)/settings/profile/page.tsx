import { getEncryptedAuthCookie, getAuthTokens } from '@/app/lib/get-cookies-list'
import ProfileDetailSegment from '@/components/section-segments/profile-detail-segment'
import { redirect } from '@/navigation'
import { Suspense } from 'react'

export default async function Page() {
  // TODO: fetch from user microservice the whole information
  const encryptedAuthCookie = await getEncryptedAuthCookie()
  let user = null
  if (encryptedAuthCookie) {
    const authTokens = await getAuthTokens(encryptedAuthCookie)
    user = authTokens.user
  }
  if (!user) {
    // redirect('/signin')
    return
  }
  return (
    <Suspense fallback={<>...Loading</>}>
      <ProfileDetailSegment
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        // photo={user?.photo}
      />
    </Suspense>
  )
}
