import { authOptions } from '@/app/lib/auth/firebase'
import ProfileDetailSegment from '@/components/section-segments/profile-detail-segment'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  // TODO: fetch from user microservice the whole information
  const session = await getServerSession(authOptions).catch(() => redirect('/403'))
  if (!session?.user?.name) return redirect('/403')
  return (
    <ProfileDetailSegment
      name={session.user.name}
      email={session.user.email!}
      avatar={session.user.image!}
    />
  )
}
