import { useEffect } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import ProjectGrid from '../../components/ProjectGrid'
import SiteFooter from '../../components/SiteFooter'
import Seo from '../../components/Seo'
import { orderedProjects } from '../../data/projects'
import { createAsciiField } from '../../utils/ascii'

const ARCHIVE_ASCII = createAsciiField(760, 720, 819427)
export default function Work() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="work-archive-page" id="top">
      <Seo
        title="Website Work — Elija Reigne"
        description="Explore website projects, product systems, client work, and independent concepts designed and built by Elija Reigne."
        path="/work"
      />
      <pre className="ascii-field work-archive-ascii" aria-hidden="true">{ARCHIVE_ASCII}</pre>

      <header className="floating-header work-archive-header">
        <a href="/" className="pill-brand">Reigne</a>
        <a href="/" className="contact-back"><ArrowLeft /> Home</a>
        <a href="/contact" className="pill-contact">Let&apos;s talk <ArrowUpRight /></a>
      </header>

      <main className="work-archive-main">
        <section className="work-archive-intro">
          <div>
            <p>Full archive · {String(orderedProjects.length).padStart(2, '0')} projects</p>
            <h1>All websites.</h1>
          </div>
          <p>Client work, product systems, and independent concepts—collected in one place.</p>
        </section>

        <ProjectGrid projects={orderedProjects} className="archive-project-grid" />
      </main>

      <SiteFooter wordmarkHref="/" />
    </div>
  )
}
