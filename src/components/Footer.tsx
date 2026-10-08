import { Heart } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import { Ornament } from './Ornament'

export function Footer() {
  return (
    <footer className="footer">
      <p className="kicker">{weddingData.footer}</p>
      <h2>{weddingData.couple.groom} <i>&amp;</i> {weddingData.couple.bride}</h2>
      <Ornament />
      <p>{weddingData.couple.dateLabel}</p>
      <Heart size={15} fill="currentColor" aria-hidden="true" />
    </footer>
  )
}
