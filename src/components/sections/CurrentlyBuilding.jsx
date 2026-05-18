import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const tags = [
  { name: 'AI Workflow Systems', file: '01_ai_workflows.sh', type: 'sh' },
  { name: 'Automation Infrastructure', file: '02_automations.py', type: 'py' },
  { name: 'Creative Tech Branding', file: '03_creative_tech.rs', type: 'rs' },
  { name: 'SaaS Platforms', file: '04_saas_platform.go', type: 'go' },
  { name: 'Modern UI Systems', file: '05_ui_infrastruct.ts', type: 'ts' },
  { name: 'Interactive Digital Experiences', file: '06_interactions.js', type: 'js' }
]

const logsData = {
  '01_ai_workflows.sh': [
    { text: '[SYSTEM] Loading AI vector pipelines...', type: 'sys' },
    { text: '[MODEL] Initializing GPT-4o & Claude 3.5 Sonnet router', type: 'info' },
    { text: '[PIPELINE] Semantic vector matching: ACTIVE', type: 'ok' },
    { text: '[DB] Querying local Pinecone DB index... match found', type: 'info' },
    { text: '[MATCH] Top similarity score: 0.948 (threshold met)', type: 'ok' },
    { text: '[PROCESS] Dispatching autonomous agent task queue...', type: 'sys' },
    { text: '[SUCCESS] AI pipeline workflow completed (142ms)', type: 'ok' }
  ],
  '02_automations.py': [
    { text: '[CRON] Triggering workflow syncing cron scheduler...', type: 'sys' },
    { text: '[API] Pulling webhook packets from HubSpot API...', type: 'info' },
    { text: '[DB] Processing relational DB sync (Supabase -> Postgres)', type: 'info' },
    { text: '[DB] Query optimization: 12 redundant table reads cleared', type: 'ok' },
    { text: '[QUEUE] Active queue consumer thread load: stable (12%)', type: 'ok' },
    { text: '[SUCCESS] Relational sync executed without exit codes', type: 'ok' }
  ],
  '03_creative_tech.rs': [
    { text: 'cargo run --release', type: 'cmd' },
    { text: '   Compiling creative-tech-graphics v1.0.4...', type: 'sys' },
    { text: '[SHADERS] Compiling custom vertex/fragment shader headers', type: 'info' },
    { text: '[RENDER] WebGL context bound | Canvas size: 1920x1080', type: 'info' },
    { text: '[PHYSICS] Spawning dynamic particle nodes: 18,200 frames', type: 'ok' },
    { text: '[SUCCESS] Frame rendered in 1.48ms | FPS locked at 120', type: 'ok' }
  ],
  '04_saas_platform.go': [
    { text: 'go run main.go', type: 'cmd' },
    { text: '[HTTP] HTTP dev server listening on port :8080 (PROD)', type: 'sys' },
    { text: '[AUTH] Initializing JWT validation & token refresher...', type: 'info' },
    { text: '[DB] Establishing Supabase PostgreSQL client... SUCCESS', type: 'ok' },
    { text: '[STRIPE] Checking webhook active event listeners... OK', type: 'ok' },
    { text: '[HEALTH] 200 OK | Database uptime: 99.98% | Latency: 12ms', type: 'ok' }
  ],
  '05_ui_infrastruct.ts': [
    { text: 'tsc --noEmit && vite build', type: 'cmd' },
    { text: '[TYPES] Running static type-safety checks... 0 errors', type: 'ok' },
    { text: '[COMPILER] Compiling assets via Vite & ESBuild...', type: 'sys' },
    { text: '[CSS] Minifying styles: globals.css (86.6KB -> 42.4KB)', type: 'info' },
    { text: '[SIZE] Performance index budget met: main-a7e8f.js (214KB)', type: 'ok' },
    { text: '[SUCCESS] Production bundle assets optimized and packed', type: 'ok' }
  ],
  '06_interactions.js': [
    { text: '[PHYSICS] Setting up Framer Motion spring anchors...', type: 'sys' },
    { text: '[GESTURES] Tracking touch-drag boundaries elastic offset: 0.4', type: 'info' },
    { text: '[INTERACTIVE] Listeners active: resize, scroll, mouse-grab', type: 'ok' },
    { text: '[TRANSITION] Slide interpolation directional routes loaded', type: 'info' },
    { text: '[SUCCESS] Tactile, high-fidelity experience running at 144 FPS', type: 'ok' }
  ]
}

