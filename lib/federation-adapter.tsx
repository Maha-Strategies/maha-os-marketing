import { createHash } from 'node:crypto'
import type { Metadata, MetadataRoute } from 'next'
import { notFound } from 'next/navigation'
import FederationReleasedPage from '@/components/federation/FederationReleasedPage'
import bundleJson from '@/content/federation/maha-os-v1.json'

type JsonObject = Record<string, unknown>
export type FederationPage = {
  candidateId: string
  siteId: string
  canonicalHost: string
  path: string
  canonicalUrl: string
  title: string
  directAnswer: string
  sections: Array<{ heading: string; kind: string; paragraphs: string[] }>
  sources: Array<{ sourceId: string; title: string; url: string | null; locator: string; doesNotEstablish: string; rightsBasis: string }>
  relatedLinks: Array<{ url: string; relationship: string }>
  boundedAnswers: Array<{ question: string; answer: string }>
  structuredData: JsonObject
  contentDigest: string
  release: { releaseId: string; targetContentDigest: string; releaseDigest: string; authority: { authorizedOn: string } }
}
type Bundle = JsonObject & { siteId: string; canonicalHosts: string[]; pages: FederationPage[]; provenanceDigest: string }

function canonical(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null'
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`
  return `{${Object.entries(value as JsonObject).filter(([, item]) => item !== undefined).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => `${JSON.stringify(key)}:${canonical(item)}`).join(',')}}`
}

function digest(value: unknown): string {
  return `sha256:${createHash('sha256').update(canonical(value)).digest('hex')}`
}

function without(value: JsonObject, key: string): JsonObject {
  return Object.fromEntries(Object.entries(value).filter(([name]) => name !== key))
}

const bundle = bundleJson as unknown as Bundle
if (digest(without(bundle, 'provenanceDigest')) !== bundle.provenanceDigest) throw new Error('federation-deployment-bundle-digest-invalid')
if (bundle.siteId !== 'maha-os' || bundle.canonicalHosts.some((host) => host !== 'www.maha-os.com')) throw new Error('federation-deployment-bundle-host-invalid')
if (bundle.pages.length !== 66) throw new Error('federation-deployment-bundle-cardinality-invalid')

const pages = new Map<string, FederationPage>()
for (const page of bundle.pages) {
  const { release, ...content } = page
  if (digest(without(content as JsonObject, 'contentDigest')) !== page.contentDigest) throw new Error(`federation-page-digest-invalid:${page.candidateId}`)
  if (digest(without(release as unknown as JsonObject, 'releaseDigest')) !== release.releaseDigest || release.targetContentDigest !== page.contentDigest) throw new Error(`federation-release-binding-invalid:${page.candidateId}`)
  if (page.canonicalUrl !== `https://${page.canonicalHost}${page.path}` || pages.has(page.path)) throw new Error(`federation-route-invalid:${page.candidateId}`)
  pages.set(page.path, page)
}

export function federationParams(pattern: RegExp, names: readonly string[]) {
  return [...pages.keys()].filter((path) => pattern.test(path)).map((path) => {
    const match = path.match(pattern)
    if (!match) throw new Error(`federation-static-param-mismatch:${path}`)
    return Object.fromEntries(names.map((name, index) => [name, match[index + 1]]))
  })
}

export function federationMetadata(path: string): Metadata {
  const page = pages.get(path)
  if (!page) return {}
  return { title: page.title, description: page.directAnswer, alternates: { canonical: page.canonicalUrl }, openGraph: { title: page.title, description: page.directAnswer, url: page.canonicalUrl, type: 'article' } }
}

export function renderFederationPage(path: string) {
  const page = pages.get(path)
  if (!page) notFound()
  return <FederationReleasedPage page={page} />
}

export function federationSitemapRows(): MetadataRoute.Sitemap {
  return [...pages.values()].map((page) => ({ url: page.canonicalUrl, lastModified: new Date(page.release.authority.authorizedOn), changeFrequency: 'monthly', priority: 0.7 }))
}

export function federationLlmsText(): string {
  return ['# Maha OS federated evidence pages', '', `Active exact-revision releases: ${pages.size}`, '', ...[...pages.values()].map((page) => `- [${page.title}](${page.canonicalUrl}) — ${page.directAnswer}`), ''].join('\n')
}
