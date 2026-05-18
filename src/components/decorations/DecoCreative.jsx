import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function DecoCreative() {
  const [timecodeMs, setTimecodeMs] = useState(0)

  // Frame-accurate ticking timecode clock (6-second cycle, ~30fps frame update)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimecodeMs((prev) => (prev + 33) % 6000)
    }, 33)
    return () => clearInterval(interval)
  }, [])

  const getFormattedTimecode = (ms) => {
    const totalSeconds = Math.floor(ms / 1000)
    const seconds = totalSeconds % 6
    const frames = Math.floor((ms % 1000) / 33.3)
    return `00:00:0${seconds}:${frames.toString().padStart(2, '0')}`
  }

  // Active clip segment detection for the viewfinder overlays
  const currentProgress = (timecodeMs / 6000) * 100
  const activeClip = currentProgress < 40 ? 'warm' : currentProgress < 75 ? 'cyber' : 'outro'

  return (
    <div className="deco-creative">
      {/* Background color blobs */}
      <div className="cr-blob cr-blob-1" />
      <div className="cr-blob cr-blob-2" />
      <div className="cr-blob cr-blob-3" />

      {/* Main NLE Board Workspace */}
      <div className="nle-board">
        
        {/* TOP HALF: Video Monitor (Viewfinder) */}
        <div className="nle-monitor">
          {/* Active Visual Canvas shifting in sync with playhead */}
          <div className={`nle-preview-canvas ${activeClip}`}>
            {/* Viewfinder Overlays */}
            <div className="monitor-hud">
              <div className="hud-left">
                <span className="hud-rec-dot" />
                <span className="hud-mode">PLAY</span>
              </div>
              <div className="hud-right">
                <span className="hud-fps">30 FPS</span>
                <span className="hud-res">4K</span>
              </div>
            </div>

            {/* Viewfinder Grid Framing Crop */}
            <div className="viewfinder-guides" />

            {/* Dynamic Typography and Graphics morphing per Clip */}
            <div className="monitor-asset-container">
              {activeClip === 'warm' && (
                <motion.div 
                  className="monitor-asset warm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="asset-tag">STORYTELLING</span>
                  <h5 className="asset-title">Golden Hour</h5>
                </motion.div>
              )}
              {activeClip === 'cyber' && (
                <motion.div 
                  className="monitor-asset cyber"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="asset-tag neon">MOTION GRAPHICS</span>
                  <div className="cyber-glitch-wave" />
                </motion.div>
              )}
              {activeClip === 'outro' && (
                <motion.div 
                  className="monitor-asset outro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h5 className="asset-title logo">REIGNE</h5>
                  <span className="asset-tag muted">CREATIVE DIRECTION</span>
                </motion.div>
              )}
            </div>

            {/* Digital Monospace Timecode Overlay */}
            <div className="monitor-timecode">
              {getFormattedTimecode(timecodeMs)}
            </div>
          </div>
        </div>

        {/* BOTTOM HALF: Editing Tracks Timeline */}
        <div className="nle-timeline">
          {/* Track Labels Column */}
          <div className="timeline-labels">
            <span className="t-lbl">V2</span>
            <span className="t-lbl">V1</span>
            <span className="t-lbl">A1</span>
            <span className="t-lbl">SUB</span>
          </div>

          {/* Tracks Area */}
          <div className="timeline-tracks-container">
            {/* Sweeping Laser Playhead needle */}
            <div className="nle-playhead" />

            {/* Track 1: Video 2 (Glitch Clip) */}
            <div className="nle-track-lane">
              <div 
                className={`nle-clip cyber ${activeClip === 'cyber' ? 'active' : ''}`}
                style={{ left: '40%', width: '35%' }}
              >
                <span className="clip-name">glitch_fx.mp4</span>
              </div>
            </div>

            {/* Track 2: Video 1 (Warm Intro & Outro Clips) */}
            <div className="nle-track-lane">
              <div 
                className={`nle-clip warm ${activeClip === 'warm' ? 'active' : ''}`}
                style={{ left: '0%', width: '40%' }}
              >
                <span className="clip-name">sunset_intro.mov</span>
              </div>
              <div 
                className={`nle-clip outro ${activeClip === 'outro' ? 'active' : ''}`}
                style={{ left: '75%', width: '25%' }}
              >
                <span className="clip-name">outro_title.exr</span>
              </div>
            </div>

            {/* Track 3: Audio 1 (Bouncing sound waveforms) */}
            <div className="nle-track-lane audio">
              <div className="nle-clip audio active" style={{ left: '0%', width: '100%' }}>
                <span className="clip-name">master_mix.wav</span>
                {/* Dynamic Audio Visualizer Waves */}
                <div className="audio-waveform-container">
                  {Array.from({ length: 22 }).map((_, idx) => (
                    <span 
                      key={idx} 
                      className="nle-wave-bar" 
                      style={{ 
                        animationDelay: `${idx * 0.08}s`,
                        height: `${8 + Math.sin(idx * 0.5) * 6}px`
                      }} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Track 4: Subtitle Outline Clip */}
            <div className="nle-track-lane">
              <div className="nle-clip subtitle" style={{ left: '10%', width: '80%' }}>
                <span className="clip-name">[ CC / Subtitles ]</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
