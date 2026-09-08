import { federationMetadata, federationParams, renderFederationPage } from '@/lib/federation-adapter'
type Props = { params: Promise<{ topic: string; role: string }> }
const pattern = /^\/knowledge\/private-machine-systems\/([^/]+)\/([^/]+)$/
export const dynamicParams = false
export const generateStaticParams = () => federationParams(pattern, ['topic', 'role'])
export async function generateMetadata({ params }: Props) { const p = await params; return federationMetadata(`/knowledge/private-machine-systems/${p.topic}/${p.role}`) }
export default async function Page({ params }: Props) { const p = await params; return renderFederationPage(`/knowledge/private-machine-systems/${p.topic}/${p.role}`) }
