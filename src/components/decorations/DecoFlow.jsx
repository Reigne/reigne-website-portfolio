import { useState, useEffect } from 'react'

export default function DecoFlow() {
  const [runs, setRuns] = useState(28490)

  useEffect(() => {
    // Increment the run counter every 4 seconds (matching the animation loop!)
    const interval = setInterval(() => {
      setRuns((prev) => prev + 1)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="deco-flow-canvas">
      <span className="flow-canvas-label">Automated Core Sync</span>

      {/* SVG connecting wires */}
      <div className="flow-editor">
        <svg className="flow-wires" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff7a2a" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#ff7a2a" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ff7a2a" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9ee37d" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#9ee37d" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#9ee37d" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="grad-peach" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffae5c" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#ffae5c" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffae5c" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="grad-pink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7ab8" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#ff7ab8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ff7ab8" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Wire 1: Webhook -> n8n */}
          <path d="M 65 95 L 140 95" className="wire-base" />
          <path d="M 65 95 L 140 95" className="wire-active wa-1" />

          {/* Wire 2: n8n -> Supabase */}
          <path d="M 188 95 C 215 95, 235 35, 265 35" className="wire-base" />
          <path d="M 188 95 C 215 95, 235 35, 265 35" className="wire-active wa-2" />

          {/* Wire 3: n8n -> Hubspot */}
          <path d="M 188 95 L 265 95" className="wire-base" />
          <path d="M 188 95 L 265 95" className="wire-active wa-3" />

          {/* Wire 4: n8n -> Slack */}
          <path d="M 188 95 C 215 95, 235 155, 265 155" className="wire-base" />
          <path d="M 188 95 C 215 95, 235 155, 265 155" className="wire-active wa-4" />
        </svg>

        {/* Energy Packets */}
        <div className="packet p-1" />
        <div className="packet p-2" />
        <div className="packet p-3" />
        <div className="packet p-4" />

        {/* Node 1: Webhook */}
        <div className="f-node webhook" style={{ left: 10, top: 80 }}>
          <span className="fn-icon purple">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </span>
          <span className="fn-text">Webhook</span>
        </div>

        {/* Node 2: n8n */}
        <div className="f-node n8n-core" style={{ left: 135, top: 80 }}>
          <span className="fn-icon orange">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
              <path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
            </svg>
          </span>
          <span className="fn-text">n8n</span>
        </div>

        {/* Node 3: Supabase */}
        <div className="f-node supabase" style={{ left: 260, top: 20 }}>
          <span className="fn-icon green">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
              <path d="M19 10h-6V3L5 14h6v7l8-11z"/>
            </svg>
          </span>
          <span className="fn-text">Supabase</span>
        </div>

        {/* Node 4: Hubspot */}
        <div className="f-node hubspot" style={{ left: 260, top: 80 }}>
          <span className="fn-icon peach">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </span>
          <span className="fn-text">Hubspot</span>
        </div>

        {/* Node 5: Slack */}
        <div className="f-node slack" style={{ left: 260, top: 140 }}>
          <span className="fn-icon pink">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
              <path d="M6 15a2 2 0 100 4h2v-2H6zm0-6a2 2 0 100 4h6V9H6zm9 0a2 2 0 102-2h-2v2zm0 6a2 2 0 102 2h2v-4h-4z"/>
            </svg>
          </span>
          <span className="fn-text">Slack</span>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="flow-stats-bar">
        <div className="flow-stat">
          <span className="f-val" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span className="f-dot pulsing-green" style={{ marginBottom: 0 }} />
            {runs.toLocaleString()}
          </span>
          <span className="f-lbl">Executions</span>
        </div>
        <div className="flow-stat">
          <span className="f-val text-green">99.98%</span>
          <span className="f-lbl">Uptime</span>
        </div>
        <div className="flow-stat">
          <span className="f-val">140ms</span>
          <span className="f-lbl">Avg Latency</span>
        </div>
      </div>
    </div>
  )
}
