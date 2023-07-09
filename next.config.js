/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    SECRET: process.env.SECRET,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
  }
}

module.exports = nextConfig
