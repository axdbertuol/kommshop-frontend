/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextIntl = require('next-intl/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // transpilePackages: ['kommshop-types'],
  env: {
    authUrl: process.env.NEXT_URL_AUTH,
    signupUrl: new URL(
      process.env.SIGNUP_CREDENTIAL_ENDPOINT,
      process.env.NEXT_URL_AUTH
    ).toString(),
    signinUrl: new URL(
      process.env.SIGNIN_CREDENTIAL_ENDPOINT,
      process.env.NEXT_URL_AUTH
    ).toString(),
    confirmEmailUrl: new URL(
      process.env.CONFIRM_EMAIL_ENDPOINT,
      process.env.NEXT_URL_AUTH
    ).toString(),
    getMeUrl: new URL(process.env.GET_ME_ENDPOINT, process.env.NEXT_URL_AUTH).toString(),
    refreshTokenUrl: new URL(
      process.env.REFRESH_TOKEN_ENDPOINT,
      process.env.NEXT_URL_AUTH
    ).toString(),
    signoutUrl: new URL(
      process.env.SIGNOUT_ENDPOINT,
      process.env.NEXT_URL_AUTH
    ).toString(),
    googleAuthUrl: new URL(
      process.env.SIGNIN_GOOGLE_ENDPOINT,
      process.env.NEXT_URL_AUTH
    ).toString(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = withNextIntl(nextConfig)
