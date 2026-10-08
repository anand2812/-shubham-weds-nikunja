import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Ornament({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`ornament ${dark ? 'ornament--dark' : ''}`} aria-hidden="true">
      <span />
      <i>✦</i>
      <span />
    </div>
  )
}

export function MotionReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
