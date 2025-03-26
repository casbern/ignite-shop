/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  
    domains: [
      'files.stripe.com'
    ]
  
}

module.exports = nextConfig
