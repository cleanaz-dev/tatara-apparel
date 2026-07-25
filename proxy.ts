import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Notice the function is now called `proxy` instead of `middleware`
export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone()
  
  // Get the hostname from the request (e.g., admin.lvh.me:3000)
  const hostname = req.headers.get('host') || ''

  // Define what counts as your admin domain (Local vs Production)
  const isAdminDomain = 
    hostname.startsWith('admin.lvh.me') ||       // Local testing
    hostname.startsWith('admin.tatarablades.com') // Production (change to your real domain)

  // If the user is on the admin subdomain...
  if (isAdminDomain) {
    // Proxy (Rewrite) the URL to your hidden admin folder
    url.pathname = `/admin-app${url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

// Keep it fast: ignore static files, images, and standard API routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}