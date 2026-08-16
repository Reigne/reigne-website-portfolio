import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function GraphicLightbox({ item, onClose }) {
  const closeButtonRef = useRef(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!item) return undefined

    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    document.body.style.overflow = 'hidden'

    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onCloseRef.current()
      if (event.key === 'Tab') {
        event.preventDefault()
        closeButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
      previousFocus?.focus?.()
    }
  }, [item])

  if (!item) return null

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button ref={closeButtonRef} type="button" aria-label="Close image" onClick={onClose}>
        <X />
      </button>
      <figure>
        <img src={item.src} alt={item.title} decoding="async" />
        <figcaption><span>{item.tag}</span>{item.title}</figcaption>
      </figure>
    </div>
  )
}
