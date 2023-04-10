/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.dog.ceo', 'pic.cnblogs.com', 'i2.hdslb.com']
  }
}

module.exports = nextConfig
