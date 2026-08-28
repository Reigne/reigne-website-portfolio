import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Download, GitBranch } from 'lucide-react'
import Seo from '../components/Seo'
import SiteFooter from '../components/SiteFooter'
import { createAsciiField } from '../utils/ascii'

const ABOUT_ASCII = createAsciiField(520, 640, 370119)
const GITHUB_PROFILE = 'https://github.com/Reigne'

const journey = [
  {
    year: '2024',
    title: 'The foundation',
    copy: 'Started shipping internal tools as a junior developer intern, building ATS workflows with PHP and SQL.',
  },
  {
    year: '2025',
    title: 'From screens to systems',
    copy: 'Moved into frontend development, creating grading platforms and business tools with React.',
  },
  {
    year: 'Now',
    title: 'Design meets engineering',
    copy: 'Building websites, product systems, automations, and AI-powered workflows from first idea to production.',
  },
]

const toolkit = [
  { label: 'Interface', items: 'React, Vite, Tailwind CSS' },
  { label: 'Systems', items: 'Node.js, PHP, Laravel, APIs' },
  { label: 'Data', items: 'Supabase, PostgreSQL, MySQL' },
  { label: 'Creative', items: 'Figma, Photoshop, Premiere Pro' },
  { label: 'Automation', items: 'n8n, webhooks, AI workflows' },
]

function ContributionCalendar() {
  const [calendar, setCalendar] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/github-contributions', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Contribution data is unavailable')
        return response.json()
      })
      .then((data) => {
        setCalendar(data)
        setStatus('ready')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error')
      })

    return () => controller.abort()
  }, [])

  const cells = useMemo(() => {
    if (!calendar?.days?.length) return []

    const firstDate = new Date(`${calendar.days[0].date}T00:00:00`)
    return [
      ...Array.from({ length: firstDate.getDay() }, (_, index) => ({ empty: true, id: `empty-${index}` })),
      ...calendar.days,
    ]
  }, [calendar])

  return (
    <section className="about-contributions" aria-labelledby="contributions-title">
      <div className="contributions-heading">
        <div>
          <p className="section-number">03 / Open source rhythm</p>
          <h2 id="contributions-title">Making things,<br /><em>one commit at a time.</em></h2>
        </div>
        <div className="contributions-summary">
          <p>Public GitHub activity from this year, refreshed from my profile.</p>
          <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer">
            <GitBranch aria-hidden="true" /> Follow @Reigne <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className={`contribution-card is-${status}`}>
        <div className="contribution-card-top">
          <div>
            <span>Contribution activity</span>
            <strong>{status === 'ready' ? calendar.total.toLocaleString() : '—'}</strong>
          </div>
          <span>{status === 'ready' ? calendar.year : new Date().getFullYear()} / Year to date</span>
        </div>

        {status === 'ready' && (
          <>
            <div className="contribution-scroll" tabIndex="0" aria-label={`${calendar.total} GitHub contributions in ${calendar.year}`}>
              <div className="contribution-weekdays" aria-hidden="true">
                <span>Mon</span><span>Wed</span><span>Fri</span>
              </div>
              <div className="contribution-grid">
                {cells.map((day) => day.empty ? (
                  <span className="contribution-day is-empty" key={day.id} aria-hidden="true" />
                ) : (
                  <span
                    className="contribution-day"
                    data-level={day.level}
                    key={day.date}
                    title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
            <div className="contribution-legend" aria-hidden="true">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => <i data-level={level} key={level} />)}
              <span>More</span>
            </div>
          </>
        )}

        {status === 'loading' && (
          <div className="contribution-loading" aria-live="polite">
            <span />
            <p>Loading GitHub activity…</p>
          </div>
        )}

        {status === 'error' && (
          <div className="contribution-error">
            <p>The live calendar is taking a break.</p>
            <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer">See activity on GitHub <ArrowUpRight aria-hidden="true" /></a>
          </div>
        )}
      </div>
    </section>
  )
}

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="about-page" id="top">
      <Seo
        title="About Elija Reigne — Designer & Full-stack Developer"
        description="Meet Elija Reigne, a design-led full-stack developer from the Philippines building thoughtful websites, product systems, and automations."
        path="/about"
      />
      <pre className="ascii-field about-page-ascii" aria-hidden="true">{ABOUT_ASCII}</pre>

      <header className="floating-header about-page-header">
        <a href="/" className="pill-brand">Reigne</a>
        <a href="/" className="contact-back"><ArrowLeft /> Home</a>
        <a href="/contact" className="pill-contact">Let&apos;s talk <ArrowUpRight /></a>
      </header>

      <main className="about-page-main">
        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-hero-title">
            <p>About me · Philippines / Worldwide</p>
            <h1 id="about-title">Half designer.<br />Half developer.<br /><em>Fully invested.</em></h1>
          </div>

          <figure className="about-portrait">
            <img src="/images/reigne-2.webp" alt="Elija Reigne" decoding="async" />
            <figcaption><span>Elija Reigne</span><span>Web developer · Creative technologist</span></figcaption>
          </figure>

          <div className="about-hero-note">
            <p>I’m Elija, a full-stack developer with a designer’s eye. I turn rough ideas into digital experiences that are clear, useful, and unmistakably yours.</p>
            <div>
              <a href="/reigne-resume.pdf" target="_blank" rel="noreferrer">Download résumé <Download aria-hidden="true" /></a>
              <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer">GitHub <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="about-manifesto">
          <p className="section-number">01 / Point of view</p>
          <div>
            <h2>Good digital work should feel <em>obvious in use,</em> not ordinary in character.</h2>
            <div className="about-manifesto-copy">
              <p>I work across design and development because the best decisions rarely stay in one lane. A layout affects performance. A technical constraint can become a visual idea. The whole thing gets better when those conversations happen together.</p>
              <p>My approach is thoughtful, direct, and practical: understand what matters, remove what doesn’t, then build the details people can feel.</p>
            </div>
          </div>
        </section>

        <section className="about-journey" aria-labelledby="journey-title">
          <div className="about-section-heading">
            <p className="section-number">02 / The path here</p>
            <h2 id="journey-title">Still learning.<br /><em>Always shipping.</em></h2>
          </div>
          <div className="journey-list">
            {journey.map((item, index) => (
              <article key={item.year}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <time>{item.year}</time>
                <div><h3>{item.title}</h3><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-toolkit" aria-labelledby="toolkit-title">
          <div>
            <p className="section-number">Tools change. Craft stays.</p>
            <h2 id="toolkit-title">A versatile toolkit for the <em>whole build.</em></h2>
          </div>
          <div className="toolkit-list">
            {toolkit.map((group, index) => (
              <div key={group.label}>
                <span>{String(index + 1).padStart(2, '0')} / {group.label}</span>
                <p>{group.items}</p>
              </div>
            ))}
          </div>
        </section>

        <ContributionCalendar />
      </main>

      <section className="about-cta">
        <p>Have something in mind?</p>
        <a href="/contact">Let’s make it real.<ArrowUpRight aria-hidden="true" /></a>
        <span>Available for select freelance work</span>
      </section>

      <SiteFooter wordmarkHref="/" />
    </div>
  )
}
