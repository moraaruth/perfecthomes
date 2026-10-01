import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Never apply CORS to NextAuth routes — it breaks CSRF cookie validation
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
