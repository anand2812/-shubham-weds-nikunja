import { Check, Heart, Send, Loader2 } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { MotionReveal, Ornament } from './Ornament'

type Attendance = 'yes' | 'no' | null
type FormState = { name: string; email: string; guests: string; note: string }
const initialForm = { name: '', email: '', guests: '1', note: '' }

export function RSVP() {
  const [attendance, setAttendance] = useState<Attendance>(null)
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!attendance) return setError('Please let us know whether you can join us.')
    if (form.name.trim().length < 2) return setError('Please enter your full name.')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Please enter a valid email address.')
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          attendance,
          guests: form.guests,
          note: form.note.trim(),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Something went wrong.')
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Could not save your RSVP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return (
    <section className="section section--cream rsvp" aria-labelledby="rsvp-thanks">
      <MotionReveal className="section__inner rsvp__thanks"><Heart fill="currentColor" aria-hidden="true" /><p className="kicker">We've noted your reply</p><h2 id="rsvp-thanks">Thank you for being part of our story</h2><Ornament /><button className="text-button" onClick={() => setSubmitted(false)}>Edit RSVP</button></MotionReveal>
    </section>
  )

  return (
    <section className="section section--cream rsvp" aria-labelledby="rsvp-title">
      <MotionReveal className="section__inner rsvp__inner">
        <p className="kicker">Kindly respond</p>
        <h2 id="rsvp-title">Will you celebrate with us?</h2>
        <Ornament />
        <form onSubmit={submit} noValidate>
          <fieldset className="rsvp__choice"><legend>Can we save you a seat?</legend>
            <div><button type="button" onClick={() => setAttendance('yes')} className={attendance === 'yes' ? 'selected' : ''} aria-pressed={attendance === 'yes'}><Check size={17} /> Joyfully accepts</button><button type="button" onClick={() => setAttendance('no')} className={attendance === 'no' ? 'selected' : ''} aria-pressed={attendance === 'no'}>With our blessings</button></div>
          </fieldset>
          <div className="rsvp__fields">
            <label>Your name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} autoComplete="name" required /></label>
            <label>Email address<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" required /></label>
            <label>Guests attending<select value={form.guests} onChange={(event) => setForm({ ...form, guests: event.target.value })} disabled={attendance === 'no'}><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option></select></label>
            <label>A note for the couple <span>(optional)</span><textarea value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} rows={3} /></label>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button" type="submit" disabled={loading}>
            {loading ? <><Loader2 size={16} className="spin" aria-hidden="true" /> Sending...</> : <>Send RSVP <Send size={16} aria-hidden="true" /></>}
          </button>
        </form>
      </MotionReveal>
    </section>
  )
}
