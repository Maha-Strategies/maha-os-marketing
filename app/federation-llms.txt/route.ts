import { federationLlmsText } from '@/lib/federation-adapter'
export function GET() { return new Response(federationLlmsText(), { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=0, s-maxage=3600' } }) }
