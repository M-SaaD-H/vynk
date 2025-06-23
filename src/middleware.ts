import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
export { default } from 'next-auth/middleware'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req: req });
  const url = req.nextUrl;
  const isAuthPage = url.pathname === '/login'

  if (isAuthPage && token) { // Logged in user should not be allowed on login page
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (url.pathname.startsWith('/orders') && !token) { // and non logged in users should not be allowed on orders page.
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/orders']
}
