import { readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'
import { projects } from '../src/data/projects.js'

// Render actual route components so crawlers and visitors receive the same content.
const server = await createServer({ configFile: false, plugins: [react()], server: { middlewareMode: true }, appType: 'custom' })
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx')
  const paths = ['/', '/work', '/about', '/graphics', '/contact', ...projects.map(project => `/work/${project.id}`)]
  const template = await readFile('dist/index.html', 'utf8')
  for (const path of paths) {
    const file = `dist${path === '/' ? '' : path}/index.html`
    let html = await readFile(file, 'utf8')
    const project = projects.find(project => path === `/work/${project.id}`)
    if (project) {
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)[1]
      const data = {
        '@context': 'https://schema.org', '@type': 'CreativeWork',
        name: project.name, description: project.summary, url: canonical,
        image: new URL(project.image, canonical).href,
        dateCreated: project.year,
        creator: { '@type': 'Person', name: 'Elija Reigne', url: new URL('/', canonical).href },
      }
      const json = JSON.stringify(data).replaceAll('<', '\\u003c')
      html = html.replace('</head>', () => `<script id="route-structured-data" type="application/ld+json">${json}</script></head>`)
    }
    await writeFile(file, html.replace('<div id="root"></div>', () => `<div id="root">${render(path)}</div>`))
  }
  const notFound = template
    .replace(/<title>.*?<\/title>/s, '<title>Page not found | Elija Reigne</title>')
    .replace('</head>', '<meta name="robots" content="noindex, follow" /></head>')
    .replace('<div id="root"></div>', () => `<div id="root">${render('/404')}</div>`)
  await writeFile('dist/404.html', notFound)
  console.log(`Prerendered ${paths.length} pages and a 404 page.`)
} finally {
  await server.close()
}
