import { motion } from 'framer-motion'

const steps = [
  {
    type: 'Trigger',
    status: 'Triggered',
    tone: 'triggered',
    title: 'Webhook received',
    detail: 'New lead captured',
    icon: 'trigger',
  },
  {
    type: 'Action',
    status: 'Completed',
    tone: 'completed',
    title: 'Enrich & sync lead',
    detail: 'CRM record updated',
    icon: 'action',
  },
  {
    type: 'Switch',
    status: 'Running',
    tone: 'running',
    title: 'Qualified lead?',
    detail: 'Route by lead score',
    icon: 'switch',
  },
]

function StepIcon({ type }) {
  if (type === 'trigger') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 2 5.8 13h5.8L11 22l7.2-11h-5.8L13 2Z" />
      </svg>
    )
  }

  if (type === 'action') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.37a1.7 1.7 0 0 0-1 .63 1.7 1.7 0 0 0-.35 1.02V21h-4v-.08a1.7 1.7 0 0 0-1.1-1.58 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.18 15a1.7 1.7 0 0 0-.63-1 1.7 1.7 0 0 0-1.02-.35H2.5v-4h.08a1.7 1.7 0 0 0 1.58-1.1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 8.53 4.2a1.7 1.7 0 0 0 1-.63 1.7 1.7 0 0 0 .35-1.02V2.5h4v.08a1.7 1.7 0 0 0 1.1 1.58 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 .63 1 1.7 1.7 0 0 0 1.02.35h.08v4H21a1.7 1.7 0 0 0-1.6 1.12Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 4v4.5A3.5 3.5 0 0 0 9.5 12h5A3.5 3.5 0 0 1 18 15.5V20" />
      <path d="M6 20v-4.5A3.5 3.5 0 0 1 9.5 12" />
      <circle cx="6" cy="3.5" r="1.5" />
      <circle cx="6" cy="20.5" r="1.5" />
      <circle cx="18" cy="20.5" r="1.5" />
    </svg>
  )
}

function Connector({ direction }) {
  const path = direction === 'right'
    ? 'M160 3 C160 11 184 10 184 18 C184 26 160 25 160 33'
    : 'M160 3 C160 11 136 10 136 18 C136 26 160 25 160 33'

  return (
    <svg className="workflow-connector" viewBox="0 0 320 36" aria-hidden="true">
      <path className="workflow-connector-path" d={path} />
      <circle className="workflow-port" cx="160" cy="3" r="3" />
      <circle className="workflow-port" cx="160" cy="33" r="3" />
    </svg>
  )
}

export default function DecoFlow() {
  return (
    <div className="deco-flow-canvas">
      <div className="flow-header">
        <div className="flow-header-left">
          <span className="flow-logo">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="5" cy="12" r="2.4" />
              <circle cx="19" cy="6" r="2.4" />
              <circle cx="19" cy="18" r="2.4" />
              <path d="M7.4 12H12m0 0 4.6-4.5M12 12l4.6 4.5" />
            </svg>
          </span>
          <span className="flow-title">Lead qualification</span>
        </div>
        <span className="flow-status">
          <span className="flow-status-dot" />
          Live workflow
        </span>
      </div>

      <div className="flow-workflow">
        <div className="flow-stack">
          {steps.map((step, index) => (
            <div className="flow-step-group" key={step.type}>
              <motion.div
                className="flow-node-wrap"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
              >
                <span className={`flow-node-status ${step.tone}`}>
                  <span className="flow-node-status-dot" />
                  {step.status}
                </span>
                <div className="workflow-node">
                  <span className={`flow-node-icon ${step.tone}`}>
                    <StepIcon type={step.icon} />
                  </span>
                  <span className="flow-node-copy">
                    <strong>{step.title}</strong>
                    <small>{step.detail}</small>
                  </span>
                  <span className="flow-node-type">{step.type}</span>
                </div>
              </motion.div>
              {index < steps.length - 1 && (
                <Connector direction={index === 0 ? 'right' : 'left'} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
