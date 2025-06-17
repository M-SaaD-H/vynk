import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
export { default } from 'next-auth/middleware'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req: req })
  const isAuthPage = req.nextUrl.pathname === '/login'

  // Logged in user should not be allowed on login page
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login']
}
