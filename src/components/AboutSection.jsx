import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import { GALLERY_ITEMS } from '../data/gallery'

const STATEMENT = [
  { text: 'I turn ideas into websites that feel' },
  { text: 'clear, useful, and unmistakably yours.', em: true },
]

const DISCIPLINES = [
  { title: 'Design', detail: 'Interfaces, identity, and visual systems in Figma & Photoshop.' },
  { title: 'Development', detail: 'React, Node.js, and Supabase builds made for production.' },
  { title: 'Automation', detail: 'n8n, webhooks, and AI workflows that remove busywork.' },
]

const STATS = [
  { value: projects.length, label: 'Websites shipped' },
  { value: GALLERY_ITEMS.length, label: 'Graphic pieces' },
  { value: 2024, label: 'Building since', plain: true },
]

const shouldAnimate = () => typeof window !== 'undefined'
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const clamp = (value) => Math.min(1, Math.max(0, value))

const formatManilaTime = () => new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Manila',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
}).format(new Date())

function CountUp({ value, plain, active }) {
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!active || plain) return undefined

    const start = performance.now()
    const duration = 1400
    let frameId = window.requestAnimationFrame(function step(now) {
      const progress = clamp((now - start) / duration)
      setDisplay(Math.round(value * (1 - (1 - progress) ** 4)))
      if (progress < 1) frameId = window.requestAnimationFrame(step)
    })
    return () => window.cancelAnimationFrame(frameId)
  }, [active, plain, value])

  return <>{String(display).padStart(2, '0')}</>
}

export default function AboutSection() {
  const sectionRef = useRef(null)
  const statementRef = useRef(null)
  const portraitRef = useRef(null)
  const [armed] = useState(shouldAnimate)
  const [visible, setVisible] = useState(() => !shouldAnimate())
  const [localTime, setLocalTime] = useState(null)

  useEffect(() => {
    const updateTime = () => setLocalTime(formatManilaTime())
    updateTime()
    const timer = window.setInterval(updateTime, 15000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!armed || !section) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setVisible(true)
      observer.disconnect()
    }, { rootMargin: '0px 0px -18% 0px' })
    observer.observe(section)
    return () => observer.disconnect()
  }, [armed])

  useEffect(() => {
    if (!armed) return undefined

    const words = [...statementRef.current.querySelectorAll('.about-word')]
    const portrait = portraitRef.current
    let frameId = 0

    const update = () => {
      frameId = 0
      const viewport = window.innerHeight

      // Words fill in as the statement travels from the lower edge to the upper third.
      const statement = statementRef.current.getBoundingClientRect()
      const reading = clamp((viewport * 0.9 - statement.top) / (viewport * 0.55 + statement.height * 0.6))
      words.forEach((word, index) => {
        const wordProgress = clamp(reading * words.length - index)
        word.style.setProperty('--word-progress', wordProgress.toFixed(3))
      })

      if (portrait) {
        const bounds = portrait.getBoundingClientRect()
        const travel = clamp((viewport - bounds.top) / (viewport + bounds.height))
        portrait.style.setProperty('--portrait-shift', `${((travel - 0.5) * -14).toFixed(2)}%`)
      }
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
  const sectionClass = `about-section${armed ? ' is-armed' : ''}${visible ? ' is-visible' : ''}`

  return (
    <section className={sectionClass} id="about" ref={sectionRef} aria-labelledby="about-statement">
      <div className="about-topline">
        <p className="section-number">01 / About</p>
        <span className="about-locale">
          <i aria-hidden="true" />
          Philippines · GMT+8
          {localTime && <> · <time>{localTime}</time> local</>}
        </span>
      </div>

      <h2 className="about-statement" id="about-statement" ref={statementRef}>
        {STATEMENT.map((segment) => {
          const words = segment.text.split(' ').map((word) => (
            <span className="about-word" key={`${word}-${wordIndex}`} style={{ '--word-index': wordIndex++ }}>
              {word}{' '}
            </span>
          ))
          return segment.em ? <em key={segment.text}>{words}</em> : words
        })}
      </h2>

      <div className="about-grid">
        <figure className="about-card-portrait" ref={portraitRef}>
          <div className="about-card-portrait-frame">
            <img
              src="/images/reigne-2.webp"
              srcSet="/images/reigne-2.webp 600w, /images/reigne-2-large.webp 1198w"
              sizes="(max-width: 700px) calc(100vw - 32px), 400px"
              alt="Elija Reigne"
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption>
            <span>Elija Reigne</span>
            <span>Full-stack developer</span>
          </figcaption>
        </figure>

        <div className="about-story">
          <p>I’m Elija Reigne, a full-stack developer based in the Philippines. I work across design and development, from the first layout to the final production system.</p>
          <p>React, Node.js, Supabase, automation, Figma, and Photoshop are part of the toolkit—not the headline. The work is.</p>
          <a href="/about" className="about-more">
            <span>More about me</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <ol className="about-disciplines" aria-label="What I do">
          {DISCIPLINES.map((discipline, index) => (
            <li key={discipline.title} style={{ '--item-index': index }}>
              <span className="about-discipline-number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{discipline.title}</strong>
                <p>{discipline.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <dl className="about-stats">
        {STATS.map((stat, index) => (
          <div key={stat.label} style={{ '--item-index': index }}>
            <dt>{stat.label}</dt>
            <dd>
              <CountUp value={stat.value} plain={stat.plain} active={visible} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
