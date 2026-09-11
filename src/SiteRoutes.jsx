import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'
import Work from './pages/Work'
import Graphics from './pages/Graphics'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function SiteRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/graphics" element={<Graphics />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/work/:projectId" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}
