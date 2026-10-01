/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
    instrumentationHook: true,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
      'cdninstagram.com',
      'scontent.cdninstagram.com',
      'scontent-nbo1-1.cdninstagram.com',
      'video.cdninstagram.com',
    ],
  },
  async headers() {
    return [
      {
        // Exclude /api/auth/* — CORS on NextAuth routes breaks CSRF cookie validation
        source: '/api/((?!auth/).*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
