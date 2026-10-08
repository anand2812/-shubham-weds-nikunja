import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { weddingData } from '../data/weddingData'
import { Ornament } from './Ornament'

export function DateReveal() {
  const [revealed, setRevealed] = useState(false)
  return (
    <section className="section section--cream date-reveal" aria-labelledby="date-reveal-title">
      <div className="section__inner date-reveal__inner">
        <p className="kicker">Save the date</p>
        <h2 id="date-reveal-title">A day worth keeping</h2>
        <Ornament />
        <button className="reveal-card" onClick={() => setRevealed((value) => !value)} aria-expanded={revealed}>
          <span className="reveal-card__top"><Sparkles size={16} /> {revealed ? 'The date is set' : 'Tap to reveal the date'} <Sparkles size={16} /></span>
          <AnimatePresence mode="wait" initial={false}>
            {revealed ? (
              <motion.span key="date" className="reveal-card__date" initial={{ opacity: 0, rotateX: -35 }} animate={{ opacity: 1, rotateX: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
                <CalendarDays aria-hidden="true" /> {weddingData.couple.dateLabel}
              </motion.span>
            ) : (
              <motion.span key="question" className="reveal-card__question" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>A little secret awaits</motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </section>
  )
}
