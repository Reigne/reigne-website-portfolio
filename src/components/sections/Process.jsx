import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'

const steps = [
  {
    num: '01',
    phase: 'Research',
    name: 'Competitor & Technology Audit',
    timeline: '3 - 5 Days',
    desc: 'Decoding industry trends, structural bottlenecks, and competitor strategies before laying down a single asset or database schema.',
    deliverables: [
      'Competitive Performance Matrix',
      'Target Persona Flowcharts',
      'Technology & API Feasibility Report'
    ],
    feedback: '“The competitor audit revealed we were losing 20% of traffic on cold load latency alone.”',
    benchMock: 'research'
  },
  {
    num: '02',
    phase: 'Strategy',
    name: 'Data Architecture & Sitemaps',
    timeline: '4 - 7 Days',
    desc: 'Structuring digital routing networks, state machines, and API dispatch nodes around business performance outcomes.',
    deliverables: [
      'Interactive Sitemaps & Page States',
      'User Journey Routing Flowcharts',
      'Relational Database ERD Schema'
    ],
    feedback: '“Elija’s wireflows clarified our webhook triggers before development even started.”',
    benchMock: 'strategy'
  },
  {
    num: '03',
    phase: 'Design',
    name: 'High-Fidelity Interface Systems',
    timeline: '7 - 12 Days',
    desc: 'Crafting premium, responsive interface systems anchored on strict grid systems, vibrant accent glows, and smooth transitions.',
    deliverables: [
      'Interactive Figma Prototyping Systems',
      'Scalable Design System Tokens',
      'Fully Responsive UI Layout Mockups'
    ],
    feedback: '“Absolutely stunning visuals. The dark cyber aesthetics wowed our board instantly.”',
    benchMock: 'design'
  },
  {
    num: '04',
    phase: 'Development',
    name: 'High-Performance Application Building',
    timeline: '10 - 18 Days',
    desc: 'Writing highly performant, type-safe React applications and real-time backend automations that remain stable under peak concurrency.',
    deliverables: [
      'Vite-powered React Single-Page Application',
      'Supabase Real-Time Database Sync',
      'Cron Automation Worker Orchestrations'
    ],
    feedback: '“Cleanest code we’ve inherited. Deployment speeds and logs integration were flawless.”',
    benchMock: 'development'
  },
  {
    num: '05',
    phase: 'Optimization',
    name: 'Post-Launch Tuning & Auditing',
    timeline: 'Ongoing',
    desc: 'Deep-diving into render efficiency loops, indexing database search parameters, and cold outreach deliverability to lock down longevity.',
    deliverables: [
      '100% Core Web Vitals Performance',
      'Real-Time System Log Integrations',
      'Automated Backend Recovery Webhooks'
    ],
    feedback: '“Our Lighthouse speed score hit 100/100 within 2 days of tuning.”',
    benchMock: 'optimization'
  }
]

// Mathematical progress scales mapping to circle centers (10%, 30%, 50%, 70%, 90% timeline widths)
// relative to the backdrop container spanning from 2% to 98% (96% total length).
// Note: Step 1 is set to 0.11 (slightly past center 0.0833) to safely overlap and mask rounding gaps.
const progressLineScales = [0.11, 0.2917, 0.5000, 0.7083, 1.0000]

// ─────────────────────────────────────────────────────────
//  Interactive Visual Benches
// ─────────────────────────────────────────────────────────

