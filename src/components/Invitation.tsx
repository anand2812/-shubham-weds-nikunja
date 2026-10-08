import { MotionReveal, Ornament } from './Ornament'
import { weddingData } from '../data/weddingData'

export function Invitation() {
  return (
    <section id="invitation" className="section section--ivory invitation" aria-labelledby="invitation-title">
      <MotionReveal className="section__inner invitation__inner">
        <p className="scripture">{weddingData.invitation.eyebrow}</p>
        <div className="ganesh" aria-label="Ganesh blessing">श्री</div>
        <Ornament />
        <p className="kicker">With the blessings of our families</p>
        <h2 id="invitation-title">Two families, one beautiful beginning</h2>
        <div className="invitation__families">
          <p>{weddingData.invitation.groomFamily}</p>
          <span aria-hidden="true">&amp;</span>
          <p>{weddingData.invitation.brideFamily}</p>
        </div>
        <p className="invitation__copy">{weddingData.invitation.inviteLine}</p>
        <p className="invitation__names">{weddingData.couple.groom} <i>&amp;</i> {weddingData.couple.bride}</p>
      </MotionReveal>
    </section>
  )
}
