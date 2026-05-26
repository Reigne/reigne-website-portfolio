import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import { GALLERY_ITEMS, DEFAULT_COUNT } from '../../data/gallery'

const LOAD_MORE = 10
const ROW_HEIGHT = 320

function getColumnCount() {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth <= 820) return 1
  if (window.innerWidth <= 1080) return 2
  return 3
}

function clampedHeight(count, columnCount) {
  return Math.ceil(count / columnCount) * ROW_HEIGHT
}

function splitIntoColumns(items, columnCount) {
  return Array.from({ length: columnCount }, () => [])
    .map((column, columnIndex) =>
      items.filter((_, itemIndex) => itemIndex % columnCount === columnIndex)
    )
}

const FADE_MASK = 'linear-gradient(to bottom, black 0%, black 55%, transparent 95%)'

export default function Gallery() {
  const [activeCat, setActiveCat] = useState('All')
  const [count, setCount] = useState(DEFAULT_COUNT)
  const [columnCount, setColumnCount] = useState(getColumnCount)
  const [lightboxIndex, setLightboxIndex] = useState(null) // Index of active item in filtered list

  // Automatically extract unique tags from items
  const rawTags = Array.from(new Set(GALLERY_ITEMS.map(item => item.tag)))
  const categories = ['All', ...rawTags]

  // Filter items based on active category
  const filteredItems = GALLERY_ITEMS.filter(item => 
    activeCat === 'All' || item.tag === activeCat
  )

  // Items to show in the grid based on current 'show more' count
  const allShown = count >= filteredItems.length
  const visibleItems = filteredItems.slice(0, count).map((item, index) => ({ item, index }))
  const columnItems = splitIntoColumns(visibleItems, columnCount)

  const showMore = () => setCount(prev => Math.min(prev + LOAD_MORE, filteredItems.length))
  const showLess = () => setCount(DEFAULT_COUNT)

  // Reset count when category changes
  useEffect(() => {
    setCount(DEFAULT_COUNT)
  }, [activeCat])

  useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount())

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Keydown event listeners for Lightbox navigation
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev + 1) % filteredItems.length)
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, filteredItems])

  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setLightboxIndex(prev => (prev + 1) % filteredItems.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setLightboxIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  return (
    <section className="wrap bay" id="design">
      <SectionHeader
        eyebrow="Graphic Design"
        title={<>Visuals that <span className="accent">speak.</span></>}
        copy="Brand identities, social kits, posters, and visual systems — click any card to inspect in full resolution."
      />

      {/* Category selection tabs */}
      <div className="gallery-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`gallery-tab-btn ${activeCat === cat ? 'active' : ''}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gallery-wrap">
        <motion.div
          style={{
            overflow: 'hidden',
            maskImage: allShown ? 'none' : FADE_MASK,
            WebkitMaskImage: allShown ? 'none' : FADE_MASK,
          }}
          animate={{ maxHeight: allShown ? 99999 : clampedHeight(count, columnCount) }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          layout
        >
          <motion.div
            className="gallery-masonry"
            layout="position"
            style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
          >
            <AnimatePresence mode="popLayout">
              {columnItems.map((column, columnIndex) => (
                <motion.div
                  key={`gallery-column-${columnIndex}`}
                  className="gallery-column"
                  layout="position"
                >
                  {column.map(({ item, index }) => (
                    <motion.div
                      key={item.src}
                      className="gallery-item"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
                      onClick={() => openLightbox(index)}
                      layout
                      transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                    >
                      <div className="gi-thumb">
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </div>
                      <div className="gi-overlay">
                        <div className="gi-tag">{item.tag}</div>
                        <div className="gi-title">{item.title}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Load More Button */}
        {filteredItems.length > DEFAULT_COUNT && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
            <AnimatePresence mode="wait">
              {!allShown ? (
                <motion.button
                  key="more"
                  className="gallery-show-more"
                  onClick={showMore}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.25 }}
                >
                  <span>Show more work</span>
                  <svg className="gsm-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              ) : (
                <motion.button
                  key="less"
                  className="gallery-show-more"
                  onClick={showLess}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.25 }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ rotate: '180deg' }}>
                    <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Show less</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Lightbox full screen modal overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="gallery-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            transition={{ duration: 0.25 }}
          >
            {/* Main Lightbox Frame */}
            <motion.div
              className="lightbox-window"
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="lightbox-header">
                <div className="lh-left">
                  <span className="lh-badge">{filteredItems[lightboxIndex].tag}</span>
                  <span className="lh-divider">·</span>
                  <span className="lh-title">{filteredItems[lightboxIndex].title}</span>
                </div>
                <button className="lh-close-btn" onClick={closeLightbox}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Viewport Frame with interactive arrows */}
              <div className="lightbox-viewport">
                <button className="lightbox-arrow prev" onClick={prevImage}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>

                <div className="lightbox-img-wrap">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={filteredItems[lightboxIndex].src}
                      src={filteredItems[lightboxIndex].src}
                      alt={filteredItems[lightboxIndex].title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="lightbox-image"
                    />
                  </AnimatePresence>
                </div>

                <button className="lightbox-arrow next" onClick={nextImage}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>

              {/* Footer */}
              <div className="lightbox-footer">
                <span className="lf-info">Image {lightboxIndex + 1} of {filteredItems.length}</span>
                <span className="lf-nav-hint">Use ◄ / ► arrow keys to navigate · Esc to exit</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
