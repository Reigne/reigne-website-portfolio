import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const themeOrder = ['aura', 'cyber', 'nord']

const themes = {
  aura: {
    name: 'Aura Glass',
    bodyBg: 'rgba(255, 255, 255, 0.02)',
    panelBg: 'rgba(255, 255, 255, 0.035)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.06)',
    backdropFilter: 'blur(8px)',
    heroBg: 'linear-gradient(135deg, rgba(186, 104, 200, 0.15), rgba(106, 163, 255, 0.1))',
    heroBorder: 'rgba(186, 104, 200, 0.25)',
    accent: '#b388ff',
    statBg: 'rgba(255, 255, 255, 0.02)',
    textColor: 'var(--ink)',
    mutedColor: 'var(--mute)',
    cardDotBg: 'rgba(255, 255, 255, 0.1)',
    fontFamily: 'inherit',
    title: 'AURA GLASS',
    sub: 'Frictionless micro-interactions',
    stats: [
      { val: '99.2%', lbl: 'UX Score' },
      { val: '140ms', lbl: 'Transition' },
      { val: 'Active', lbl: 'Delight' }
    ]
  },
  cyber: {
    name: 'Tokyo Cyber',
    bodyBg: 'rgba(6, 6, 10, 0.6)',
    panelBg: 'rgba(13, 11, 22, 0.9)',
    borderColor: '#ff007f', // Cyber pink
    borderRadius: '0px', // Cyber is sharp!
    boxShadow: '0 0 8px rgba(255, 0, 127, 0.35)',
    backdropFilter: 'blur(0px)',
    heroBg: 'linear-gradient(135deg, rgba(0, 240, 255, 0.12), rgba(255, 0, 127, 0.12))',
    heroBorder: '#00f0ff', // Cyber cyan
    accent: '#00f0ff',
    statBg: 'rgba(20, 18, 32, 0.8)',
    textColor: '#39ff14', // Matrix green!
    mutedColor: '#00f0ff',
    cardDotBg: '#ff007f',
    fontFamily: 'var(--font-mono)',
    title: 'TOKYO_CYBER.SYS',
    sub: 'CORE_SYS: ENCRYPTED',
    stats: [
      { val: 'FPS 120', lbl: 'REFRESH' },
      { val: 'NET OK', lbl: 'LATENCY' },
      { val: 'LOAD 8%', lbl: 'CPU_SYS' }
    ]
  },
  nord: {
    name: 'Nordic Slate',
    bodyBg: '#2e3440',
    panelBg: '#3b4252',
    borderColor: '#4c566a', // Nord border slate
    borderRadius: '4px',
    boxShadow: 'none',
    backdropFilter: 'blur(0px)',
    heroBg: 'rgba(76, 86, 106, 0.35)',
    heroBorder: '#4c566a',
    accent: '#88c0d0', // Nord frost blue
    statBg: 'rgba(67, 76, 94, 0.35)',
    textColor: '#d8dee9',
    mutedColor: '#81a1c1',
    cardDotBg: '#4c566a',
    fontFamily: 'inherit',
    title: 'Nordic Slate',
    sub: 'Clean form & functionality',
    stats: [
      { val: '1.0s', lbl: 'Load Time' },
      { val: '24kB', lbl: 'Bundle' },
      { val: '99%', lbl: 'Uptime' }
    ]
  }
}

