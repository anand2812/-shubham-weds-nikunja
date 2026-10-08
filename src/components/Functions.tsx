import { Clock3, MapPin } from 'lucide-react'
import { MotionReveal, Ornament } from './Ornament'
import { weddingData } from '../data/weddingData'

export function Functions() {
  return (
    <section className="section section--maroon functions" aria-labelledby="celebrations-title">
      <div className="section__inner">
        <MotionReveal>
          <p className="kicker kicker--gold">Two days of celebration</p>
          <h2 id="celebrations-title">The celebrations</h2>
          <Ornament dark />
        </MotionReveal>
        <div className="functions__grid">
          {weddingData.celebrations.map((event, index) => (
            <MotionReveal className="event-card" key={event.name}>
              <span className="event-card__number">0{index + 1}</span>
              <p className="event-card__accent">{event.accent}</p>
              <h3>{event.name}</h3>
              <div className="event-card__rule" />
              <p className="event-card__date">{event.date}</p>
              <p><Clock3 size={15} aria-hidden="true" /> {event.time}</p>
              <p><MapPin size={15} aria-hidden="true" /> {event.venue}</p>
              <p className="event-card__desc">{event.description}</p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
