import { useLocation } from 'react-router-dom'

export default function Footer() {
  const { pathname } = useLocation()
  const isContactRoute = pathname === '/contact'

  return (
    <footer className={isContactRoute ? 'footer-contact' : undefined}>
      <div className="wrap foot">
        <div>© 2026 Elija Reigne · Built from scratch in PH</div>
        <div>v2.0 · last shipped: today</div>
      </div>
      {isContactRoute && (
        <div className="footer-wordmark-wrap" aria-hidden="true">
          <div className="outro-bg-text footer-wordmark">REIGNE</div>
        </div>
      )}
    </footer>
  )
}
