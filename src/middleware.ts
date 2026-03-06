import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const publicRoutes = ['/login']

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const { pathname } = req.nextUrl
  const isAuthenticated = !!token

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  )

  const isLoginRoute = pathname.startsWith('/login')

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isAuthenticated && isLoginRoute) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
      runs the middleware for each front-end route but:
      - nextauth auth api
      - static files
      - images
      - favicon
    */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
