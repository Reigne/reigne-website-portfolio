import { useEffect, useRef } from 'react'
import Hero from '../components/sections/Hero'
import Identity from '../components/sections/Identity'
import Projects from '../components/sections/Projects'
import Results from '../components/sections/Results'
import Process from '../components/sections/Process'
import Stack from '../components/sections/Stack'
import Creative from '../components/sections/Creative'
import Gallery from '../components/sections/Gallery'
import Timeline from '../components/sections/Timeline'
import Testimonials from '../components/sections/Testimonials'
import CurrentlyBuilding from '../components/sections/CurrentlyBuilding'
import FAQ from '../components/sections/FAQ'
import FinalCTA from '../components/sections/FinalCTA'

export default function Home() {
  const glowBandRef = useRef(null)
  const glowPositionRef = useRef({ x: 50, y: 20 })
  const glowTargetRef = useRef({ x: 50, y: 20 })
  const glowActiveRef = useRef(false)
  const glowFrameRef = useRef(null)

  const animateGlow = () => {
    const band = glowBandRef.current
    if (!band) {
      glowFrameRef.current = null
      return
    }

    const current = glowPositionRef.current
    const target = glowTargetRef.current

    current.x += (target.x - current.x) * 0.085
    current.y += (target.y - current.y) * 0.085

    band.style.setProperty('--glow-x', `${current.x}%`)
    band.style.setProperty('--glow-y', `${current.y}%`)

    const dx = Math.abs(target.x - current.x)
    const dy = Math.abs(target.y - current.y)
    const shouldStop = !glowActiveRef.current && dx < 0.05 && dy < 0.05

    if (shouldStop) {
      glowFrameRef.current = null
      return
    }

    glowFrameRef.current = requestAnimationFrame(animateGlow)
  }

  const ensureGlowAnimation = () => {
    if (glowFrameRef.current !== null) return
    glowFrameRef.current = requestAnimationFrame(animateGlow)
  }

  const handleGlowMove = (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return

    const band = glowBandRef.current
    if (!band) return

    const rect = band.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    glowTargetRef.current = { x, y }
    glowActiveRef.current = true
    band.style.setProperty('--glow-opacity', '1')
    ensureGlowAnimation()
  }

  const handleGlowLeave = () => {
    const band = glowBandRef.current
    if (!band) return

    glowActiveRef.current = false
    band.style.setProperty('--glow-opacity', '0')
  }

  useEffect(() => {
    return () => {
      if (glowFrameRef.current !== null) {
        cancelAnimationFrame(glowFrameRef.current)
      }
    }
  }, [])

  return (
    <>
      <Hero />
      <div
        ref={glowBandRef}
        className="cursor-glow-band"
        onPointerMove={handleGlowMove}
        onPointerLeave={handleGlowLeave}
      >
        <Identity />
        <Projects />
        <Results />
        <Process />
        <Stack />
        <Creative />
        <Gallery />
        <Timeline />
        <Testimonials />
        <CurrentlyBuilding />
        <FAQ />
      </div>
      <FinalCTA />
    </>
  )
}