export default function DecoUI() {
  const [theme, setTheme] = useState('aura')
  const [isManual, setIsManual] = useState(false)
  const autoTimeoutRef = useRef(null)

  // Cursor paths synchronized to theme intervals (18 seconds total loop)
  // Aura: 0-6s, Cyber: 6-12s, Nord: 12-18s
  const reignePathX = [80, 220, 180, 160, 160, 240, 110, 225, 225, 160, 280, 95, 95]
  const reignePathY = [150, 120, 60, 12, 12, 160, 90, 12, 12, 120, 80, 12, 12]

  const clientPathX = [280, 260, 120, 80, 210, 280, 290, 90, 210, 280]
  const clientPathY = [80, 180, 160, 140, 100, 160, 150, 70, 140, 80]

  // Figma active bounding box overlays (in-sync with Reigne cursor)
  // Visible at Hero banner from 1s to 3s
  const heroBoundingOpacity = [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  // Visible at Stats Row from 3s to 5s
  const statsBoundingOpacity = [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]

  // Interactive Click Ripple expand animations at 5.8s, 11.8s, 17.8s
  const clickRippleScale = [0, 0, 0, 0.1, 2.8, 0, 0, 0.1, 2.8, 0, 0, 0.1, 2.8]
  const clickRippleOpacity = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]

  useEffect(() => {
    if (isManual) return

    const triggerAutoTransition = () => {
      setTheme((prev) => {
        const nextIdx = (themeOrder.indexOf(prev) + 1) % themeOrder.length
        return themeOrder[nextIdx]
      })
    }

    const interval = setInterval(triggerAutoTransition, 6000)
    return () => clearInterval(interval)
  }, [isManual])

  const selectTheme = (newTheme) => {
    setTheme(newTheme)
    setIsManual(true)

    // Resume autoplay after 12 seconds of inactivity
    if (autoTimeoutRef.current) clearTimeout(autoTimeoutRef.current)
    autoTimeoutRef.current = setTimeout(() => {
      setIsManual(false)
    }, 12000)
  }

  const activeTheme = themes[theme]

  return (
    <motion.div 
      className="deco-ui"
      animate={{ 
        fontFamily: activeTheme.fontFamily,
        backgroundColor: activeTheme.bodyBg
      }}
      transition={{ duration: 0.6 }}
      style={{ overflow: 'hidden', position: 'relative' }}
    >
      {/* Dynamic Background aura blobs (for Aura Glass Theme) */}
      <AnimatePresence>
        {theme === 'aura' && (
          <>
            <motion.div
              className="aura-blob blue"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.25, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 1.5 }}
              style={{
                position: 'absolute',
                top: '-20px',
                left: '20px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #6aa3ff 0%, rgba(106,163,255,0) 70%)',
                filter: 'blur(10px)',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />
            <motion.div
              className="aura-blob purple"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.2, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 1.5 }}
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #ba68c8 0%, rgba(186,104,200,0) 70%)',
                filter: 'blur(12px)',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Designer Cursor: Reigne */}
      <motion.div 
        className="designer-cursor reigne"
        style={{ 
          position: 'absolute', 
          zIndex: 100, 
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
        animate={{ x: reignePathX, y: reignePathY }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M0 0V11L3.5 7.5L8.5 7.5L0 0Z" fill="#6aa3ff" stroke="#000" strokeWidth="1" />
        </svg>

        {/* Animated Click Ripple Ring */}
        <motion.div
          style={{
            position: 'absolute',
            top: '-6px',
            left: '-6px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            border: '2px solid #6aa3ff',
            boxShadow: '0 0 8px rgba(106, 163, 255, 0.6)',
            pointerEvents: 'none',
            zIndex: -1
          }}
          animate={{ scale: clickRippleScale, opacity: clickRippleOpacity }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <span 
          style={{ 
            fontSize: '7px', 
            fontWeight: 700, 
            color: '#fff', 
            background: '#6aa3ff',
            padding: '2px 4px', 
            borderRadius: '3px',
            fontFamily: 'var(--font-mono)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap'
          }}
        >
          Reigne
        </span>
      </motion.div>

      {/* Client Cursor: Client */}
      <motion.div 
        className="designer-cursor client"
        style={{ 
          position: 'absolute', 
          zIndex: 100, 
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
        animate={{ x: clientPathX, y: clientPathY }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M0 0V11L3.5 7.5L8.5 7.5L0 0Z" fill="#ff7a2a" stroke="#000" strokeWidth="1" />
        </svg>
        <span 
          style={{ 
            fontSize: '7px', 
            fontWeight: 700, 
            color: '#fff', 
            background: '#ff7a2a',
            padding: '2px 4px', 
            borderRadius: '3px',
            fontFamily: 'var(--font-mono)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap'
          }}
        >
          Client
        </span>
      </motion.div>

      {/* UI Topbar (Browser Sandbox Container) */}
      <motion.div 
        className="ui-topbar"
        animate={{
          backgroundColor: activeTheme.panelBg,
          borderColor: activeTheme.borderColor,
          borderRadius: activeTheme.borderRadius
        }}
        transition={{ duration: 0.6 }}
      >
        <span className="ui-dot r" />
        <span className="ui-dot y" />
        <span className="ui-dot g" />

        {/* Live Theme Control Switcher */}
        <div className="ui-theme-bar">
          <button 
            className={`ui-tb-btn ${theme === 'aura' ? 'active' : ''}`}
            onClick={() => selectTheme('aura')}
            style={{ 
              color: theme === 'aura' ? '#6aa3ff' : 'rgba(255,255,255,0.4)',
              borderBottom: theme === 'aura' ? '1.5px solid #6aa3ff' : '1.5px solid transparent'
            }}
          >
            Aura Glass
          </button>
          <button 
            className={`ui-tb-btn ${theme === 'cyber' ? 'active' : ''}`}
            onClick={() => selectTheme('cyber')}
            style={{ 
              color: theme === 'cyber' ? '#ff007f' : 'rgba(255,255,255,0.4)',
              borderBottom: theme === 'cyber' ? '1.5px solid #ff007f' : '1.5px solid transparent'
            }}
          >
            Tokyo Cyber
          </button>
          <button 
            className={`ui-tb-btn ${theme === 'nord' ? 'active' : ''}`}
            onClick={() => selectTheme('nord')}
            style={{ 
              color: theme === 'nord' ? '#88c0d0' : 'rgba(255,255,255,0.4)',
              borderBottom: theme === 'nord' ? '1.5px solid #88c0d0' : '1.5px solid transparent'
            }}
          >
            Nordic Slate
          </button>
        </div>

        <div className="ui-nav-pills">
          <span className="ui-npill active" style={{ background: activeTheme.accent + '25' }} />
          <span className="ui-npill" />
        </div>
      </motion.div>

      {/* UI Body Section */}
      <div className="ui-body">
        {/* Sidebar Container */}
        <motion.div 
          className="ui-sidebar-w"
          animate={{
            backgroundColor: activeTheme.panelBg,
            borderColor: activeTheme.borderColor,
            borderRadius: activeTheme.borderRadius,
            boxShadow: activeTheme.boxShadow,
            backdropFilter: activeTheme.backdropFilter
          }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="ui-savatar" 
            animate={{ 
              borderColor: activeTheme.accent + '60',
              backgroundColor: activeTheme.accent + '25'
            }}
          />
          <motion.div className="ui-snav on" animate={{ backgroundColor: activeTheme.accent + '40' }} />
          <div className="ui-snav" />
          <div className="ui-snav" />
          <div className="ui-snav" />
          <div className="ui-sdivider" />
          <div className="ui-snav sm" />
          <div className="ui-snav sm" />
        </motion.div>

        {/* Main Work Area */}
        <motion.div 
          className="ui-main"
          style={{ position: 'relative' }}
          animate={{
            backgroundColor: activeTheme.panelBg,
            borderColor: activeTheme.borderColor,
            borderRadius: activeTheme.borderRadius,
            boxShadow: activeTheme.boxShadow,
            backdropFilter: activeTheme.backdropFilter
          }}
          transition={{ duration: 0.6 }}
        >
          {/* Active Figma Selection Box: Hero Card Selection */}
          <motion.div
            style={{
              position: 'absolute',
              top: '6px',
              left: '6px',
              right: '6px',
              height: '38px',
              border: '1px dashed #6aa3ff',
              pointerEvents: 'none',
              zIndex: 30
            }}
            animate={{ opacity: heroBoundingOpacity }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '3px', height: '3px', background: '#6aa3ff' }} />
            <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '3px', height: '3px', background: '#6aa3ff' }} />
            <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '3px', height: '3px', background: '#6aa3ff' }} />
            <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '3px', height: '3px', background: '#6aa3ff' }} />
            <div 
              style={{ 
                position: 'absolute', 
                top: '-9px', 
                left: '-1px', 
                background: '#6aa3ff', 
                color: '#fff', 
                fontSize: '5px', 
                fontFamily: 'var(--font-mono)', 
                fontWeight: 700,
                padding: '1px 2px',
                borderRadius: '1px'
              }}
            >
              div.hero
            </div>
          </motion.div>

          {/* Hero Banner Component */}
          <motion.div 
            className="ui-hero-b"
            style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '6px 8px' }}
            animate={{
              background: activeTheme.heroBg,
              borderColor: activeTheme.heroBorder,
              borderRadius: activeTheme.borderRadius === '0px' ? '0px' : '6px'
            }}
            transition={{ duration: 0.6 }}
          >
            <motion.h4
              style={{
                margin: 0,
                fontSize: theme === 'cyber' ? '8px' : '7.5px',
                fontWeight: 800,
                letterSpacing: theme === 'cyber' ? '0.05em' : '0.01em',
                lineHeight: 1
              }}
              animate={{ color: activeTheme.textColor }}
            >
              {activeTheme.title}
            </motion.h4>
            <motion.span
              style={{
                fontSize: '5.5px',
                fontWeight: 500,
                lineHeight: 1
              }}
              animate={{ color: activeTheme.mutedColor }}
            >
              {activeTheme.sub}
            </motion.span>
          </motion.div>

          {/* Active Figma Selection Box: Stats Section Selection */}
          <motion.div
            style={{
              position: 'absolute',
              top: '48px',
              left: '6px',
              right: '6px',
              height: '20px',
              border: '1px dashed #6aa3ff',
              pointerEvents: 'none',
              zIndex: 30
            }}
            animate={{ opacity: statsBoundingOpacity }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '3px', height: '3px', background: '#6aa3ff' }} />
            <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '3px', height: '3px', background: '#6aa3ff' }} />
            <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '3px', height: '3px', background: '#6aa3ff' }} />
            <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '3px', height: '3px', background: '#6aa3ff' }} />
            <div 
              style={{ 
                position: 'absolute', 
                top: '-9px', 
                left: '-1px', 
                background: '#6aa3ff', 
                color: '#fff', 
                fontSize: '5px', 
                fontFamily: 'var(--font-mono)', 
                fontWeight: 700,
                padding: '1px 2px',
                borderRadius: '1px'
              }}
            >
              section.stats
            </div>
          </motion.div>

          {/* Stats Blocks Row */}
          <div className="ui-stat-row">
            {activeTheme.stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                className={`ui-stat ${idx === 2 ? 'hi' : ''}`}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  padding: '2px 0px',
                  lineHeight: 1
                }}
                animate={{ 
                  borderColor: idx === 2 ? activeTheme.accent + '40' : activeTheme.borderColor,
                  backgroundColor: idx === 2 ? activeTheme.accent + '15' : activeTheme.statBg,
                  borderRadius: activeTheme.borderRadius === '0px' ? '0px' : '4px'
                }}
                transition={{ duration: 0.6 }}
              >
                <motion.span 
                  style={{ 
                    fontSize: '6.5px', 
                    fontWeight: 700
                  }}
                  animate={{ color: activeTheme.textColor }}
                >
                  {stat.val}
                </motion.span>
                <motion.span 
                  style={{ 
                    fontSize: '4.5px', 
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    marginTop: '0.5px'
                  }}
                  animate={{ color: activeTheme.mutedColor }}
                >
                  {stat.lbl}
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* Text Line Mockups */}
          {theme === 'cyber' ? (
            <>
              <div className="ui-txt" style={{ backgroundColor: 'rgba(57, 255, 20, 0.25)', height: '4px' }} />
              <div className="ui-txt s" style={{ backgroundColor: 'rgba(0, 240, 255, 0.25)', height: '4px', width: '60%' }} />
            </>
          ) : (
            <>
              <div className="ui-txt" style={{ height: '4px' }} />
              <div className="ui-txt s" style={{ height: '4px' }} />
            </>
          )}

          {/* Cards Panel Grid */}
          <div className="ui-cards-r">
            <motion.div 
              className="ui-card-b"
              animate={{ 
                borderColor: activeTheme.borderColor,
                backgroundColor: activeTheme.statBg,
                borderRadius: activeTheme.borderRadius === '0px' ? '0px' : '4px'
              }}
            >
              <motion.div className="ui-card-dot" animate={{ backgroundColor: activeTheme.cardDotBg }} />
            </motion.div>
            
            <motion.div 
              className="ui-card-b"
              animate={{ 
                borderColor: activeTheme.borderColor,
                backgroundColor: activeTheme.statBg,
                borderRadius: activeTheme.borderRadius === '0px' ? '0px' : '4px'
              }}
            >
              <motion.div 
                className="ui-card-dot accent" 
                animate={{ 
                  backgroundColor: activeTheme.accent,
                  boxShadow: `0 0 6px ${activeTheme.accent}`
                }} 
              />
            </motion.div>

            <motion.div 
              className="ui-card-b"
              animate={{ 
                borderColor: activeTheme.borderColor,
                backgroundColor: activeTheme.statBg,
                borderRadius: activeTheme.borderRadius === '0px' ? '0px' : '4px'
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
