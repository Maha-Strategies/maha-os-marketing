import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const acceptHeader = request.headers.get('accept') || '';
  
  // If the agent explicitly requests markdown, rewrite the response to your llms.txt file
  if (acceptHeader.includes('text/markdown')) {
    return NextResponse.rewrite(new URL('/llms.txt', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/', // Only intercept the homepage for this logic
};