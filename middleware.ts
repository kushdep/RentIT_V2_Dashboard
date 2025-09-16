import { NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/login')) {
    const token = request.cookies.get('sessionToken'); 
    const nxtAuthToken = request.cookies.get('next-auth.session-token'); 
    if (token || nxtAuthToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('sessionToken'); 
    const nxtAuthToken = request.cookies.get('next-auth.session-token'); 
    if (!token && !nxtAuthToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}


export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
