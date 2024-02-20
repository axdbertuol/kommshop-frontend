import React from 'react'
import ProfileDetail from '../user/ProfileDetail'
import { CreateUserDto, User } from 'shared-kommshop-types'

type Props = CreateUserDto

async function ProfileDetailSegment(props: Props) {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <ProfileDetail {...props} />
    </div>
  )
}

export default ProfileDetailSegment
