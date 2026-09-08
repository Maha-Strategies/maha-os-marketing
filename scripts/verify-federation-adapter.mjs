import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const config = {
  bundlePath: new URL('../content/federation/maha-os-v1.json', import.meta.url),
  siteId: 'maha-os',
  hosts: ['www.maha-os.com'],
  released: 66,
  total: 79,
  paths: [/^\/knowledge\/private-machine-systems\/[^/]+\/[^/]+$/],
}

const canonical = (value) => {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null'
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`
  return `{${Object.entries(value).filter(([, item]) => item !== undefined).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => `${JSON.stringify(key)}:${canonical(item)}`).join(',')}}`
}
const digest = (value) => `sha256:${createHash('sha256').update(canonical(value)).digest('hex')}`
const without = (value, key) => Object.fromEntries(Object.entries(value).filter(([name]) => name !== key))

const bundle = JSON.parse(readFileSync(config.bundlePath, 'utf8'))
assert.equal(bundle.siteId, config.siteId)
assert.deepEqual(bundle.canonicalHosts, config.hosts)
assert.equal(bundle.pages.length, config.released)
assert.equal(bundle.counts.totalRoutes, config.total)
assert.equal(digest(without(bundle, 'provenanceDigest')), bundle.provenanceDigest)

const urls = new Set(bundle.baselineRoutes.map((row) => row.url))
for (const page of bundle.pages) {
  const { release, ...content } = page
  assert.ok(config.paths.some((pattern) => pattern.test(page.path)), page.path)
  assert.equal(page.canonicalUrl, `https://${page.canonicalHost}${page.path}`)
  assert.equal(digest(without(content, 'contentDigest')), page.contentDigest)
  assert.equal(digest(without(release, 'releaseDigest')), release.releaseDigest)
  assert.equal(release.targetContentDigest, page.contentDigest)
  assert.equal(page.boundedAnswers.length, 5)
  assert.equal(urls.has(page.canonicalUrl), false, page.canonicalUrl)
  urls.add(page.canonicalUrl)
}
assert.equal(urls.size, config.total)

const serialized = JSON.stringify(bundle)
for (const marker of ['reviewRationale', 'auditCorpus', 'service_role', 'STRIPE_SECRET_KEY', 'SUPABASE_ACCESS_TOKEN', 'VERCEL_TOKEN', 'customerEmail', 'paymentIntent']) assert.doesNotMatch(serialized, new RegExp(marker, 'i'))
console.log(JSON.stringify({ verified: true, siteId: config.siteId, releasedRoutes: config.released, totalRoutes: config.total, bundleDigest: bundle.provenanceDigest }))
