import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function ProjectGrid({ projects, className = '', useProjectIndex = false }) {
  const cursorLabelRef = useRef(null)
  const location = useLocation()
  const returnTo = location.pathname === '/work' ? '/work' : '/#work'

  const moveCursorLabel = (event) => {
    if (event.pointerType !== 'mouse' || !cursorLabelRef.current) return

    const label = cursorLabelRef.current
    const x = Math.min(event.clientX + 14, window.innerWidth - label.offsetWidth - 12)
    const y = Math.min(event.clientY + 14, window.innerHeight - label.offsetHeight - 12)
    label.style.setProperty('--cursor-x', `${x}px`)
    label.style.setProperty('--cursor-y', `${y}px`)
  }

  const showCursorLabel = (event) => {
    if (event.pointerType !== 'mouse' || !cursorLabelRef.current) return
    moveCursorLabel(event)
    cursorLabelRef.current.dataset.visible = 'true'
  }

  const hideCursorLabel = () => {
    if (cursorLabelRef.current) cursorLabelRef.current.dataset.visible = 'false'
  }

  return (
    <>
      <div className="project-cursor-label" ref={cursorLabelRef} data-visible="false" aria-hidden="true">
        <span>View details</span>
        <i>🔥</i>
      </div>

      <div className={`website-grid${className ? ` ${className}` : ''}`}>
        {projects.map((project, displayIndex) => (
          <article
            className="website-project"
            key={project.id}
            onPointerEnter={showCursorLabel}
            onPointerMove={moveCursorLabel}
            onPointerLeave={hideCursorLabel}
          >
            <div className={`website-preview preview-${project.tone}`}>
              <Link
                className="site-window"
                to={`/work/${project.id}`}
                state={{ from: returnTo }}
                aria-label={`View ${project.name} case study`}
              >
                <div className="window-bar">
                  <div><i /><i /><i /></div>
                  <span>{project.name}</span>
                </div>
                <img src={project.image} alt={`${project.name} website preview`} loading="lazy" decoding="async" />
              </Link>
              {project.url && (
                <a
                  className="project-launch"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${project.name}`}
                >
                  <ArrowUpRight />
                </a>
              )}
            </div>
            <div className="website-caption">
              <div>
                <h2><Link to={`/work/${project.id}`} state={{ from: returnTo }}>{project.name}</Link></h2>
                <p>{project.type}{project.context ? ` · ${project.context}` : ''}</p>
              </div>
              <span>{useProjectIndex ? project.index : String(displayIndex + 1).padStart(2, '0')}</span>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
