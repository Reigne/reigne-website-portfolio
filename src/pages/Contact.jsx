import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check, Send } from 'lucide-react'
import { createAsciiField } from '../utils/ascii'
import SiteFooter from '../components/SiteFooter'
import Seo from '../components/Seo'
import './Contact.css'

const CONTACT_ASCII = createAsciiField(260, 480, 761923)
const CONTACT_WEBHOOK_URL = 'https://gatewayai.app.n8n.cloud/webhook/b69ea37c-987e-468e-90a9-adb47c59ed1a'

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

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return
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

      <main className="contact-main contact-studio">
        <section className="contact-intro" aria-labelledby="contact-title">
          <p>Have something in mind?</p>
          <h1 id="contact-title">Good work<br />starts with<br /><em>a conversation.</em></h1>
          <p className="contact-lead">A new website, a better product, or an idea that needs a little direction. Tell me what you&apos;re thinking.</p>
          <div className="contact-person">
            <img src="/images/reigne-2.webp" alt="Elija Reigne" width="56" height="56" />
            <div><strong>Elija Reigne</strong><span>Designer &amp; full-stack developer</span></div>
          </div>
          <div className="contact-direct">
            <span>Prefer a simple hello?</span>
            <a href="mailto:elijareigne@gmail.com">elijareigne@gmail.com <ArrowUpRight aria-hidden="true" /></a>
            <p>Based in the Philippines. Working worldwide.</p>
          </div>
          <nav className="contact-social-links" aria-label="Social profiles">
            <a href="https://www.linkedin.com/in/elijareigne/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight aria-hidden="true" /></a>
            <a href="https://github.com/Reigne" target="_blank" rel="noreferrer">GitHub <ArrowUpRight aria-hidden="true" /></a>
          </nav>
        </section>

        <section className="contact-form-panel" aria-labelledby="inquiry-title">
          <div className="contact-panel-heading"><span>01 / Your next project</span><span>Let&apos;s hear it <ArrowUpRight aria-hidden="true" /></span></div>
          <h2 id="inquiry-title">What can I help you build?</h2>
          <p className="contact-panel-note">A rough idea is a great place to start. <span>* Required fields</span></p>
          {status === 'sent' ? (
            <div className="contact-sent" role="status">
              <span className="contact-sent-icon"><Check aria-hidden="true" /></span>
              <h3>You&apos;re in my inbox.</h3>
              <p>Thanks for sharing your idea. I&apos;ll read through the details and get back to you by email.</p>
              <button type="button" onClick={() => setStatus('idle')}>Send another message <ArrowUpRight aria-hidden="true" /></button>
            </div>
          ) : (
            <form className="inquiry-form" onSubmit={handleSubmit} aria-busy={status === 'sending'}>
              <fieldset className="contact-form-fields" disabled={status === 'sending'}>
                <div className="form-row">
                  <label><span>Your name *</span><input name="name" autoComplete="name" type="text" value={form.name} onChange={updateField('name')} placeholder="Alex Morgan" required /></label>
                  <label><span>Email address *</span><input name="email" autoComplete="email" type="email" value={form.email} onChange={updateField('email')} placeholder="you@example.com" required /></label>
                </div>
                <fieldset className="contact-project-types">
                  <legend>I&apos;m interested in <span>(optional)</span></legend>
                  <div>{projectTypes.map(type => (
                    <label key={type} className="contact-type-chip">
                      <input type="radio" name="type" value={type} checked={form.type === type} onChange={updateField('type')} />
                      <span>{type}</span>
                    </label>
                  ))}</div>
                </fieldset>
                <label><span>A little about your project *</span><textarea name="message" value={form.message} onChange={updateField('message')} placeholder="What are you building? Share your goals, a timeline, or a link to something you love." rows={5} required /></label>
                {error && <p className="form-error" role="alert">{error} Please try again or <a href="mailto:elijareigne@gmail.com">email me directly</a>.</p>}
                <button className="submit-inquiry" type="submit" disabled={status === 'sending'}><span>{status === 'sending' ? 'Sending?' : 'Let?s start a conversation'}</span><Send aria-hidden="true" /></button>
                <p className="contact-submit-note" role="status">{status === 'sending' ? 'Your message is on its way. Please keep this page open.' : 'Straight to my inbox. I?ll reply to the email you provide.'}</p>
              </fieldset>
            </form>
          )}
        </section>
      </main>

      <SiteFooter returnHref="/" returnLabel="Return home" wordmarkHref="/" />
    </div>
  )
}
