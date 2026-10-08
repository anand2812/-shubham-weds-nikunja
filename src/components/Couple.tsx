import { Heart } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import { Carousel } from './Carousel'
import { MotionReveal, Ornament } from './Ornament'

export function Couple() {
  return (
    <section className="section section--ivory couple" aria-labelledby="story-title">
      <div className="section__inner couple__grid">
        <MotionReveal className="couple__copy">
          <p className="kicker">Our story</p>
          <h2 id="story-title">{weddingData.story.heading}</h2>
          <Ornament />
          <p>{weddingData.story.copy}</p>
          <p className="couple__monogram"><Heart size={15} fill="currentColor" aria-hidden="true" /> S <span>&amp;</span> N</p>
        </MotionReveal>
        <MotionReveal><Carousel slides={weddingData.story.images} /></MotionReveal>
      </div>
    </section>
  )
}
