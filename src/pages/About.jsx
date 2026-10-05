import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Download, GitBranch } from 'lucide-react'
import Avatar from 'boring-avatars'
import Seo from '../components/Seo'
import SiteFooter from '../components/SiteFooter'
import { projects } from '../data/projects'
import { GALLERY_ITEMS } from '../data/gallery'
import { stack } from '../data/stack'
import { testimonials } from '../data/testimonials'
import { timeline } from '../data/timeline'
import { createAsciiField } from '../utils/ascii'
import './About.css'

const ABOUT_ASCII = createAsciiField(520, 640, 370119)
const GITHUB_PROFILE = 'https://github.com/Reigne'
const LINKEDIN_PROFILE = 'https://www.linkedin.com/in/elijareigne/'
const AVATAR_COLORS = ['#11110f', '#8b9b6f', '#d88468', '#d8d3c8', '#f3f2ef']

const STATEMENT = [
  { text: 'I’m a full-stack developer with a designer’s eye. I care about the whole thing —' },
  { text: 'how it looks, how it reads, how it loads,', em: true },
  { text: 'and how it holds up once real people start using it.' },
]

const FACTS = [
  { label: 'Based in', value: 'Philippines', note: 'GMT+8 · Working worldwide' },
  { label: 'Focus', value: 'Design + build', note: 'Websites, systems, automation' },
  { label: 'Shipped', value: `${projects.length} websites`, note: `+ ${GALLERY_ITEMS.length} graphic pieces` },
  { label: 'Building since', value: '2024', note: 'Still learning. Always shipping.' },
]

// Work that belongs to each chapter of the timeline, matched by timeline id.
const CHAPTER_WORK = {
  1: ['hr-primo'],
  2: ['tapinac', 'quickform'],
  3: ['gia-website', 'william-darts', 'crestline-roofing'],
}

const PRINCIPLES = [
  {
    title: 'Clarity first',
    copy: 'If someone has to stop and figure out how it works, it isn’t finished. I start with what people need to understand, then design around that.',
  },
  {
    title: 'One conversation',
    copy: 'Design and code decided together. A layout affects performance; a technical constraint can become a visual idea.',
  },
  {
    title: 'Details you can feel',
    copy: 'Spacing, motion, load times, empty states. The small things are usually what make a site feel considered.',
  },
  {
    title: 'Ship, then sharpen',
    copy: 'Get a real version in front of real people early, then keep improving the parts that actually matter.',
  },
]

const FEATURED_QUOTES = [6, 1, 5, 7]
  .map((id) => testimonials.find((testimonial) => testimonial.id === id))
  .filter(Boolean)

const ARCHIVE_ITEMS = (() => {
  const thumbnails = GALLERY_ITEMS.filter((item) => item.tag === 'Design').slice(0, 5)
  const campaigns = GALLERY_ITEMS.filter((item) => item.tag !== 'Design').slice(0, 5)
  return thumbnails.flatMap((item, index) => [item, campaigns[index]]).filter(Boolean)
})()

const shouldAnimate = () => typeof window !== 'undefined'
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const clamp = (value) => Math.min(1, Math.max(0, value))

const getManilaClock = () => {
  const now = new Date()
  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(now)
  const hour = Number(new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila', hour: 'numeric', hourCycle: 'h23',
  }).format(now))
  const mood = hour >= 8 && hour < 19 ? 'probably at my desk'
    : hour >= 19 && hour < 24 ? 'winding down'
      : 'probably asleep'
  return { time, mood }
}

function SplitWord({ word, offset = 0 }) {
  return word.split('').map((letter, index) => (
    <span className="ap-letter" key={`${letter}-${index}`} style={{ '--i': index + offset }}>
      <span>{letter}</span>
    </span>
  ))
}

