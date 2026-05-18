import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const logPool = [
  { text: '[API] GET /leads?status=active - 200 OK (22ms)', type: 'api' },
  { text: '[n8n] Triggered workflow: Lead Intake v2', type: 'n8n' },
  { text: '[Database] Row inserted: leads (id_9281)', type: 'db' },
  { text: '[API] POST /webhooks/stripe - 200 OK (45ms)', type: 'api' },
  { text: '[Supabase] Realtime listener triggered on: leads', type: 'info' },
  { text: '[System] CPU load: 1.4% | Memory: 196MB', type: 'sys' },
  { text: '[Database] Connected to PostgreSQL pool', type: 'success' },
  { text: '[API] GET /stats - 200 OK (15ms)', type: 'api' },
  { text: '[n8n] Completed workflow: Slack Alert', type: 'n8n' },
]

export default function DecoCode() {
  const [logs, setLogs] = useState([
    { id: 1, text: '❯ npm run dev', type: 'cmd' },
    { id: 2, text: '[Vite] server ready in 180ms', type: 'info' },
    { id: 3, text: '[Database] Connected to Supabase', type: 'success' },
  ])

  useEffect(() => {
    let logId = 4
    const interval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)]
      setLogs((prev) => {
        const nextLogs = [...prev, { id: logId++, ...randomLog }]
        if (nextLogs.length > 4) {
          return nextLogs.slice(nextLogs.length - 4)
        }
        return nextLogs
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="deco-code-window">
      <div className="code-header">
        <div className="code-dots">
          <span className="code-dot red" />
          <span className="code-dot yellow" />
          <span className="code-dot green" />
        </div>
        <div className="code-tab">
          <span style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 12,
            height: 12,
            borderRadius: 2,
            background: '#3178c6',
            color: '#fff',
            fontSize: '8px',
            fontWeight: '800',
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1
          }}>TS</span>
          leads-service.ts
        </div>
        <div style={{ width: 38 }} /> {/* spacer to balance traffic lights */}
      </div>

      <div className="code-body">
        <div className="code-gutter">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
        <pre className="code-pre">
          <code>
            <span className="cl">
              <span className="cm">// Fetch active leads from Supabase</span>
            </span>
            <span className="cl">
              <span className="ck">const</span> {'{ data }'} = <span className="ck">await</span> db
            </span>
            <span className="cl ind">
              .from(<span className="cs">&apos;leads&apos;</span>)
            </span>
            <span className="cl ind">
              .select()
            </span>
            <span className="cl ind active">
              .eq(<span className="cs">&apos;active&apos;</span>, <span className="cb">true</span>)
            </span>
          </code>
        </pre>
      </div>

      <div className="code-terminal">
        <div className="term-header">
          <span>Terminal — Node</span>
          <span className="term-status">Active</span>
        </div>
        <div className="term-logs">
          <AnimatePresence mode="popLayout">
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className={`term-line ${log.type}`}
              >
                {log.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
