// middleware.js
import { NextResponse } from 'next/server';
/**
 * Middleware kiểm tra quyền cho route employee-dashboard
 */
export function middleware(req) {
  const token = req.cookies.get('accessToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/access-denied', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/employers-dashboard/:path*',
    '/candidates-dashboard/:path*'
  ],
};
