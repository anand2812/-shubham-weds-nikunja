import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useRef } from 'react'
import temple from '../assets/temple-cutout.png'
import { weddingData } from '../data/weddingData'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 })
  const scale = useTransform(progress, [0, 0.75], [1, 1.28])
  const leftDoor = useTransform(progress, [0.14, 0.9], ['0%', '-72%'])
  const rightDoor = useTransform(progress, [0.14, 0.9], ['0%', '72%'])
  const glowOpacity = useTransform(progress, [0.12, 0.42, 0.9], [0, 0.9, 0])
  const visualOpacity = useTransform(progress, [0.72, 1], [1, 0])
  const textOpacity = useTransform(progress, [0, 0.5], [1, 0])
  const textY = useTransform(progress, [0, 0.55], ['0%', '-28%'])

  const imageStyle = { backgroundImage: `url(${temple})` }

  return (
    <section ref={heroRef} className="hero" aria-label="Wedding invitation cover">
      <div className="hero__cloud hero__cloud--one" aria-hidden="true" />
      <div className="hero__cloud hero__cloud--two" aria-hidden="true" />
      <motion.div
        className="hero__title"
        style={reducedMotion ? undefined : { opacity: textOpacity, y: textY }}
      >
        <p className="hero__eyebrow">A celebration of love</p>
        <div className="hero__line" aria-hidden="true" />
        <h1>Shubham <em>weds</em> Nikunja</h1>
        <p className="hero__date">{weddingData.couple.dateLabel}</p>
      </motion.div>

      <motion.div
        className="hero__temple"
        aria-label="Ornate South Indian temple gateway"
        role="img"
        style={reducedMotion ? undefined : { opacity: visualOpacity, scale }}
      >
        <motion.div
          className="hero__door hero__door--left"
          style={reducedMotion ? undefined : { x: leftDoor }}
        >
          <div className="hero__art hero__art--left" style={imageStyle} />
        </motion.div>
        <motion.div
          className="hero__door hero__door--right"
          style={reducedMotion ? undefined : { x: rightDoor }}
        >
          <div className="hero__art hero__art--right" style={imageStyle} />
        </motion.div>
        {!reducedMotion && <motion.div className="hero__glow" style={{ opacity: glowOpacity }} aria-hidden="true" />}
      </motion.div>

      <a href="#invitation" className="hero__scroll" aria-label="Scroll to the invitation">
        <span>Scroll to explore</span>
        <ChevronDown size={16} strokeWidth={1.4} aria-hidden="true" />
      </a>
    </section>
  )
}
