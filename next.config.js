/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.zst.com.br',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
