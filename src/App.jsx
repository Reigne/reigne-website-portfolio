import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Home from './pages/Home'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      autoToggle: true,
      anchors: {
        offset: -86,
        duration: 1.05,
      },
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.88,
      stopInertiaOnNavigate: true,
    })

    return () => lenis.destroy()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/work/:projectId" element={<ProjectDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
