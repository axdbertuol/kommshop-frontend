import { getMe } from '@/app/lib/actions/form/get-me'
import ProfileDetailSegment from '@/components/section-segments/profile-detail-segment'
import { redirect } from '@/navigation'

export default async function Page() {
  // TODO: fetch from user microservice the whole information
  const session = await getMe().catch(() => redirect('/403'))
  if (!session?.firstName || !session?.email) return redirect('/403')
  return (
    <ProfileDetailSegment
      firstName={session.firstName}
      lastName={session.lastName}
      email={session.email}
      photo={session?.photo}
    />
  )
}
