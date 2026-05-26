import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import BackgroundLayers from './components/layout/BackgroundLayers'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingCTA from './components/ui/FloatingCTA'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <BackgroundLayers />
      <ScrollToTop />
      <AppShell />
      <Analytics />
    </BrowserRouter>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function AppShell() {
  const { pathname } = useLocation()
  const isContactRoute = pathname === '/contact'

  return (
    <>
      <main className={isContactRoute ? 'contact-route' : undefined}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {!isContactRoute && <FloatingCTA />}
    </>
  )
}
