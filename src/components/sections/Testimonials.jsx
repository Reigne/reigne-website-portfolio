import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Avatar from 'boring-avatars'
import SectionHeader from '../ui/SectionHeader'
import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)
  const [isHovered, setIsHovered] = useState(false)

  // Determine number of visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1) // Mobile
      } else if (window.innerWidth < 960) {
        setVisibleCards(2) // Tablet
      } else {
        setVisibleCards(3) // Desktop
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(testimonials.length - visibleCards, 0)
  const safeIndex = Math.min(index, maxIndex)

  const handleNext = () => {
    setIndex((prev) => {
      if (prev >= maxIndex) return 0 // Loop back to start
      return prev + 1
    })
  }

  const handlePrev = () => {
    setIndex((prev) => {
      if (prev <= 0) return maxIndex >= 0 ? maxIndex : 0 // Loop to end
      return prev - 1
    })
  }

  // Smooth autoplay rotation
  useEffect(() => {
    if (isHovered) return
    const autoplayTimer = setInterval(() => {
      setIndex((prev) => {
        if (prev >= maxIndex) return 0
        return prev + 1
      })
    }, 6000)
    return () => clearInterval(autoplayTimer)
  }, [isHovered, maxIndex])

  // Universal Grid-Gap Translation Formula
  const xOffset = `calc(${safeIndex * -100}% / ${visibleCards} - ${(safeIndex * 14) / visibleCards}px)`

  return (
    <section className="wrap bay" id="testimonials">
      <SectionHeader
        eyebrow="Word From The Room"
        title={<>What people say after <span className="accent">working</span> with me.</>}
      />

      <div 
        className="test-carousel-container multi"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="carousel-arrow-controls">
          <button 
            className="carousel-arrow" 
            onClick={handlePrev} 
            aria-label="Previous Testimonials"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="carousel-arrow" 
            onClick={handleNext} 
            aria-label="Next Testimonials"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Track Viewport Frame */}
        <div className="test-carousel-track-viewport">
          <motion.div 
            className="test-carousel-track"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(e, info) => {
              const swipeThreshold = 50
              const swipe = info.offset.x
              if (swipe < -swipeThreshold) {
                // Dragged left -> go next
                setIndex((prev) => {
                  if (prev >= maxIndex) return prev // Snap back if we are at the end
                  return prev + 1
                })
              } else if (swipe > swipeThreshold) {
                // Dragged right -> go prev
                setIndex((prev) => {
                  if (prev <= 0) return prev // Snap back if we are at the start
                  return prev - 1
                })
              }
            }}
            animate={{ x: xOffset }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            {testimonials.map((t) => (
              <article key={t.id} className="test test-carousel-card">
                {/* Background ambient quotation mark */}
                <span className="test-bg-quote">&rdquo;</span>

                <div className="test-stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div>
                <p className="test-quote">{t.quote}</p>
                
                <div className="test-author">
                  <div className="test-avatar">
                    <Avatar
                      size={38}
                      name={t.name}
                      variant="beam"
                      colors={['#ff7a2a', '#ffae5c', '#ff007f', '#00f0ff', '#b388ff']}
                    />
                  </div>
                  <div>
                    <p className="test-name">{t.name}</p>
                    <p className="test-role">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        {/* Carousel Controls Deck */}
        <div className="carousel-controls">
          <div className="carousel-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === safeIndex ? 'active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
