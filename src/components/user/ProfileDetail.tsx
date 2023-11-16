import React from 'react'
import Image from 'next/image'
import { CreateUserDto, User } from 'shared-kommshop-types'

type ProfileDetailProps = CreateUserDto & {
  followers?: number
  following?: number
}

function ProfileDetail({
  firstName,
  lastName,
  email,
  followers,
  following,
  photo,
}: ProfileDetailProps) {
  return (
    <div className="flex flex-col md:m-0 md:items-center justify-start bg-background h-screen md:h-[calc(100vh-72px)] w-full">
      <div className="bg-card rounded-lg p-4 shadow-lg md:w-8/12 lg:w-9/12">
        <div className="flex">
          <Image
            src={photo?.path ?? '#'}
            alt={firstName ?? 'pic'}
            width={300}
            height={300}
            className="w-full h-48 lg:rounded-tr-none border-primary lg:w-2/12 object-cover rounded-t-lg"
          />
          <div className="hidden lg:flex lg:w-full lg:border-r-2 lg:rounded-tr-lg border-primary ">
            banner
          </div>
        </div>
        <div className="p-4 h-full bg-secondary border-b-2 border-r-2 border-primary rounded-b-lg lg:w-full">
          <h1 className="text-2xl font-bold text-primary mb-2">
            {firstName + ' ' + lastName}
          </h1>
          <p className="text-primary-light">{email}</p>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-destructive-foreground font-bold">{followers ?? 0}</p>
              <p className="text-primary-light">Followers</p>
            </div>
            <div>
              <p className="text-destructive-foreground font-bold">{following ?? 0}</p>
              <p className="text-primary-light">Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetail
