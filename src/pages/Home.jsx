import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react'
import Avatar from 'boring-avatars'
import { projects } from '../data/projects'
import { GALLERY_ITEMS } from '../data/gallery'
import { testimonials } from '../data/testimonials'
import { createAsciiField } from '../utils/ascii'
import SiteFooter from '../components/SiteFooter'

const featuredProjects = projects.slice(0, -1)
const archiveProject = projects[projects.length - 1]

const ASCII_FIELD = createAsciiField()
const ASCII_HERO_FIELD = createAsciiField(140, 480, 482731)
const TESTIMONIAL_AVATAR_COLORS = ['#11110f', '#8b9b6f', '#d88468', '#d8d3c8', '#f3f2ef']

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('work')
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 24)
  const [showAllDesigns, setShowAllDesigns] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const visibleDesigns = showAllDesigns ? GALLERY_ITEMS : GALLERY_ITEMS.slice(0, 6)

  useEffect(() => {
    if (!menuOpen && !lightbox) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setLightbox(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen, lightbox])

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', updateScrolled, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  useEffect(() => {
    const sections = ['work', 'about', 'testimonials', 'graphics', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.15] })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="portfolio-shell" id="top">
      <header className={`floating-header${scrolled ? ' is-scrolled' : ''}`}>
        <a href="#top" className="pill-brand" onClick={closeMenu}>Reigne</a>
        <nav className="desktop-pill-nav" aria-label="Main navigation">
          <a className={activeSection === 'work' ? 'active' : ''} href="#work">Work</a>
          <a className={activeSection === 'about' ? 'active' : ''} href="#about">About</a>
          <a className={activeSection === 'testimonials' ? 'active' : ''} href="#testimonials">Reviews</a>
          <a className={activeSection === 'graphics' ? 'active' : ''} href="#graphics">Archive</a>
        </nav>
        <a className="pill-contact" href="/contact">
          Let&apos;s talk <ArrowUpRight />
        </a>
        <button
          className="pill-menu"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {menuOpen && (
        <>
          <button className="menu-backdrop" type="button" aria-label="Close menu" onClick={closeMenu} />
          <nav className="pill-dropdown" aria-label="Main navigation">
            <a href="#work" onClick={closeMenu}>Websites <span>01</span></a>
            <a href="#about" onClick={closeMenu}>About <span>02</span></a>
            <a href="#testimonials" onClick={closeMenu}>Client words <span>03</span></a>
            <a href="#graphics" onClick={closeMenu}>Graphic work <span>04</span></a>
            <a href="/contact" onClick={closeMenu}>Contact <span>05</span></a>
          </nav>
        </>
      )}

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <pre className="ascii-field hero-ascii" aria-hidden="true">{ASCII_HERO_FIELD}</pre>
          <div className="hero-copy">
            <p className="hero-kicker">Design-led development</p>
            <h1 id="hero-title">
              I design <span className="hero-inline-portrait" aria-hidden="true"><img src="/images/reigne-2.webp" alt="" decoding="async" /></span> and build <em>distinctive websites.</em>
            </h1>
          </div>

          <div className="hero-bottom">
            <p>Thoughtful digital experiences built with clarity, character, and production-ready code.</p>
            <div className="hero-actions">
              <a href="#work">View selected work <ArrowDownRight /></a>
              <a href="/contact">Start a project <ArrowUpRight /></a>
            </div>
            <span className="hero-availability"><i /> Available for select projects · Philippines / Worldwide</span>
          </div>
        </section>

        <section className="work-section" id="work">
          <pre className="ascii-field" aria-hidden="true">{ASCII_FIELD}</pre>
          <div className="work-heading">
            <div>
              <p className="section-kicker">Web developer · Creative technologist</p>
              <h1>Featured<br />Websites</h1>
            </div>
            <div className="work-heading-side">
              <p>Selected websites, platforms, and digital products I’ve designed and built.</p>
              <a href="#all-work">View all work <ArrowUpRight /></a>
            </div>
          </div>

          <div className="website-grid" id="all-work">
            {featuredProjects.map((project) => (
              <article className="website-project" key={project.id}>
                <div className={`website-preview preview-${project.tone}`}>
                  <a className="site-window" href={`/work/${project.id}`} aria-label={`View ${project.name} case study`}>
                    <div className="window-bar">
                      <div><i /><i /><i /></div>
                      <span>{project.name}</span>
                    </div>
                    <img src={project.image} alt={`${project.name} website preview`} loading="lazy" decoding="async" />
                  </a>
                  {project.url && (
                    <a
                      className="project-launch"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${project.name}`}
                    >
                      <ArrowUpRight />
                    </a>
                  )}
                </div>
                <div className="website-caption">
                  <div>
                    <h2><a href={`/work/${project.id}`}>{project.name}</a></h2>
                    <p>{project.type}</p>
                  </div>
                  <span>{project.index}</span>
                </div>
              </article>
            ))}
          </div>

          <article className="wide-project">
            <div className="wide-project-copy">
              <p>Also in the archive</p>
              <h2><a href={`/work/${archiveProject.id}`}>{archiveProject.name}</a></h2>
              <span>{archiveProject.summary}</span>
            </div>
            <a className="wide-project-image" href={`/work/${archiveProject.id}`} aria-label={`View ${archiveProject.name} case study`}>
              <img src={archiveProject.image} alt={`${archiveProject.name} website preview`} loading="lazy" decoding="async" />
            </a>
          </article>
        </section>

        <section className="about-section" id="about">
          <p className="section-number">01 / About</p>
          <div className="about-copy">
            <h2>I turn ideas into websites that feel <em>clear, useful, and unmistakably yours.</em></h2>
            <div>
              <p>I’m Elija Reigne, a full-stack developer based in the Philippines. I work across design and development, from the first layout to the final production system.</p>
              <p>React, Node.js, Supabase, automation, Figma, and Photoshop are part of the toolkit—not the headline. The work is.</p>
              <a href="/reigne-resume.pdf" target="_blank" rel="noreferrer">More about me <ArrowUpRight /></a>
            </div>
          </div>
        </section>

        <section className="testimonials-section" id="testimonials">
          <div className="testimonials-heading">
            <div>
              <p className="section-number">02 / Client words</p>
              <h2>A few words from people I&apos;ve <em>built with.</em></h2>
            </div>
            <p>Clear communication, thoughtful execution, and work that holds up after launch.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <article className="testimonial-card" key={testimonial.id}>
                <div className="testimonial-card-top">
                  <span className="testimonial-mark" aria-hidden="true">&ldquo;</span>
                  <span className="testimonial-index">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <blockquote>
                  <p>{testimonial.quote}</p>
                  <footer>
                    <span className="testimonial-avatar" aria-hidden="true">
                      <Avatar
                        size={42}
                        name={testimonial.name}
                        variant="beam"
                        colors={TESTIMONIAL_AVATAR_COLORS}
                      />
                    </span>
                    <span className="testimonial-author-copy">
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </span>
                  </footer>
                </blockquote>
              </article>
            ))}
          </div>
        </section>

        <section className="graphics-section" id="graphics">
          <div className="graphics-heading">
            <div>
              <p className="section-number">03 / Side archive</p>
              <h2>Graphic work</h2>
            </div>
            <p>A smaller corner for campaigns, thumbnails, and visual experiments.</p>
          </div>

          <div className="graphics-grid">
            {visibleDesigns.map((item) => (
              <button type="button" className="graphic-card" key={item.src} onClick={() => setLightbox(item)}>
                <img src={item.src} alt={item.title} loading="lazy" decoding="async" />
                <span>{item.tag}</span>
              </button>
            ))}
          </div>

          <button className="show-graphics" type="button" onClick={() => setShowAllDesigns((show) => !show)}>
            <span>{showAllDesigns ? 'Show less' : `View graphic archive (${GALLERY_ITEMS.length})`}</span>
            <ArrowDownRight />
          </button>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-top">
            <p>04 / Start a project</p>
            <span>Available for select freelance work</span>
          </div>
          <a href="/contact" className="contact-link">
            Let’s build<br />something good.<ArrowUpRight />
          </a>
          <div className="contact-bottom">
            <span>Based in the Philippines · Working worldwide</span>
            <div>
              <a href="https://github.com/Reigne" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/elijareigne/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://x.com/codebyreigne" target="_blank" rel="noreferrer">X / Twitter</a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.title} onClick={() => setLightbox(null)}>
          <button type="button" aria-label="Close image" onClick={() => setLightbox(null)}><X /></button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.title} decoding="async" />
            <figcaption><span>{lightbox.tag}</span>{lightbox.title}</figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}
