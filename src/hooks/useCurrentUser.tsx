'use client'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { User } from 'auth'
import { getMe } from '@/app/lib/actions/form/get-me'

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    const currentUser = Cookies.get('user')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
    setLoading(false)
  }, [])

  const refetchUser = async () => {
    setLoading(true)
    const userInfo = await getMe()
    const currentUser = Cookies.get('user')

    if (userInfo && currentUser) {
      const newUser = {
        ...JSON.parse(currentUser),
      }
      Cookies.set('user', JSON.stringify(newUser))
      setUser(newUser)
    }
    setLoading(false)
  }

  return { user, refetchUser, loading }
}