// Bench 1: Research matrix audit scans
function ResearchBench() {
  const [activeMetric, setActiveMetric] = useState('performance')

  const metrics = {
    performance: {
      elija: '98%',
      comp: '58%',
      details: 'Optimized bundler scripts, compressed assets, deferred script loading.'
    },
    latency: {
      elija: '45ms',
      comp: '480ms',
      details: 'Global edge network CDN distribution, fast TTFB server responses.'
    },
    seo: {
      elija: '100/100',
      comp: '72/100',
      details: 'Strict semantic HTML hierarchy, customized meta graphs, structural markup.'
    }
  }

  return (
    <div className="bench-wrap research-bench">
      <div className="bench-tabs-small">
        {Object.keys(metrics).map(m => (
          <button
            key={m}
            className={`bts-btn ${activeMetric === m ? 'active' : ''}`}
            onClick={() => setActiveMetric(m)}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="research-chart-area">
        <div className="rc-metric-row">
          <div className="rc-metric-col">
            <span className="rcm-lbl">ELIJA SYSTEM</span>
            <span className="rcm-val green">{metrics[activeMetric].elija}</span>
          </div>
          <div className="rc-metric-col">
            <span className="rcm-lbl">COMPETITOR AVG.</span>
            <span className="rcm-val red">{metrics[activeMetric].comp}</span>
          </div>
        </div>
        <p className="research-metric-detail">{metrics[activeMetric].details}</p>
      </div>
      <div className="bench-radar-decor">
        <span className="blinking-dot orange" />
        <span className="brd-text">Analyzing bottleneck signatures...</span>
      </div>
    </div>
  )
}

// Bench 2: Stateful User Flow Simulator with pulsing wires
function StrategyBench() {
  const [simActive, setSimActive] = useState(true)

  return (
    <div className="bench-wrap strategy-bench">
      <div className="strategy-canvas">
        <div className="canvas-grid-lines" />
        <div className="flow-nodes-wrapper">
          {/* Node 1 */}
          <div className="flow-node">
            <span className="fn-icon">🌍</span>
            <span className="fn-title">Visitor Hit</span>
          </div>

          {/* Glowing Animated Wires */}
          <div className="flow-wire">
            <div className={`fw-pulse ${simActive ? 'animating' : ''}`} />
          </div>

          {/* Node 2 */}
          <div className="flow-node orange-glow">
            <span className="fn-icon">⚡</span>
            <span className="fn-title">n8n Workflow</span>
          </div>

          {/* Glowing Animated Wires */}
          <div className="flow-wire">
            <div className={`fw-pulse ${simActive ? 'animating' : ''}`} />
          </div>

          {/* Node 3 */}
          <div className="flow-node">
            <span className="fn-icon">🛢️</span>
            <span className="fn-title">Supabase DB</span>
          </div>
        </div>
      </div>

      <div className="strategy-actions">
        <button className="bts-btn active" onClick={() => setSimActive(prev => !prev)}>
          {simActive ? '⏹ PAUSE SIMULATION' : '▶ RUN FLOW SIMULATOR'}
        </button>
      </div>
    </div>
  )
}

// Bench 3: Live Custom CSS Design Editor Playground (STUNNING INTERACTIVE CANVAS!)
function DesignBench() {
  const [blur, setBlur] = useState(16)
  const [radius, setRadius] = useState(12)
  const [opacity, setOpacity] = useState(0.3)
  const [glowIntensity, setGlowIntensity] = useState(0.4)
  const [customText, setCustomText] = useState('Dynamic Spec Render')
  const [color, setColor] = useState('#ff7a2a')

  return (
    <div className="bench-wrap design-bench">
      <div className="design-editor-grid">
        {/* Editor Controls */}
        <div className="deg-controls">
          <div className="deg-slider-group">
            <label className="dsg-lbl">Backdrop Blur ({blur}px)</label>
            <input 
              type="range" 
              min="0" 
              max="24" 
              value={blur} 
              onChange={(e) => setBlur(Number(e.target.value))} 
              className="dsg-input"
            />
          </div>

          <div className="deg-slider-group">
            <label className="dsg-lbl">Border Radius ({radius}px)</label>
            <input 
              type="range" 
              min="2" 
              max="24" 
              value={radius} 
              onChange={(e) => setRadius(Number(e.target.value))} 
              className="dsg-input"
            />
          </div>

          <div className="deg-slider-group">
            <label className="dsg-lbl">Glass Opacity ({Math.round(opacity * 100)}%)</label>
            <input 
              type="range" 
              min="0.05" 
              max="0.8" 
              step="0.05"
              value={opacity} 
              onChange={(e) => setOpacity(Number(e.target.value))} 
              className="dsg-input"
            />
          </div>

          <div className="deg-slider-group">
            <label className="dsg-lbl">Glow Intensity ({Math.round(glowIntensity * 100)}%)</label>
            <input 
              type="range" 
              min="0.1" 
              max="1.0" 
              step="0.05"
              value={glowIntensity} 
              onChange={(e) => setGlowIntensity(Number(e.target.value))} 
              className="dsg-input"
            />
          </div>

          <div className="deg-slider-group">
            <label className="dsg-lbl">Card Label Spec</label>
            <input 
              type="text" 
              value={customText} 
              onChange={(e) => setCustomText(e.target.value.slice(0, 24))} 
              placeholder="Enter active spec..."
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--line-2)',
                borderRadius: '6px',
                padding: '6px 10px',
                fontSize: '10.5px',
                color: 'var(--soft)',
                fontFamily: 'var(--font-mono)',
                outline: 'none',
                width: '100%',
                marginTop: '4px'
              }}
            />
          </div>

          <div className="deg-colors" style={{ marginTop: '16px' }}>
            <button className="deg-color-dot" style={{ background: '#ff7a2a', border: color === '#ff7a2a' ? '2px solid #fff' : 'none' }} onClick={() => setColor('#ff7a2a')} />
            <button className="deg-color-dot" style={{ background: '#a855f7', border: color === '#a855f7' ? '2px solid #fff' : 'none' }} onClick={() => setColor('#a855f7')} />
            <button className="deg-color-dot" style={{ background: '#10b981', border: color === '#10b981' ? '2px solid #fff' : 'none' }} onClick={() => setColor('#10b981')} />
          </div>
        </div>

        {/* Live Canvas Active Preview */}
        <div className="deg-preview-pane">
          <div 
            className="live-design-card"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              borderRadius: `${radius}px`,
              borderColor: color,
              background: `rgba(2, 2, 4, ${opacity})`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 16px ${color}20`
            }}
          >
            <div 
              className="ldc-glow-orb" 
              style={{ 
                background: color,
                opacity: glowIntensity,
                filter: `blur(${30 + glowIntensity * 20}px)`
              }} 
            />
            <span className="ldc-pre">Figma Spec Sandbox</span>
            <span className="ldc-text">{customText || 'Dynamic Spec Render'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Bench 4: IDE code-editor simulator with live scrolling compiler logs
function DevelopmentBench() {
  const [logs, setLogs] = useState([
    'Initializing Vite core bundler...',
    'Loading responsive asset pipelines...',
    'Transpiling production modules...',
  ])

  useEffect(() => {
    const logPool = [
      '✓ Vite bundle index optimized successfully (28.4 KB).',
      '✓ Supabase active listener connection established.',
      '✓ n8n API dispatcher webhook listener synced.',
      '✓ Type check constraints passed (0 errors found).',
      'Deploying build artifact to Vercel edge edge network...',
      '✓ Deployment live at reigne.dev/build-v4.0.1.',
    ]

    let currentIdx = 0
    const interval = setInterval(() => {
      if (currentIdx < logPool.length) {
        // SYNCHRONOUSLY capture current string to prevent asynchronous state updates
        // from reading mutated index out-of-bounds.
        const nextLog = logPool[currentIdx]
        setLogs(prev => [...prev, nextLog])
        currentIdx++
      } else {
        clearInterval(interval)
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bench-wrap dev-bench">
      <div className="dev-terminal-mock">
        <div className="dtm-header">
          <div className="dtm-controls">
            <span className="dtm-dot red" />
            <span className="dtm-dot yellow" />
            <span className="dtm-dot green" />
          </div>
          <span className="dtm-title">elija-ide-v4.sh</span>
        </div>
        
        <div className="dtm-body">
          <div className="dtm-welcome">ELIJA_SYSTEM COMPILING STAGE v4.1</div>
          {logs.map((log, idx) => {
            const isSuccess = log && log.startsWith('✓')
            return (
              <div 
                key={idx} 
                className={`dtm-log-line ${isSuccess ? 'success' : ''}`}
              >
                {log}
              </div>
            )
          })}
          <div className="dtm-cursor-blinking">_</div>
        </div>
      </div>
    </div>
  )
}

// Bench 5: PageSpeed Audit gauge dial panel
function OptimizationBench() {
  const [score, setScore] = useState(80)

  useEffect(() => {
    const timer = setTimeout(() => {
      setScore(100)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bench-wrap opt-bench">
      <div className="opt-layout-rows">
        <div className="opt-circle-gauge">
          <svg viewBox="0 0 100 100" width="90" height="90">
            <circle cx="50" cy="50" r="42" fill="transparent" stroke="rgba(255,255,255,0.02)" strokeWidth="6" />
            <motion.circle 
              cx="50" 
              cy="50" 
              r="42" 
              fill="transparent" 
              stroke="#10b981" 
              strokeWidth="6" 
              strokeDasharray="263.89"
              initial={{ strokeDashoffset: 263.89 }}
              animate={{ strokeDashoffset: 263.89 - (263.89 * score) / 100 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.3))' }}
            />
            <text x="50" y="57" textAnchor="middle" fill="#10b981" fontSize="22" fontWeight="900" fontFamily="var(--font-mono)">
              {score}
            </text>
          </svg>
          <span className="opt-gauge-title">PageSpeed Performance Score</span>
        </div>

        <div className="opt-bullet-logs">
          <div className="obl-item">
            <span className="obl-bullet green">✓</span>
            <span className="obl-lbl">TTFB Server Response Time</span>
            <span className="obl-val green">42ms</span>
          </div>
          <div className="obl-item">
            <span className="obl-bullet green">✓</span>
            <span className="obl-lbl">First Contentful Paint (FCP)</span>
            <span className="obl-val green">0.25s</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Process() {
  const [activeIdx, setActiveIdx] = useState(0)

  const s = steps[activeIdx]

  const renderActiveMock = (benchMock) => {
    switch (benchMock) {
      case 'research': return <ResearchBench />
      case 'strategy': return <StrategyBench />
      case 'design': return <DesignBench />
      case 'development': return <DevelopmentBench />
      case 'optimization': return <OptimizationBench />
      default: return null
    }
  }

  return (
    <section className="wrap bay" id="process">
      <SectionHeader
        eyebrow="Creative Process"
        title={<>From concept to <span className="accent">execution.</span></>}
        copy="Methodical engineering beats guess-work every single time. Click through the timeline steps to explore the mock assets and deliverables of each phase."
      />

      <div className="process-workspace">
        {/* Horizontal Navigation Timeline */}
        <div className="stepper-timeline">
          {/* Extended Timeline Track Container (unified backdrop and active light pipelines) */}
          <div className="timeline-track-container">
            <div className="timeline-backdrop-line" />
            <motion.div 
              className="timeline-active-track" 
              initial={{ scaleX: 0.11 }}
              animate={{ scaleX: progressLineScales[activeIdx] }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              style={{ originX: 0 }}
            />
          </div>
          
          {steps.map((step, idx) => {
            const isActive = idx === activeIdx
            const isCompleted = idx < activeIdx

            return (
              <button
                key={step.num}
                className={`stepper-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => setActiveIdx(idx)}
              >
                {/* Visual Circle Node */}
                <div className="node-circle">
                  {isCompleted ? (
                    <span className="node-completed-check">✓</span>
                  ) : (
                    <span className="node-number-text">{step.num}</span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="processActiveIndicator"
                      className="node-ring-glowing"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </div>

                {/* Refined Node Labels */}
                <div className="node-label-group">
                  <span className="node-phase-title">{step.phase}</span>
                  <span className="node-sub-badge">{step.timeline}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Dynamic Split Visual Workbench */}
        <div className="process-workbench-panel">
          {/* Left Column: Workbench Simulator Visuals */}
          <div className="workbench-canvas">
            <div className="canvas-header">
              <span className="canvas-badge">ACTIVE PREVIEW STATE</span>
              <span className="canvas-title">phase_{s.phase.toLowerCase()}_canvas.tsx</span>
            </div>

            <div className="canvas-viewport">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.benchMock}
                  initial={{ opacity: 0, scale: 0.97, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ width: '100%' }}
                >
                  {renderActiveMock(s.benchMock)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Descriptions & Deliverables Deck */}
          <div className="workbench-details">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.22 }}
                className="details-content"
              >
                <div className="details-header">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="details-num">PHASE {s.num}</span>
                    <span className="details-timeline-tag">{s.timeline}</span>
                  </div>
                  <h3 className="details-name">{s.name}</h3>
                </div>

                <p className="details-desc">{s.desc}</p>

                {/* Client deliverables checklist */}
                <div className="deliverables-section">
                  <span className="del-lbl">CLIENT OUTCOMES & DELIVERABLES</span>
                  <ul className="del-list">
                    {s.deliverables.map((del, i) => (
                      <li key={i} className="del-item">
                        <span className="del-check-bullet">✓</span>
                        <span className="del-text">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Client testimonial excerpt */}
                <div className="process-client-feedback" style={{ marginTop: '20px', padding: '12px 16px', background: 'rgba(255,255,255,0.01)', borderLeft: '2px solid var(--orange-2)', borderRadius: '0 8px 8px 0' }}>
                  <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--soft)', fontStyle: 'italic', lineHeight: 1.5 }}>
                    {s.feedback}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
