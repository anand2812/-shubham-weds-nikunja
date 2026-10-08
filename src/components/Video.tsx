import { Play } from 'lucide-react'
import { MotionReveal, Ornament } from './Ornament'
import { weddingData } from '../data/weddingData'

export function Video() {
  return (
    <section className="section section--cream video" aria-labelledby="video-title">
      <MotionReveal className="section__inner">
        <p className="kicker">Before the vows</p>
        <h2 id="video-title">A glimpse of us</h2>
        <Ornament />
        <div className="video__frame">
          {weddingData.event.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${weddingData.event.youtubeId}`}
              title="Shubham and Nikunja’s pre-wedding film"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="video__placeholder">
              <Play size={23} fill="currentColor" aria-hidden="true" />
              <p>Our pre-wedding film</p>
              <span>Add a YouTube video ID in the event details to share your film.</span>
            </div>
          )}
          <div className="video__seal" aria-hidden="true"><Play size={17} fill="currentColor" /> <span>{weddingData.event.youtubeId ? 'Play film' : 'Film coming soon'}</span></div>
        </div>
      </MotionReveal>
    </section>
  )
}
