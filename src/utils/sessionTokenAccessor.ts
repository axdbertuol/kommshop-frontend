import { Session, getServerSession } from 'next-auth'
import { authOptions } from '../app/lib/auth/firebase'
import { decrypt } from './encryption'

export async function getAccessToken() {
  const session = (await getServerSession(authOptions)) as Session & {
    access_token: string
    id_token: string
  }
  if (session) {
    const accessTokenDecrypted = decrypt(session.access_token)
    return accessTokenDecrypted
  }
  return null
}

export async function getIdToken() {
  const session = (await getServerSession(authOptions)) as Session & {
    access_token: string
    id_token: string
  }
  if (session) {
    const idTokenDecrypted = decrypt(session.id_token)
    return idTokenDecrypted
  }
  return null
}
