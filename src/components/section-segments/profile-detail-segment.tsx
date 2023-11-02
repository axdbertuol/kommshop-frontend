import React from 'react'
import ProfileDetail from '../user/ProfileDetail'

type Props = {
  name: string
  avatar: string
  email: string
}

async function ProfileDetailSegment(props: Props) {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <ProfileDetail {...props} />
    </div>
  )
}

export default ProfileDetailSegment