function Toolkit() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef([])
  const group = stack[active]

  const handleKeyDown = (event) => {
    const steps = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next
    if (event.key in steps) next = (active + steps[event.key] + stack.length) % stack.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = stack.length - 1
    else return

    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="ap-toolkit" aria-labelledby="toolkit-title">
      <div className="ap-heading" data-reveal>
        <p className="section-number">04 / Toolkit</p>
        <h2 id="toolkit-title">Tools change.<br /><em>Craft stays.</em></h2>
        <p className="ap-heading-note">The stack I reach for, and what each piece is actually good for.</p>
      </div>

      <div className="ap-toolkit-body" data-reveal>
        <div className="ap-tabs" role="tablist" aria-label="Toolkit categories" onKeyDown={handleKeyDown}>
          {stack.map((category, index) => (
            <button
              key={category.cat}
              ref={(node) => { tabRefs.current[index] = node }}
              type="button"
              role="tab"
              id={`toolkit-tab-${index}`}
              aria-selected={index === active}
              aria-controls="toolkit-panel"
              tabIndex={index === active ? 0 : -1}
              className={index === active ? 'is-active' : ''}
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {category.cat}
              <small>{category.items.length}</small>
            </button>
          ))}
        </div>

        <ul
          className="ap-tools"
          id="toolkit-panel"
          role="tabpanel"
          aria-labelledby={`toolkit-tab-${active}`}
          key={group.cat}
        >
          {group.items.map((tool, index) => (
            <li key={tool.name} style={{ '--i': index }}>
              <strong>{tool.name}</strong>
              <p>{tool.useCase}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function KindWords() {
  const [index, setIndex] = useState(0)
  const quote = FEATURED_QUOTES[index]
  const step = (direction) => setIndex((current) => (current + direction + FEATURED_QUOTES.length) % FEATURED_QUOTES.length)

  return (
    <section className="ap-quote" aria-labelledby="quote-title">
      <div className="ap-quote-top" data-reveal>
        <p className="section-number" id="quote-title">05 / Kind words</p>
        <a href="/#testimonials">All testimonials <ArrowUpRight aria-hidden="true" /></a>
      </div>

      <figure className="ap-quote-body" key={quote.id} aria-live="polite">
        <blockquote>
          <p><span aria-hidden="true">“</span>{quote.quote}<span aria-hidden="true">”</span></p>
        </blockquote>
        <figcaption>
          <span className="ap-quote-avatar" aria-hidden="true">
            <Avatar size={44} name={quote.name} variant="beam" colors={AVATAR_COLORS} />
          </span>
          <span>
            <a href={quote.projectHref}>{quote.name}</a>
            <small>{quote.role}</small>
          </span>
        </figcaption>
      </figure>

      <div className="ap-quote-controls">
        <small>Paraphrased from real project experiences.</small>
        <div>
          <span>{String(index + 1).padStart(2, '0')} / {String(FEATURED_QUOTES.length).padStart(2, '0')}</span>
          <button type="button" aria-label="Previous testimonial" onClick={() => step(-1)}><ArrowLeft /></button>
          <button type="button" aria-label="Next testimonial" onClick={() => step(1)}><ArrowRight /></button>
        </div>
      </div>
    </section>
  )
}

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
    <section className="ap-contributions" aria-labelledby="contributions-title">
      <div className="ap-contributions-heading" data-reveal>
        <div>
          <p className="section-number">07 / Open source rhythm</p>
          <h2 id="contributions-title">Making things,<br /><em>one commit at a time.</em></h2>
        </div>
        <div className="ap-contributions-summary">
          <p>Public GitHub activity from this year, refreshed from my profile.</p>
          <a className="ap-link" href={GITHUB_PROFILE} target="_blank" rel="noreferrer">
            <GitBranch aria-hidden="true" /> Follow @Reigne <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className={`contribution-card is-${status}`} data-reveal>
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
            <a className="ap-link" href={GITHUB_PROFILE} target="_blank" rel="noreferrer">See activity on GitHub <ArrowUpRight aria-hidden="true" /></a>
          </div>
        )}
      </div>
    </section>
  )
}

