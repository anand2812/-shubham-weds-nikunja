import { BellRing, MapPin, Phone } from 'lucide-react'
import { MotionReveal, Ornament } from './Ornament'
import { weddingData } from '../data/weddingData'

const notes = [
  { icon: MapPin, title: 'The venue', copy: weddingData.event.venue, detail: weddingData.event.address, action: 'Open in Maps', href: weddingData.event.mapUrl },
  { icon: Phone, title: 'A helping hand', copy: weddingData.event.contactName, detail: weddingData.event.contactPhone, action: 'Call us', href: `tel:${weddingData.event.contactPhone.replace(/\s/g, '')}` },
  { icon: BellRing, title: 'A gentle reminder', copy: 'Your presence is our present', detail: 'Please arrive a little early to settle in before the rituals begin.', action: null, href: null },
]

export function ThingsToKnow() {
  return (
    <section className="section section--ivory things" aria-labelledby="things-title">
      <div className="section__inner">
        <MotionReveal><p className="kicker">For our dear guests</p><h2 id="things-title">Things to know</h2><Ornament /></MotionReveal>
        <div className="things__grid">
          {notes.map(({ icon: Icon, title, copy, detail, action, href }) => (
            <MotionReveal className="note-card" key={title}>
              <Icon size={23} strokeWidth={1.25} aria-hidden="true" />
              <h3>{title}</h3>
              <p className="note-card__highlight">{copy}</p>
              <p>{detail}</p>
              {action && href && <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>{action} <span aria-hidden="true">↗</span></a>}
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
