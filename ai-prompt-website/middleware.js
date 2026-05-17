import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return new NextResponse('Authentication Required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Panel"',
        },
      });
    }
    
    try {
      const base64 = authHeader.split(' ')[1];
      const decoded = atob(base64);
      const [username, password] = decoded.split(':');
      
      const validUser = process.env.ADMIN_USERNAME || 'admin';
      const validPass = process.env.ADMIN_PASSWORD || 'admin123';
      
      if (username !== validUser || password !== validPass) {
        return new NextResponse('Invalid Credentials', { status: 403 });
      }
    } catch {
      return new NextResponse('Invalid Auth Format', { status: 400 });
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};