export default function CurrentlyBuilding() {
  const [activeTab, setActiveTab] = useState(0)
  const [typedCommand, setTypedCommand] = useState('')
  const [showLogs, setShowLogs] = useState(false)
  const [logIndex, setLogIndex] = useState(0)
  
  const typingTimerRef = useRef(null)
  const logTimerRef = useRef(null)

  const activeScript = tags[activeTab].file
  const activeLogs = logsData[activeScript]
  const targetCommand = `./run_script.sh --stack=${activeScript}`

  useEffect(() => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current)
    if (logTimerRef.current) clearInterval(logTimerRef.current)

    const startTimer = setTimeout(() => {
      setTypedCommand('')
      setShowLogs(false)
      setLogIndex(0)

      let charIndex = 0
      typingTimerRef.current = setInterval(() => {
        if (charIndex < targetCommand.length) {
          setTypedCommand((prev) => prev + targetCommand.charAt(charIndex))
          charIndex++
        } else {
          clearInterval(typingTimerRef.current)
          setTimeout(() => {
            setShowLogs(true)
          }, 300)
        }
      }, 28)
    }, 0)

    return () => {
      clearTimeout(startTimer)
      if (typingTimerRef.current) clearInterval(typingTimerRef.current)
      if (logTimerRef.current) clearInterval(logTimerRef.current)
    }
  }, [targetCommand])

  // Log Staggered Streaming Trigger
  useEffect(() => {
    if (!showLogs) return

    let currentLogIndex = 0
    logTimerRef.current = setInterval(() => {
      if (currentLogIndex < activeLogs.length) {
        setLogIndex(currentLogIndex + 1)
        currentLogIndex++
      } else {
        clearInterval(logTimerRef.current)
      }
    }, 150) // Staggered stream loading lines

    return () => {
      if (logTimerRef.current) clearInterval(logTimerRef.current)
    }
  }, [showLogs, activeLogs])

  return (
    <section className="wrap bay" id="now">
      <div className="sec-head">
        <span className="sec-eyebrow">Interactive Sandbox</span>
        <h2 className="sec-title">Currently <span className="accent">Exploring</span> & Building.</h2>
      </div>

      <motion.div
        className="building terminal-container"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
      >
        {/* Terminal VS Code Header Frame */}
        <div className="terminal-header">
          <div className="terminal-controls">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="terminal-tab">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 17l6-6-6-6M12 19h8" />
            </svg>
            reigne-workbench (bash)
          </div>
        </div>

        {/* Terminal Body with Split Pane */}
        <div className="terminal-body">
          {/* File Explorer Navigation Sidebar */}
          <aside className="terminal-sidebar">
            <div className="explorer-title">Active Explorations</div>
            <nav className="explorer-list">
              {tags.map((tag, idx) => (
                <button
                  key={tag.file}
                  className={`explorer-file ${idx === activeTab ? 'active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <span className={`file-dot ${idx === activeTab ? 'active' : ''}`} />
                  <span className="file-name">{tag.file}</span>
                  <span className="file-ext">{tag.type}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Code Diagnostics Stream Panel */}
          <main className="terminal-screen">
            {/* Command Shell Terminal Prompt */}
            <div className="terminal-prompt">
              <span className="user">reigne@creative-tech</span>
              <span className="path">:~$</span>
              <span className="cmd-text">{typedCommand}</span>
              <span className="cursor-blink">_</span>
            </div>

            {/* Render Staggered Simulated Diagnostics Log Stream */}
            <div className="terminal-logs-window">
              <AnimatePresence>
                {showLogs && (
                  <div className="logs-stream-container">
                    {activeLogs.slice(0, logIndex).map((log, lIdx) => (
                      <motion.div
                        key={lIdx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15 }}
                        className={`log-line ${log.type}`}
                      >
                        {log.text}
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </motion.div>
    </section>
  )
}
