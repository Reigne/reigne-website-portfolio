import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SiReact,
  SiVite,
  SiTailwindcss,
  SiHeroui,
  SiNextdotjs,
  SiPrimereact,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiLaravel,
  SiSupabase,
  SiN8N,
  SiMongodb,
  SiMysql,
  SiCanva,
  SiFigma
} from 'react-icons/si'
import { TbApi, TbWebhook, TbHierarchy2, TbBrandAdobe, TbBolt } from 'react-icons/tb'
import { IoCodeSlashOutline } from 'react-icons/io5'
import SectionHeader from '../ui/SectionHeader'
import { stack } from '../../data/stack'

const categories = ['All', 'Frontend', 'Backend', 'Automation', 'Database', 'Creative']

// Level metadata for telemetry visuals
const levelConfigs = {
  Expert: { pct: 95, color: '#ff7a2a', glow: 'rgba(255, 122, 42, 0.45)', label: 'Expert Class' },
  Advanced: { pct: 85, color: '#6aa3ff', glow: 'rgba(106, 163, 255, 0.45)', label: 'Advanced Class' },
  Intermediate: { pct: 70, color: '#9ee37d', glow: 'rgba(158, 227, 125, 0.45)', label: 'Intermediate' }
}

const toolIcons = {
  'React.js': SiReact,
  Vite: SiVite,
  TailwindCSS: SiTailwindcss,
  HeroUI: SiHeroui,
  NextUI: SiNextdotjs,
  PrimeReact: SiPrimereact,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  PHP: SiPhp,
  Laravel: SiLaravel,
  Supabase: SiSupabase,
  'Supabase PostgreSQL': SiSupabase,
  n8n: SiN8N,
  GoHighLevel: TbHierarchy2,
  APIs: TbApi,
  Webhooks: TbWebhook,
  Instantly: TbBolt,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Photoshop: TbBrandAdobe,
  'Premiere Pro': TbBrandAdobe,
  Canva: SiCanva,
  Figma: SiFigma
}

const toolIconColors = {
  'React.js': '#61DAFB',
  Vite: '#646CFF',
  TailwindCSS: '#06B6D4',
  HeroUI: '#A855F7',
  NextUI: '#FFFFFF',
  PrimeReact: '#03C4E8',
  'Node.js': '#339933',
  Express: '#FFFFFF',
  PHP: '#777BB4',
  Laravel: '#FF2D20',
  Supabase: '#3ECF8E',
  'Supabase PostgreSQL': '#3ECF8E',
  n8n: '#EA4B71',
  GoHighLevel: '#2A7BFF',
  APIs: '#F59E0B',
  Webhooks: '#10B981',
  Instantly: '#3B82F6',
  MongoDB: '#47A248',
  MySQL: '#00758F',
  Photoshop: '#31A8FF',
  'Premiere Pro': '#9999FF',
  Canva: '#00C4CC',
  Figma: '#F24E1E'
}

function ToolIcon({ name, size = 18 }) {
  const Icon = toolIcons[name] || IoCodeSlashOutline
  const color = toolIconColors[name] || '#9aa4b2'
  return <Icon size={size} style={{ display: 'block', flexShrink: 0, color }} />
}

