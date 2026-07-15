import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const host = (request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? '')
    .split(':')[0];

  // Keep every indexable route on one host. The sitemap and canonical tags use
  // www, so requests to the bare domain should make the same choice.
  if (host === 'maha-os.com') {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = 'www.maha-os.com';
    return NextResponse.redirect(url, 308);
  }

  const acceptHeader = request.headers.get('accept') || '';

  // If the agent explicitly requests markdown, rewrite the response to your llms.txt file
  if (request.nextUrl.pathname === '/' && acceptHeader.includes('text/markdown')) {
    return NextResponse.rewrite(new URL('/llms.txt', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
