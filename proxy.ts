
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone()
  const hostname = req.headers.get('host') || ''

  // Define admin subdomains (Local vs Production)
  const isAdminDomain = 
    hostname.startsWith('admin.lvh.me') || 
    hostname.startsWith('admin.tatara-apparel.vercel.app')

  // If the user is on the admin subdomain...
  if (isAdminDomain) {
    // Avoid double-rewriting if the path already starts with /admin
    if (!url.pathname.startsWith('/admin')) {
      url.pathname = `/admin${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  // Exclude static assets, Next internal files, and API routes from rewriting
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}