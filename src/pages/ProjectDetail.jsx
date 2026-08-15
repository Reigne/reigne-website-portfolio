import { useEffect, useMemo, useRef } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter'
import Seo from '../components/Seo'
import { orderedProjects } from '../data/projects'
import { createAsciiField } from '../utils/ascii'

const PROJECT_ASCII = createAsciiField(760, 480, 635129)

export default function ProjectDetail() {
  const { projectId } = useParams()
  const location = useLocation()
  const carouselRef = useRef(null)
  const scrollPositionRef = useRef(0)
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 })
  const projectIndex = orderedProjects.findIndex((item) => item.id === projectId)
  const project = orderedProjects[projectIndex]

  const gallery = useMemo(() => project?.gallery ?? (project ? [project.image] : []), [project])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const carousel = carouselRef.current
    if (carousel) {
      const track = carousel.firstElementChild
      if (track) track.style.transform = 'none'
      carousel.scrollLeft = 0
      scrollPositionRef.current = 0
    }
  }, [projectId])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel || gallery.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const track = carousel.firstElementChild
    let animationFrame
    let previousTime

    const moveCarousel = (currentTime) => {
      if (previousTime === undefined) previousTime = currentTime
      const elapsed = Math.min(currentTime - previousTime, 100)
      previousTime = currentTime

      if (!dragRef.current.active && !document.hidden) {
        const endPosition = Math.max(0, carousel.scrollWidth - carousel.clientWidth)
        scrollPositionRef.current = Math.min(
          scrollPositionRef.current + elapsed * 0.018,
          endPosition,
        )
        const wholePosition = Math.floor(scrollPositionRef.current)
        const fractionalPosition = scrollPositionRef.current - wholePosition
        carousel.scrollLeft = wholePosition
        track.style.transform = `translate3d(${-fractionalPosition}px, 0, 0)`
      }

      animationFrame = window.requestAnimationFrame(moveCarousel)
    }

    animationFrame = window.requestAnimationFrame(moveCarousel)
    return () => {
      window.cancelAnimationFrame(animationFrame)
      track.style.transform = 'none'
    }
  }, [gallery.length])

  if (!project) return <Navigate to="/" replace />

  const nextProject = orderedProjects[(projectIndex + 1) % orderedProjects.length]
  const returnTo = location.state?.from ?? '/#work'
  const story = project.story ?? {
    eyebrow: project.type,
    title: `A focused digital experience for ${project.name}.`,
    body: project.summary,
    detail: 'The work brings structure, visual clarity, and a responsive interface together in one consistent experience.',
  }
  const deliverables = project.deliverables ?? project.role.split(' · ')

  const projectMeta = [
    { label: 'Role', value: project.role },
    { label: 'Year', value: project.year },
    { label: 'Context', value: project.context ?? project.type },
    { label: 'Built with', value: project.tools },
  ].filter((item) => item.value)

  const prepareManualScroll = () => {
    const carousel = carouselRef.current
    if (!carousel) return

    const track = carousel.firstElementChild
    if (track) track.style.transform = 'none'
    carousel.scrollLeft = Math.round(scrollPositionRef.current)
    scrollPositionRef.current = carousel.scrollLeft
  }

  const startDrag = (event) => {
    prepareManualScroll()
    if (event.pointerType !== 'mouse') return

    const carousel = carouselRef.current
    dragRef.current = { active: true, startX: event.clientX, scrollLeft: carousel.scrollLeft }
    carousel.classList.add('is-dragging')
    carousel.setPointerCapture(event.pointerId)
  }

  const moveDrag = (event) => {
    if (!dragRef.current.active) return
    event.preventDefault()
    const nextPosition = dragRef.current.scrollLeft - (event.clientX - dragRef.current.startX)
    carouselRef.current.scrollLeft = nextPosition
    scrollPositionRef.current = carouselRef.current.scrollLeft
  }

  const endDrag = (event) => {
    const carousel = carouselRef.current
    if (dragRef.current.active) {
      dragRef.current.active = false
      carousel.classList.remove('is-dragging')
      if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId)
    }
    scrollPositionRef.current = carousel.scrollLeft
  }

  const normalizeCarousel = () => {
    const carousel = carouselRef.current
    if (!carousel || dragRef.current.active) return

    if (Math.abs(carousel.scrollLeft - scrollPositionRef.current) > 2) {
      const track = carousel.firstElementChild
      if (track) track.style.transform = 'none'
      scrollPositionRef.current = carousel.scrollLeft
    }
  }

  return (
    <div className="project-page" id="top">
      <Seo
        title={`${project.name} — Website Case Study | Elija Reigne`}
        description={project.summary}
        path={`/work/${project.id}`}
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.name,
          description: project.summary,
          image: new URL(project.image, 'https://www.codebyreigne.com').href,
          dateCreated: project.year,
          creator: {
            '@type': 'Person',
            name: 'Elija Reigne',
            url: 'https://www.codebyreigne.com',
          },
        }}
      />
      <pre className="ascii-field project-ascii" aria-hidden="true">{PROJECT_ASCII}</pre>

      <header className="floating-header project-detail-header">
        <a href="/" className="pill-brand">Reigne</a>
        <Link to={returnTo} className="contact-back"><ArrowLeft /> All websites</Link>
        <a href="/contact" className="pill-contact">Let&apos;s talk <ArrowUpRight /></a>
      </header>

      <main>
        <section className="project-detail-hero">
          <div className="project-detail-heading">
            <div>
              <p>{String(projectIndex + 1).padStart(2, '0')} / {project.type}</p>
              <h1>{project.name}</h1>
            </div>
          </div>

          <div className="project-detail-meta" aria-label="Project information">
            {projectMeta.map((item) => (
              <div className="project-meta-item" key={item.label}>
                <span>{item.label}</span>
                <p>{item.value}</p>
              </div>
            ))}
            {project.url && (
              <a className="project-live-link" href={project.url} target="_blank" rel="noreferrer">
                <span>Website</span>
                <strong>Visit live site <ArrowUpRight /></strong>
              </a>
            )}
          </div>
        </section>

        <section className="project-gallery-section" aria-label={`${project.name} website screens`}>
          <div className="project-gallery-heading">
            <p className="section-number">01 / Screens</p>
            <p><span aria-hidden="true">↔</span> Drag or scroll freely. The gallery moves slowly until the final screen.</p>
          </div>

          <div
            className="project-carousel"
            ref={carouselRef}
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onWheel={prepareManualScroll}
            onScroll={normalizeCarousel}
          >
            <div className="project-carousel-track">
              {gallery.map((image, index) => (
                <figure className="project-screen" key={image}>
                  <img
                    src={image}
                    alt={`${project.name} page view ${index + 1}`}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable="false"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="project-story-section">
          <p className="section-number">02 / About the website</p>
          <div className="project-story-grid">
            <h2>{story.title}</h2>
            <div className="project-story-copy">
              {project.contextNote && (
                <p className="project-context-note">
                  <span>{project.context}</span>
                  {project.contextNote}
                </p>
              )}
              <p className="project-story-lead">{project.summary}</p>
              <p>{story.body}</p>
              <p>{story.detail}</p>
              <div className="project-deliverables">
                {deliverables.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="next-project-section">
          <p>Next website</p>
          <Link to={`/work/${nextProject.id}`} state={{ from: returnTo }}>
            <span>{nextProject.name}</span>
            <ArrowUpRight />
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
