declare module 'auth' {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: number
    user: User
    createdAt: Date
    deletedAt: Date
    isLoggedIn?: boolean
  }

  interface User {
    firstName?: string
    lastName?: string
    email?: string | null
    id?: string
  }
}

// declare module 'next-auth/jwt' {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT {
//     refreshTokenExpires?: number
//     accessTokenExpires?: number
//     refreshToken?: string
//     accessToken: string
//     exp?: number
//     iat?: number
//     jti?: string
//   }
// }
