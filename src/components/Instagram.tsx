import { Camera } from 'lucide-react'
import { MotionReveal, Ornament } from './Ornament'
import { weddingData } from '../data/weddingData'

export function Instagram() {
  return (
    <section className="instagram" aria-labelledby="instagram-title">
      <MotionReveal className="instagram__inner">
        <Camera size={26} strokeWidth={1.25} aria-hidden="true" />
        <p className="kicker kicker--gold">Share the joy</p>
        <h2 id="instagram-title">{weddingData.instagram.hashtag}</h2>
        <Ornament dark />
        <p>{weddingData.instagram.message}</p>
      </MotionReveal>
    </section>
  )
}