export default function About() {
  const rootRef = useRef(null)
  const heroRef = useRef(null)
  const statementRef = useRef(null)
  const storyRef = useRef(null)
  const [armed] = useState(shouldAnimate)
  const [clock, setClock] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    const updateClock = () => setClock(getManilaClock())
    updateClock()
    const timer = window.setInterval(updateClock, 15000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!armed) return undefined

    const targets = rootRef.current.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -12% 0px' })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [armed])

  useEffect(() => {
    if (!armed) return undefined

    const words = [...statementRef.current.querySelectorAll('.ap-word')]
    let frameId = 0

    const update = () => {
      frameId = 0
      const viewport = window.innerHeight

      heroRef.current.style.setProperty('--hero-scroll', clamp(window.scrollY / viewport).toFixed(3))

      // Words fill in as the statement travels from the lower edge to the upper third.
      const statement = statementRef.current.getBoundingClientRect()
      const reading = clamp((viewport * 0.88 - statement.top) / (viewport * 0.5 + statement.height * 0.6))
      words.forEach((word, index) => {
        word.style.setProperty('--word-progress', clamp(reading * words.length - index).toFixed(3))
      })

      const story = storyRef.current.getBoundingClientRect()
      storyRef.current.style.setProperty('--story-progress', clamp((viewport * 0.6 - story.top) / story.height).toFixed(3))
    }

    const queueUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', queueUpdate, { passive: true })
    window.addEventListener('resize', queueUpdate)
    return () => {
      window.removeEventListener('scroll', queueUpdate)
      window.removeEventListener('resize', queueUpdate)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [armed])

  let wordIndex = 0

  return (
    <div className={`about-page${armed ? ' is-armed' : ''}`} id="top" ref={rootRef}>
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

      <main className="ap-main">
        <section className="ap-hero" ref={heroRef} aria-labelledby="about-title">
          <div className="ap-hero-meta">
            <span>About</span>
            <span>Designer &amp; full-stack developer</span>
            <span className="ap-clock">
              <i aria-hidden="true" />
              {clock ? <><time>{clock.time}</time> in the Philippines · {clock.mood}</> : 'Philippines · GMT+8'}
            </span>
          </div>

          <h1 className="ap-name" id="about-title">
            <span className="ap-sr-only">Elija Reigne</span>
            <span className="ap-name-first" aria-hidden="true"><SplitWord word="Elija" /></span>
            <span className="ap-name-last" aria-hidden="true"><SplitWord word="Reigne" offset={3} /></span>
          </h1>

          <figure className="ap-portrait">
            <div className="ap-portrait-frame">
              <img
                src="/images/reigne-2-large.webp"
                srcSet="/images/reigne-2.webp 600w, /images/reigne-2-large.webp 1198w"
                sizes="(max-width: 700px) calc(100vw - 32px), 460px"
                alt="Portrait of Elija Reigne"
                width="1198"
                height="1313"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <span>Elija Reigne</span>
              <span>Philippines / Worldwide</span>
            </figcaption>
            <a className="ap-badge" href="/contact" aria-label="Available for select projects — start a project">
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <defs>
                  <path id="ap-badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                </defs>
                <text><textPath href="#ap-badge-circle" textLength="286" lengthAdjust="spacing">Available for select projects · 2026 ·</textPath></text>
              </svg>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </figure>

          <div className="ap-hero-foot">
            <p>A designer who writes the code. I build websites, product systems, and automations—from the first sketch to the production deploy.</p>
            <nav className="ap-hero-links" aria-label="Profiles and résumé">
              <a className="ap-link" href="/reigne-resume.pdf" target="_blank" rel="noreferrer">Résumé <Download aria-hidden="true" /></a>
              <a className="ap-link" href={GITHUB_PROFILE} target="_blank" rel="noreferrer">GitHub <ArrowUpRight aria-hidden="true" /></a>
              <a className="ap-link" href={LINKEDIN_PROFILE} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight aria-hidden="true" /></a>
            </nav>
          </div>
        </section>

        <section className="ap-intro" aria-labelledby="intro-title">
          <p className="section-number" data-reveal>01 / Who I am</p>
          <h2 className="ap-statement" id="intro-title" ref={statementRef}>
            {STATEMENT.map((segment) => {
              const words = segment.text.split(' ').map((word) => (
                <span className="ap-word" key={`${word}-${wordIndex++}`}>{word} </span>
              ))
              return segment.em ? <em key={segment.text}>{words}</em> : words
            })}
          </h2>

          <dl className="ap-facts">
            {FACTS.map((fact, index) => (
              <div key={fact.label} data-reveal style={{ '--reveal-delay': `${index * 90}ms` }}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
                <dd>{fact.note}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="ap-story" aria-labelledby="story-title">
          <div className="ap-heading ap-heading-sticky" data-reveal>
            <p className="section-number">02 / The path here</p>
            <h2 id="story-title">From internal tools to <em>complete products.</em></h2>
            <p className="ap-heading-note">I started on internal tools, moved into product interfaces, and now design and build complete web experiences.</p>
          </div>

          <ol className="ap-chapters" ref={storyRef}>
            {timeline.map((chapter, index) => {
              const related = (CHAPTER_WORK[chapter.id] ?? [])
                .map((id) => projects.find((project) => project.id === id))
                .filter(Boolean)
              const isCurrent = index === timeline.length - 1

              return (
                <li key={chapter.id} data-reveal className={isCurrent ? 'is-current' : ''}>
                  <span className="ap-chapter-dot" aria-hidden="true" />
                  <div className="ap-chapter-year">
                    <time>{chapter.year}</time>
                    {isCurrent && <span>Now</span>}
                  </div>
                  <div className="ap-chapter-body">
                    <h3>{chapter.role}</h3>
                    <p>{chapter.desc}</p>
                    {related.length > 0 && (
                      <ul className="ap-chapter-work" aria-label={`Work from ${chapter.year}`}>
                        {related.map((project) => (
                          <li key={project.id}>
                            <a href={`/work/${project.id}`}>{project.name} <ArrowUpRight aria-hidden="true" /></a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="ap-principles" aria-labelledby="principles-title">
          <div className="ap-principles-top" data-reveal>
            <p className="section-number">03 / How I work</p>
            <h2 id="principles-title">Four things I <em>won’t compromise on.</em></h2>
          </div>
          <ol className="ap-principle-list">
            {PRINCIPLES.map((principle, index) => (
              <li key={principle.title} data-reveal style={{ '--reveal-delay': `${index * 90}ms` }}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <Toolkit />

        <KindWords />
      </main>

      <section className="ap-archive" aria-labelledby="archive-title">
        <div className="ap-archive-heading" data-reveal>
          <div>
            <p className="section-number">06 / Side quests</p>
            <h2 id="archive-title">Off the browser, <em>still designing.</em></h2>
          </div>
          <div>
            <p>Campaigns, ads, and thumbnails. Designing outside the browser keeps my eye sharp when I&apos;m back in it.</p>
            <a className="ap-link" href="/graphics">Browse the archive ({GALLERY_ITEMS.length}) <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <div className="ap-marquee">
          {[0, 1].map((copy) => (
            <div className="ap-marquee-track" key={copy} aria-hidden={copy === 1 || undefined}>
              {ARCHIVE_ITEMS.map((item) => (
                <a href="/graphics" key={item.src} tabIndex={copy === 1 ? -1 : undefined}>
                  <img src={item.src} alt={copy === 1 ? '' : item.title} loading="lazy" decoding="async" />
                  <span>{item.tag}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </section>

      <div className="ap-main">
        <ContributionCalendar />
      </div>

      <section className="ap-cta" aria-labelledby="cta-title">
        <div className="ap-cta-top">
          <p>Have something in mind?</p>
          <span><i aria-hidden="true" /> Available for select freelance work</span>
        </div>
        <a href="/contact" className="ap-cta-link" id="cta-title">
          Let’s make<br /><em>it real.</em><ArrowUpRight aria-hidden="true" />
        </a>
        <div className="ap-cta-bottom">
          <img src="/images/reigne-2.webp" alt="" width="48" height="48" loading="lazy" decoding="async" />
          <span>Based in the Philippines · Working worldwide</span>
          <a href="mailto:elijareigne@gmail.com">elijareigne@gmail.com <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </section>

      <SiteFooter wordmarkHref="/" />
    </div>
  )
}
