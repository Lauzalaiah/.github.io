import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip password check for these routes
  if (
    pathname === '/site-password' ||
    pathname.startsWith('/api/site-password') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images')
  ) {
    return NextResponse.next()
  }

  // Check if site password protection is enabled
  const sitePasswordEnabled = process.env.SITE_PASSWORD_ENABLED === 'true'
  
  if (sitePasswordEnabled) {
    const siteAccess = request.cookies.get('site-access')?.value
    
    if (siteAccess !== 'granted') {
      return NextResponse.redirect(new URL('/site-password', request.url))
    }
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
