import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import GraphicLightbox from '../components/GraphicLightbox'
import Seo from '../components/Seo'
import SiteFooter from '../components/SiteFooter'
import { GALLERY_ITEMS } from '../data/gallery'
import { createAsciiField } from '../utils/ascii'

const GRAPHICS_ASCII = createAsciiField(760, 720, 429731)
const CATEGORY_COUNT = new Set(GALLERY_ITEMS.map((item) => item.tag)).size

export default function Graphics() {
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="graphics-archive-page" id="top">
      <Seo
        title="Graphic Design Archive — Elija Reigne"
        description="Explore graphic design work by Elija Reigne, including campaigns, digital advertisements, social media visuals, sports graphics, and thumbnails."
        path="/graphics"
      />

      <pre className="ascii-field graphics-archive-ascii" aria-hidden="true">{GRAPHICS_ASCII}</pre>

      <header className="floating-header graphics-archive-header">
        <a href="/" className="pill-brand">Reigne</a>
        <a href="/#graphics" className="contact-back"><ArrowLeft /> Home</a>
        <a href="/contact" className="pill-contact">Let&apos;s talk <ArrowUpRight /></a>
      </header>

      <main className="graphics-archive-main">
        <section className="graphics-archive-intro">
          <div>
            <p>Side archive · {String(GALLERY_ITEMS.length).padStart(2, '0')} pieces</p>
            <h1>Graphic<br />work.</h1>
          </div>
          <div className="graphics-archive-summary">
            <p>Campaigns, thumbnails, social media visuals, and experiments collected in one place.</p>
            <span>{String(CATEGORY_COUNT).padStart(2, '0')} categories · Mixed formats</span>
          </div>
        </section>

        <section className="graphic-masonry" aria-label="Graphic design archive">
          {GALLERY_ITEMS.map((item, index) => (
            <button
              type="button"
              className="graphic-masonry-card"
              key={item.src}
              onClick={() => setLightbox(item)}
              aria-label={`View ${item.title}`}
            >
              <img
                src={item.src}
                alt={item.title}
                loading={index < 4 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <span className="graphic-masonry-caption">
                <small>{item.tag}</small>
                <strong>{item.title}</strong>
              </span>
            </button>
          ))}
        </section>
      </main>

      <SiteFooter returnHref="#top" returnLabel="Back to top" wordmarkHref="/" />
      <GraphicLightbox item={lightbox} onClose={() => setLightbox(null)} />
    </div>
  )
}
