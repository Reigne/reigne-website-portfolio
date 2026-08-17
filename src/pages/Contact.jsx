import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, Send } from 'lucide-react'
import { createAsciiField } from '../utils/ascii'
import SiteFooter from '../components/SiteFooter'
import Seo from '../components/Seo'

const CONTACT_ASCII = createAsciiField(260, 480, 761923)
const CONTACT_WEBHOOK_URL = import.meta.env.VITE_CONTACT_WEBHOOK_URL

const projectTypes = [
  'Website',
  'Web application',
  'Automation system',
  'Design and development',
  'Something else',
]

function ProjectTypeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const optionRefs = useRef([])

  const openSelect = (index = projectTypes.indexOf(value)) => {
    setActiveIndex(index >= 0 ? index : 0)
    setOpen(true)
  }

  const closeSelect = (returnFocus = false) => {
    setOpen(false)
    if (returnFocus) window.requestAnimationFrame(() => triggerRef.current?.focus())
  }

  const selectType = (type) => {
    onChange(type)
    closeSelect(true)
  }

  useEffect(() => {
    if (!open) return undefined

    const focusFrame = window.requestAnimationFrame(() => optionRefs.current[activeIndex]?.focus())
    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) closeSelect()
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('pointerdown', closeOnOutsideClick)
    }
  }, [activeIndex, open])

  const handleTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      openSelect(event.key === 'ArrowUp' ? projectTypes.length - 1 : projectTypes.indexOf(value))
    }
  }

  const handleOptionKeyDown = (event, index) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const direction = event.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((index + direction + projectTypes.length) % projectTypes.length)
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      setActiveIndex(event.key === 'Home' ? 0 : projectTypes.length - 1)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectType(projectTypes[index])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      closeSelect(true)
    } else if (event.key === 'Tab') {
      closeSelect()
    }
  }

  return (
    <div className="project-type-field">
      <span className="form-field-label" id="project-type-label">What are you looking to build?</span>
      <div className={`custom-select${open ? ' is-open' : ''}`} ref={rootRef}>
        <input type="hidden" name="type" value={value} />
        <button
          className="custom-select-trigger"
          type="button"
          ref={triggerRef}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby="project-type-label project-type-value"
          onClick={() => (open ? closeSelect() : openSelect())}
          onKeyDown={handleTriggerKeyDown}
        >
          <span id="project-type-value" className={value ? '' : 'is-placeholder'}>
            {value || 'Select a project type'}
          </span>
          <ChevronDown aria-hidden="true" />
        </button>

        {open && (
          <div className="custom-select-menu" role="listbox" aria-labelledby="project-type-label">
            {projectTypes.map((type, index) => (
              <button
                className={`custom-select-option${activeIndex === index ? ' is-highlighted' : ''}`}
                type="button"
                role="option"
                aria-selected={value === type}
                key={type}
                ref={(element) => { optionRefs.current[index] = element }}
                onFocus={() => setActiveIndex(index)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
                onClick={() => selectType(type)}
              >
                <span>{type}</span>
                {value === type && <Check aria-hidden="true" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!CONTACT_WEBHOOK_URL) {
      const subject = encodeURIComponent(`${form.type || 'Project'} inquiry from ${form.name}`)
      const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`)
      window.location.href = `mailto:elijareigne@gmail.com?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'reigne-portfolio-contact',
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error('Your message could not be sent.')
      setStatus('sent')
      setForm({ name: '', email: '', type: '', message: '' })
    } catch (submitError) {
      setStatus('idle')
      setError(submitError.message || 'Your message could not be sent.')
    }
  }

  return (
    <div className="contact-page">
      <Seo
        title="Start a Project — Elija Reigne"
        description="Tell Elija Reigne about your website, web application, automation system, or design and development project."
        path="/contact"
      />
      <pre className="ascii-field contact-ascii" aria-hidden="true">{CONTACT_ASCII}</pre>

      <header className="floating-header contact-header">
        <a href="/" className="pill-brand">Reigne</a>
        <a href="/#work" className="contact-back"><ArrowLeft /> Back to work</a>
        <a href="mailto:elijareigne@gmail.com" className="pill-contact">
          Direct email <ArrowUpRight />
        </a>
      </header>

      <main className="contact-main">
        <section className="contact-intro">
          <p>Start a project · Say hello</p>
          <h1>Let&apos;s make something <em>worth showing.</em></h1>
          <div className="contact-intro-foot">
            <p>Tell me what you&apos;re building, where you are in the process, and what a successful result looks like.</p>
            <span><i /> Available for select projects</span>
          </div>
        </section>

        <section className="contact-content" aria-label="Project inquiry">
          <form className="inquiry-form" onSubmit={handleSubmit}>
            <div className="form-heading">
              <span>Project inquiry</span>
              <span>Usually replies within 24 hours</span>
            </div>

            <div className="form-row">
              <label>
                <span>Your name</span>
                <input name="name" type="text" value={form.name} onChange={updateField('name')} placeholder="Name" required />
              </label>
              <label>
                <span>Email address</span>
                <input name="email" type="email" value={form.email} onChange={updateField('email')} placeholder="you@example.com" required />
              </label>
            </div>

            <ProjectTypeSelect
              value={form.type}
              onChange={(type) => setForm((current) => ({ ...current, type }))}
            />

            <label>
              <span>Tell me about the project</span>
              <textarea
                name="message"
                value={form.message}
                onChange={updateField('message')}
                placeholder="The idea, goals, timeline, and anything else that would be useful to know."
                rows={6}
                required
              />
            </label>

            {error && <p className="form-error" role="alert">{error}</p>}

            {status === 'sent' ? (
              <div className="form-success" role="status">
                Message received. I&apos;ll be in touch soon.
              </div>
            ) : (
              <button className="submit-inquiry" type="submit" disabled={status === 'sending'}>
                <span>{status === 'sending' ? 'Sending…' : 'Send inquiry'}</span>
                <Send />
              </button>
            )}
          </form>

          <aside className="contact-details">
            <div>
              <p>Prefer email?</p>
              <a href="mailto:elijareigne@gmail.com">elijareigne@gmail.com <ArrowUpRight /></a>
            </div>
            <div>
              <p>Elsewhere</p>
              <a href="https://www.linkedin.com/in/elijareigne/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a>
              <a href="https://github.com/Reigne" target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a>
              <a href="https://x.com/codebyreigne" target="_blank" rel="noreferrer">X / Twitter <ArrowUpRight /></a>
            </div>
            <div className="contact-note">
              Based in the Philippines and working with clients worldwide.
            </div>
          </aside>
        </section>
      </main>

      <SiteFooter returnHref="/" returnLabel="Return home" wordmarkHref="/" />
    </div>
  )
}
