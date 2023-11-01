import { withAuth } from 'next-auth/middleware'
import { NextRequest } from 'next/server'

export default withAuth(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function middleware(req: NextRequest) {
    console.log('cheguei', req)
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
export const config = { matcher: ['/dashboard'] }
