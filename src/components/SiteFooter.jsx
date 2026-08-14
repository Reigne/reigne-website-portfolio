import { ArrowUpRight } from 'lucide-react'

export default function SiteFooter({ returnHref = '#top', returnLabel = 'Back to top', wordmarkHref = '#top' }) {
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div className="footer-blurb">
          <span className="footer-label">Independent developer</span>
          <p>Websites, products, and digital systems made with clarity.</p>
        </div>

        <div className="footer-contact">
          <span className="footer-label">New business</span>
          <a href="mailto:elijareigne@gmail.com">
            elijareigne@gmail.com <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <nav className="footer-socials" aria-label="Social links">
          <span className="footer-label">Elsewhere</span>
          <a href="https://github.com/Reigne" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/elijareigne/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://x.com/codebyreigne" target="_blank" rel="noreferrer">X / Twitter</a>
        </nav>

        <a className="footer-return" href={returnHref}>
          {returnLabel} <span aria-hidden="true">&#8593;</span>
        </a>
      </div>

      <div className="footer-legal">
        <span>&copy; 2026 Elija Reigne</span>
        <span>Philippines <i aria-hidden="true">&middot;</i> Working worldwide</span>
      </div>

      <a className="footer-wordmark" href={wordmarkHref} aria-label="Reigne — return home">
        Reigne
      </a>
    </footer>
  )
}
