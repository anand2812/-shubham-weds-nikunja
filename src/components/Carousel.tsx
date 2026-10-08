import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

type Slide = { src: string; alt: string; caption: string }

export function Carousel({ slides }: { slides: readonly Slide[] }) {
  const [active, setActive] = useState(0)
  const previous = () => setActive((current) => (current - 1 + slides.length) % slides.length)
  const next = () => setActive((current) => (current + 1) % slides.length)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [slides.length])

  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label="Our story in photographs">
      <div className="carousel__stage">
        <AnimatePresence mode="wait">
          <motion.figure key={slides[active].src} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }}>
            <img src={slides[active].src} alt={slides[active].alt} loading="lazy" />
            <figcaption>{slides[active].caption}</figcaption>
          </motion.figure>
        </AnimatePresence>
        <button className="carousel__arrow carousel__arrow--prev" onClick={previous} aria-label="Previous photograph"><ChevronLeft /></button>
        <button className="carousel__arrow carousel__arrow--next" onClick={next} aria-label="Next photograph"><ChevronRight /></button>
      </div>
      <div className="carousel__dots" aria-label="Choose a photograph">
        {slides.map((slide, index) => <button key={slide.src} onClick={() => setActive(index)} className={index === active ? 'is-active' : ''} aria-label={`Show photograph ${index + 1}`} aria-current={index === active ? 'true' : undefined} />)}
      </div>
      <p className="sr-only" aria-live="polite">Showing photograph {active + 1} of {slides.length}</p>
    </div>
  )
}
