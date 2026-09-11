import { useEffect } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Seo from '../components/Seo'
import { createAsciiField } from '../utils/ascii'
import './NotFound.css'

const NOT_FOUND_ASCII = createAsciiField(180, 480, 404271)

export default function NotFound() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="not-found-page">
      <pre className="ascii-field not-found-ascii" aria-hidden="true">{NOT_FOUND_ASCII}</pre>
      <Seo title="Page not found | Elija Reigne" description="This page could not be found. Explore Elija Reigne's portfolio or get in touch." path={pathname} noindex />
      <header className="not-found-header">
        <Link to="/" className="pill-brand" aria-label="Reigne home">Reigne</Link>
        <Link to="/contact" className="not-found-contact">Let&apos;s talk <ArrowUpRight aria-hidden="true" /></Link>
      </header>

      <main className="not-found-main" id="main-content">
        <div className="not-found-status"><span>Somewhere off the map</span><span>Error / 404</span></div>
        <div className="not-found-layout">
          <div className="not-found-art" aria-hidden="true">
            <span>4</span><span className="not-found-orbit"><span className="not-found-star">*</span></span><span>4</span>
            <span className="not-found-art-caption">Nothing to see here. Plenty elsewhere.</span>
          </div>
          <section className="not-found-copy" aria-labelledby="not-found-title">
            <p className="not-found-eyebrow">Page not found</p>
            <h1 id="not-found-title">A little<br /><em>off course.</em></h1>
            <p>The page you&apos;re looking for may have moved, or never existed. Let&apos;s get you back to something good.</p>
            <nav className="not-found-actions" aria-label="Find your way back">
              <Link to="/" className="not-found-primary"><ArrowLeft aria-hidden="true" /> Back to home</Link>
              <Link to="/work" className="not-found-secondary">Explore my work <ArrowUpRight aria-hidden="true" /></Link>
            </nav>
          </section>
        </div>
      </main>

      <footer className="not-found-footer"><span>&copy; 2026 Elija Reigne</span><span>Good things are one click away.</span><Link to="/about">Meet the developer <ArrowUpRight aria-hidden="true" /></Link></footer>
    </div>
  )
}
