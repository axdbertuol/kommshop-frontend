import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextRequest } from 'next/server'

export default withAuth(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function middleware(req: NextRequest) {
    const requestHeaders = new Headers(req.headers)
    try {
      console.log('middleware1', requestHeaders)
      const token = await getToken({ req })
      console.log('middleware2', token)
      if (token) {
        requestHeaders.set('Authorization', 'Bearer ' + token)
      }
    } catch (err) {
      console.error('getToken middleware error: ', err)
    }
  },
  {
    // jwt: {decode: authOptions.jwt?.decode},

    callbacks: {
      authorized: (obj) => {
        console.log('qeee', obj)
        return true
      },
    },
  }
)
export const config = { matcher: ['/dashboard/:path'] }
