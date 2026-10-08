import { FormEvent, useEffect, useState } from 'react'
import { Heart, Send, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { MotionReveal, Ornament } from './Ornament'

type Wish = { id: number; name: string; message: string; created_at: string }

export function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // Fetch wishes from backend on mount
  useEffect(() => {
    fetch('/api/wishes')
      .then(res => res.json())
      .then(data => setWishes(data))
      .catch(() => console.error('Could not load wishes'))
      .finally(() => setFetching(false))
  }, [])

  const addWish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || !message.trim()) return setError('Please add your name and a wish.')
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Something went wrong.')
      }

      const newWish = await response.json()
      setWishes(prev => [newWish, ...prev])
      setName('')
      setMessage('')
    } catch (err: any) {
      setError(err.message || 'Could not save your wish. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section wishes" aria-labelledby="wishes-title">
      <div className="section__inner wishes__layout">
        <MotionReveal className="wishes__intro"><p className="kicker kicker--gold">Leave a little love</p><h2 id="wishes-title">A wall of wishes</h2><Ornament dark /><p>Your blessing will live forever, a cherished keepsake from our special day.</p></MotionReveal>
        <MotionReveal className="wishes__form"><form onSubmit={addWish}><label>Your name<input value={name} onChange={(event) => setName(event.target.value)} maxLength={60} /></label><label>Your wish<textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={250} rows={4} /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button--light" type="submit" disabled={loading}>{loading ? <><Loader2 size={16} className="spin" aria-hidden="true" /> Posting...</> : <>Post your wish <Send size={16} /></>}</button></form></MotionReveal>
        <div className="wishes__list" aria-live="polite">
          {fetching ? (
            <p className="wishes__empty">Loading wishes...</p>
          ) : wishes.length === 0 ? (
            <p className="wishes__empty">Be the first to leave a blessing.</p>
          ) : (
            wishes.map((wish) => (
              <motion.article key={wish.id} className="wish" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <Heart size={14} fill="currentColor" aria-hidden="true" />
                <p>"{wish.message}"</p>
                <strong>— {wish.name}</strong>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
