/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://primetrade-backend-h5n6.onrender.com/api',
  },
}

module.exports = nextConfig
