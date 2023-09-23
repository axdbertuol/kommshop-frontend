import { withAuth } from 'next-auth/middleware'
import { authOptions } from './app/lib/auth'
import { NextRequest } from 'next/server'

export default withAuth(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function middleware(req: NextRequest) {
    console.log('cheguei', req)
  },
  {
    // jwt: {decode: authOptions.jwt?.decode},

    callbacks: {
      authorized: ({ token }) => {
        console.log('token', token)
        return !!token
      },
    },
  }
)
export const config = { matcher: ['/dashboard'] }
