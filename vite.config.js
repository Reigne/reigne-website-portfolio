import { defineConfig } from 'vite'
import process from 'node:process'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { projects } from './src/data/projects.js'

const DEFAULT_SITE_URL = 'https://www.codebyreigne.com'

const getSiteUrl = () => {
  const value = process.env.VITE_SITE_URL || DEFAULT_SITE_URL
  const absolute = /^https?:\/\//i.test(value) ? value : `https://${value}`
  return absolute.replace(/\/$/, '')
}

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;')

const replaceHeadValue = (html, selector, value) => {
  const escapedValue = value.replaceAll('"', '&quot;')

  if (selector === 'title') {
    return html.replace(/<title>.*?<\/title>/s, `<title>${value}</title>`)
  }

  const separator = selector.indexOf(':')
  const attribute = selector.slice(0, separator)
  const key = selector.slice(separator + 1)
  const pattern = new RegExp(`(<meta ${attribute}="${key}" content=")[^"]*("\\s*\\/?>)`, 'i')
  return html.replace(pattern, `$1${escapedValue}$2`)
}

const createSeoAssets = () => ({
  name: 'portfolio-seo-assets',
  enforce: 'post',
  generateBundle(_options, bundle) {
    const siteUrl = getSiteUrl()
    const routes = [
      { path: '/', title: 'Elija Reigne — Web Designer & Full-stack Developer', description: 'Selected websites and digital products designed and built by Elija Reigne, a full-stack developer based in the Philippines and working worldwide.', image: '/og-image.png', type: 'website', priority: '1.0' },
      { path: '/work', title: 'Website Work — Elija Reigne', description: 'Explore website projects, product systems, client work, and independent concepts designed and built by Elija Reigne.', image: '/og-image.png', type: 'website', priority: '0.9' },
      { path: '/graphics', title: 'Graphic Design Archive — Elija Reigne', description: 'Explore graphic design work by Elija Reigne, including campaigns, digital advertisements, social media visuals, sports graphics, and thumbnails.', image: '/og-image.png', type: 'website', priority: '0.7' },
      { path: '/contact', title: 'Start a Project — Elija Reigne', description: 'Tell Elija Reigne about your website, web application, automation system, or design and development project.', image: '/og-image.png', type: 'website', priority: '0.8' },
      ...projects.map((project) => ({
        path: `/work/${project.id}`,
        title: `${project.name} — Website Case Study | Elija Reigne`,
        description: project.summary,
        image: '/og-image.png',
        type: 'article',
        priority: '0.7',
      })),
    ]

    const sitemap = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...routes.map((route) => `  <url><loc>${escapeXml(`${siteUrl}${route.path}`)}</loc><changefreq>monthly</changefreq><priority>${route.priority}</priority></url>`),
      '</urlset>',
      '',
    ].join('\n')

    this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    })

    const entry = bundle['index.html']
    if (!entry || entry.type !== 'asset') return

    routes.filter((route) => route.path !== '/').forEach((route) => {
      const canonical = `${siteUrl}${route.path}`
      const image = new URL(route.image, `${siteUrl}/`).href
      let html = String(entry.source)
      html = replaceHeadValue(html, 'title', route.title)
      html = replaceHeadValue(html, 'name:description', route.description)
      html = replaceHeadValue(html, 'property:og:type', route.type)
      html = replaceHeadValue(html, 'property:og:title', route.title)
      html = replaceHeadValue(html, 'property:og:description', route.description)
      html = replaceHeadValue(html, 'property:og:url', canonical)
      html = replaceHeadValue(html, 'property:og:image', image)
      html = replaceHeadValue(html, 'property:og:image:alt', `${route.title} — preview`)
      html = replaceHeadValue(html, 'name:twitter:title', route.title)
      html = replaceHeadValue(html, 'name:twitter:description', route.description)
      html = replaceHeadValue(html, 'name:twitter:image', image)
      html = html.replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/i, `$1${canonical}$2`)

      const fileName = `${route.path.slice(1)}/index.html`
      this.emitFile({ type: 'asset', fileName, source: html })
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), createSeoAssets()],
})
