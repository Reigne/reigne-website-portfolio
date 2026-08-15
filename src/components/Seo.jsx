import { useEffect } from 'react'

const DEFAULT_SITE_URL = 'https://www.codebyreigne.com'
const DEFAULT_TITLE = 'Elija Reigne — Web Designer & Full-stack Developer'
const DEFAULT_DESCRIPTION = 'Selected websites and digital products designed and built by Elija Reigne, a full-stack developer based in the Philippines and working worldwide.'
const DEFAULT_IMAGE = '/og-image.png'

const cleanSiteUrl = (value) => value.replace(/\/$/, '')

const getSiteUrl = () => cleanSiteUrl(import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL)

const toAbsoluteUrl = (value) => {
  if (!value) return `${getSiteUrl()}${DEFAULT_IMAGE}`
  if (/^https?:\/\//i.test(value)) return value
  return new URL(value, `${getSiteUrl()}/`).href
}

const upsertMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

const upsertCanonical = (href) => {
  let element = document.head.querySelector('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  structuredData,
}) {
  useEffect(() => {
    const canonical = new URL(path, `${getSiteUrl()}/`).href
    const socialImage = toAbsoluteUrl(image)

    document.title = title
    upsertCanonical(canonical)
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:site_name', 'Elija Reigne')
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', socialImage)
    upsertMeta('property', 'og:image:alt', `${title} — preview`)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', socialImage)

    const scriptId = 'route-structured-data'
    let script = document.getElementById(scriptId)

    if (structuredData) {
      if (!script) {
        script = document.createElement('script')
        script.id = scriptId
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(structuredData)
    } else if (script) {
      script.remove()
    }
  }, [description, image, path, structuredData, title, type])

  return null
}

export { DEFAULT_DESCRIPTION, DEFAULT_SITE_URL, DEFAULT_TITLE }
