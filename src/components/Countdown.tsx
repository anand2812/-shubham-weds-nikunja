import { useEffect, useState } from 'react'
import { weddingData } from '../data/weddingData'
import { MotionReveal, Ornament } from './Ornament'

type Remaining = { days: number; hours: number; minutes: number; seconds: number }
const destination = new Date(weddingData.couple.weddingDate).getTime()
const calculate = (): Remaining => {
  const diff = Math.max(0, destination - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  }
}

export function Countdown() {
  const [remaining, setRemaining] = useState(calculate)
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(calculate()), 1_000)
    return () => window.clearInterval(timer)
  }, [])
  const units = Object.entries(remaining) as [keyof Remaining, number][]
  return (
    <section className="countdown" aria-labelledby="countdown-title">
      <MotionReveal className="countdown__inner">
        <p className="kicker kicker--gold">Until the big day</p>
        <h2 id="countdown-title">The countdown begins</h2>
        <Ornament dark />
        <div className="countdown__grid" aria-live="polite" aria-atomic="true">
          {units.map(([unit, value]) => <div key={unit}><strong>{String(value).padStart(2, '0')}</strong><span>{unit}</span></div>)}
        </div>
      </MotionReveal>
    </section>
  )
}
