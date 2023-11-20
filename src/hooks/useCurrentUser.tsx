'use client'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { User } from 'shared-kommshop-types'
import { getMe } from '@/app/lib/actions/form/get-me'
import { decryptSymmetric } from '@/app/lib/encryption'

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    const authCookie = Cookies.get(process.env.AUTH_COOKIE_KEY!)
    const iv = Cookies.get('iv')
    console.log('sdacds', authCookie, iv)
    if (!authCookie || !iv) {
      setLoading(false)
      return
    }
    const decrypt = async () => {
      const decodedToken = await decryptSymmetric(authCookie, iv)
      if (decodedToken) {
        setUser(JSON.parse(decodedToken))
      }
    }
    decrypt().then(() => {
      setLoading(false)
    })
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