export default function Stack() {
  const [activeCat, setActiveCat] = useState('All')
  const [selectedTool, setSelectedTool] = useState({ ...stack[0].items[0], category: stack[0].cat })

  // Flattened list of tools or filtered list
  const filteredTools = stack.reduce((acc, catCol) => {
    if (activeCat === 'All' || catCol.cat === activeCat) {
      catCol.items.forEach(item => {
        // Avoid duplicate items if they exist across columns
        if (!acc.some(tool => tool.name === item.name)) {
          acc.push({ ...item, category: catCol.cat })
        }
      })
    }
    return acc;
  }, [])

  const selectCategory = (categoryName) => {
    setActiveCat(categoryName)
    if (categoryName === 'All') return

    const category = stack.find(item => item.cat === categoryName)
    if (category && !category.items.some(tool => tool.name === selectedTool.name)) {
      setSelectedTool({ ...category.items[0], category: category.cat })
    }
  }

  const activeConfig = levelConfigs[selectedTool.level] || levelConfigs.Expert

  return (
    <section className="wrap bay" id="stack">
      <SectionHeader
        eyebrow="Tooling"
        title={<>The <span className="accent">stack</span> behind the work.</>}
        copy="Tools chosen for fit, not fashion. Select a category, click any active tool block, and inspect active telemetry on the right."
      />

      {/* Category Selection Filter Tabs with sliding active capsule indicator */}
      <div className="stack-tabs">
        {categories.map(cat => {
          const isActive = activeCat === cat
          return (
            <button
              key={cat}
              className={`stack-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => selectCategory(cat)}
              style={{ position: 'relative' }}
            >
              {isActive && (
                <motion.span
                  layoutId="stackTabIndicator"
                  className="stack-tab-active-indicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  style={{
                    position: 'absolute',
                    inset: -1, // cover card borders perfectly
                    borderRadius: '9px',
                    background: 'rgba(255, 122, 42, 0.08)',
                    border: '1px solid var(--orange-2)',
                    boxShadow: '0 0 12px rgba(255, 122, 42, 0.15)',
                    zIndex: 0,
                  }}
                />
              )}
              <span className="stack-tab-text-inner" style={{ position: 'relative', zIndex: 1 }}>
                {cat}
              </span>
            </button>
          )
        })}
      </div>

      <div className="stack-explorer-layout">
        {/* Left Side: Interactive Tools Grid */}
        <div className="stack-grid-container">
          <motion.div className="stack-interactive-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool) => {
                const isSelected = selectedTool.name === tool.name
                return (
                  <motion.button
                    key={tool.name}
                    className={`stack-tool-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedTool(tool)}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  >
                    <span className="tool-icon-wrapper">
                      <ToolIcon name={tool.name} size={16} />
                    </span>
                    <span className="tool-name">{tool.name}</span>
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Side: High-Fidelity Telemetry Inspector */}
        <div className="stack-inspector-panel">
          <div className="inspector-header">
            <div className="inspector-controls">
              <span className="ins-dot red" />
              <span className="ins-dot yellow" />
              <span className="ins-dot green" />
            </div>
            <div className="inspector-title">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
              </svg>
              SYSTEM_INSPECTOR v2.4
            </div>
          </div>

          <div className="inspector-body">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTool.name}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="inspector-content"
              >
                {/* Active Tool Name with Large Branding Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '10px',
                    display: 'grid',
                    placeItems: 'center',
                    border: '1px solid var(--line-2)',
                    flexShrink: 0
                  }}>
                    <ToolIcon name={selectedTool.name} size={24} />
                  </div>
                  <div className="ins-heading-group" style={{ margin: 0 }}>
                    <span className="ins-pre" style={{ display: 'block', marginBottom: 2 }}>Active Module</span>
                    <h3 className="ins-tool-name" style={{ margin: 0, fontSize: '20px', fontWeight: '800', lineHeight: 1.1 }}>{selectedTool.name}</h3>
                  </div>
                </div>

                <span className="ins-cat-lbl" style={{ display: 'inline-block', marginBottom: '16px' }}>{selectedTool.category} Infrastructure</span>

                {/* Circular Gauge / Proficiency telemetry */}
                <div className="ins-telemetry-row">
                  <div className="ins-gauge-wrap">
                    <svg className="ins-gauge-svg" width="76" height="76" viewBox="0 0 100 100">
                      {/* Grid track circle */}
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        fill="transparent" 
                        stroke="rgba(255,255,255,0.03)" 
                        strokeWidth="8" 
                      />
                      {/* Active proficiency progress ring */}
                      <motion.circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        fill="transparent" 
                        stroke={activeConfig.color} 
                        strokeWidth="8" 
                        strokeDasharray="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 251.2 - (251.2 * activeConfig.pct) / 100 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        strokeLinecap="round"
                        style={{ filter: `drop-shadow(0 0 4px ${activeConfig.glow})` }}
                      />
                      <text 
                        x="50" 
                        y="56" 
                        textAnchor="middle" 
                        fill="var(--ink)" 
                        fontSize="18" 
                        fontWeight="800" 
                        fontFamily="var(--font-mono)"
                      >
                        {activeConfig.pct}%
                      </text>
                    </svg>
                  </div>

                  <div className="ins-status-details">
                    <div className="ins-stat-block">
                      <div className="ins-sb-lbl">COMPETENCY</div>
                      <div className="ins-sb-val" style={{ color: activeConfig.color }}>
                        {activeConfig.label}
                      </div>
                    </div>
                    <div className="ins-stat-block">
                      <div className="ins-sb-lbl">INTEGRATION</div>
                      <div className="ins-sb-val green">STABLE (100%)</div>
                    </div>
                  </div>
                </div>

                {/* Production use case body */}
                <div className="ins-usecase-section">
                  <div className="ins-uc-lbl">PRODUCTION INFLUENCE</div>
                  <p className="ins-uc-text">{selectedTool.useCase}</p>
                </div>

                {/* System check ticks */}
                <div className="ins-checks-section">
                  <div className="ins-check-item">
                    <span className="ins-check-bullet green">✓</span>
                    <span className="ins-check-desc">Asset Optimization Checks Passed</span>
                  </div>
                  <div className="ins-check-item">
                    <span className="ins-check-bullet green">✓</span>
                    <span className="ins-check-desc">Event-Driven Architecture Synced</span>
                  </div>
                  <div className="ins-check-item">
                    <span className="ins-check-bullet green">✓</span>
                    <span className="ins-check-desc">Tested in High-Concurrency Production</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
