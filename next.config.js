  
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
  },
  future: {
    webpack5: true
  },
  images: {
    domains: ['raw.githubusercontent.com', 'ftmscan.com'],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/swap',
      },
    ]
  },
})