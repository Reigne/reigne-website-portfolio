import { Fragment, useEffect, useRef } from 'react'

const WORD = 'REIGNE'
const SCRAMBLE_CHARACTERS = '@#S08Xx+=-;:.'
const COLUMN_COUNT = 5

// Timeline (ms) — keep in sync with the entrance delays in globals.css.
const LETTER_LOCK_START = 420
const LETTER_LOCK_STEP = 85
const COUNTER_START = 80
const COUNTER_END = 1680
const FLIGHT_START = 1850
const FLIGHT_DURATION = 1000
const TICK_INTERVAL = 32
export const INTRO_DURATION = 3100

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2)

// The hero title lines are still mid-rise when the flight starts, so measure
// where the inline portrait will rest once its line has settled.
const getHeroPortraitRestingRect = () => {
  const portrait = document.querySelector('.hero-inline-portrait')
  if (!portrait) return null

  const rect = portrait.getBoundingClientRect()
  const lineContent = portrait.closest('.hero-title-line > span')
  const offset = lineContent
    ? lineContent.getBoundingClientRect().top - lineContent.parentElement.getBoundingClientRect().top
    : 0

  return { left: rect.left, top: rect.top - offset, width: rect.width }
}

export default function IntroSequence() {
  const glyphRefs = useRef([])
  const counterRef = useRef(null)
  const portraitRef = useRef(null)
  const screenRef = useRef(null)

  useEffect(() => {
    // Read time from the columns' CSS animation so the scripted parts stay
    // locked to the CSS choreography even when the main thread is busy.
    const clock = screenRef.current?.querySelector('.entrance-columns > span')?.getAnimations()[0]
    const start = performance.now()
    const getElapsed = () => clock?.currentTime ?? performance.now() - start

    const tick = () => {
      const elapsed = getElapsed()

      glyphRefs.current.forEach((glyph, index) => {
        if (!glyph) return
        const locked = elapsed >= LETTER_LOCK_START + index * LETTER_LOCK_STEP
        glyph.textContent = locked
          ? WORD[index]
          : SCRAMBLE_CHARACTERS[Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)]
      })

      const progress = easeInOutCubic(
        Math.min(1, Math.max(0, (elapsed - COUNTER_START) / (COUNTER_END - COUNTER_START))),
      )
      if (counterRef.current) counterRef.current.textContent = String(Math.round(progress * 100)).padStart(3, '0')
      if (elapsed >= COUNTER_END) window.clearInterval(tickTimer)
    }
    const tickTimer = window.setInterval(tick, TICK_INTERVAL)
    tick()

    const flightTimer = window.setTimeout(() => {
      const portrait = portraitRef.current
      const target = getHeroPortraitRestingRect()
      if (!portrait || !target) return

      const from = portrait.getBoundingClientRect()
      const scale = target.width / from.width
      const flight = portrait.animate(
        [
          { transform: 'translate(0, 0) scale(1)' },
          { transform: `translate(${target.left - from.left}px, ${target.top - from.top}px) scale(${scale})` },
        ],
        { duration: FLIGHT_DURATION, easing: 'cubic-bezier(.7, 0, .2, 1)', fill: 'forwards' },
      )
      flight.currentTime = Math.max(0, getElapsed() - FLIGHT_START)
    }, Math.max(0, FLIGHT_START - getElapsed()))

    return () => {
      window.clearInterval(tickTimer)
      window.clearTimeout(flightTimer)
    }
  }, [])

  return (
    <div className="entrance-screen" aria-hidden="true" ref={screenRef}>
      <div className="entrance-columns">
        {Array.from({ length: COLUMN_COUNT }, (_, index) => (
          <span key={index} style={{ '--column-order': Math.abs(index - Math.floor(COLUMN_COUNT / 2)) }} />
        ))}
      </div>

      <div className="entrance-content">
        <div className="entrance-top">
          <span>Elija Reigne</span>
          <span>Design-led development</span>
          <span>Portfolio ©2026</span>
        </div>

        <div className="entrance-word">
          {WORD.split('').map((letter, index) => (
            <Fragment key={`${letter}-${index}`}>
              {index === 3 && (
                <span className="entrance-portrait" ref={portraitRef}>
                  <span className="entrance-portrait-disc">
                    <img src="/images/reigne-2.webp" alt="" decoding="async" />
                  </span>
                </span>
              )}
              <span className="entrance-cell" style={{ '--letter-index': index }}>
                <span className="entrance-letter">
                  <span className="entrance-ghost">{letter}</span>
                  <span className="entrance-glyph" ref={(node) => { glyphRefs.current[index] = node }}>
                    {SCRAMBLE_CHARACTERS[index]}
                  </span>
                </span>
              </span>
            </Fragment>
          ))}
        </div>

        <div className="entrance-bottom">
          <span className="entrance-status">Loading selected work</span>
          <span className="entrance-counter">
            <span ref={counterRef}>000</span><small>%</small>
          </span>
          <span className="entrance-progress"><i /></span>
        </div>
      </div>
    </div>
  )
}
