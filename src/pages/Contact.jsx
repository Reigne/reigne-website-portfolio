import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, Send } from 'lucide-react'
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

            <label>
              <span>What are you looking to build?</span>
              <select name="type" value={form.type} onChange={updateField('type')}>
                <option value="">Select a project type</option>
                {projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>

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
