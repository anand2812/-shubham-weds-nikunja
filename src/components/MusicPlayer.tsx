import { Music2, Pause, Play } from 'lucide-react'
import { useRef, useState, useCallback } from 'react'

/**
 * Ambient Indian Wedding Music Player
 * 
 * Generates a beautiful ambient soundscape inspired by Indian wedding music
 * using the Web Audio API — warm tanpura-like drones, gentle melodic phrases,
 * and soft tabla-inspired rhythms.
 * 
 * To use your own music file instead:
 * 1. Place an .mp3 file in the /public folder (e.g., /public/wedding-music.mp3)
 * 2. Uncomment the "FILE-BASED PLAYER" section below
 * 3. Comment out the "GENERATED AMBIENT" section
 */

// ─── Indian scale notes (Raga Yaman-inspired, in Hz) ────────
const SA = 261.63, RE = 293.66, GA = 329.63, MA_SHARP = 369.99
const PA = 392.00, DHA = 440.00, NI = 493.88, SA_HIGH = 523.25
const MELODY_NOTES = [SA, RE, GA, MA_SHARP, PA, DHA, NI, SA_HIGH, NI, DHA, PA, MA_SHARP, GA, RE]

function createTanpuraDrone(ctx: AudioContext, frequency: number, startTime: number) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()

  osc.type = 'sawtooth'
  osc.frequency.value = frequency
  filter.type = 'lowpass'
  filter.frequency.value = 800
  filter.Q.value = 2

  gain.gain.setValueAtTime(0, startTime)
  gain.gain.linearRampToValueAtTime(0.015, startTime + 2)
  gain.gain.setValueAtTime(0.015, startTime + 6)
  gain.gain.linearRampToValueAtTime(0, startTime + 8)

  osc.connect(filter).connect(gain).connect(ctx.destination)
  osc.start(startTime)
  osc.stop(startTime + 8)
}

function createMelodicNote(ctx: AudioContext, frequency: number, startTime: number, duration: number) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.value = frequency
  // Gentle vibrato
  const vibrato = ctx.createOscillator()
  const vibratoGain = ctx.createGain()
  vibrato.frequency.value = 5.5
  vibratoGain.gain.value = 2
  vibrato.connect(vibratoGain).connect(osc.frequency)
  vibrato.start(startTime)
  vibrato.stop(startTime + duration)

  gain.gain.setValueAtTime(0, startTime)
  gain.gain.linearRampToValueAtTime(0.03, startTime + 0.08)
  gain.gain.exponentialRampToValueAtTime(0.018, startTime + duration * 0.5)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)

  osc.connect(gain).connect(ctx.destination)
  osc.start(startTime)
  osc.stop(startTime + duration)
}

function createSoftChime(ctx: AudioContext, frequency: number, startTime: number) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'triangle'
  osc.frequency.value = frequency * 2
  gain.gain.setValueAtTime(0, startTime)
  gain.gain.linearRampToValueAtTime(0.012, startTime + 0.03)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2)

  osc.connect(gain).connect(ctx.destination)
  osc.start(startTime)
  osc.stop(startTime + 1.3)
}

function playAmbientSequence(ctx: AudioContext) {
  const now = ctx.currentTime

  // Tanpura drone cycle (SA and PA)
  createTanpuraDrone(ctx, SA / 2, now)
  createTanpuraDrone(ctx, PA / 2, now + 0.3)

  // Melodic phrases (random selection from raga)
  const phraseStart = now + 1.5
  const selectedNotes = MELODY_NOTES.filter(() => Math.random() > 0.5).slice(0, 5)
  selectedNotes.forEach((note, i) => {
    const noteTime = phraseStart + i * 0.7
    createMelodicNote(ctx, note, noteTime, 0.55 + Math.random() * 0.3)
  })

  // Soft chimes
  createSoftChime(ctx, DHA, now + 0.8)
  createSoftChime(ctx, PA, now + 2.4)
  createSoftChime(ctx, SA_HIGH, now + 4.2)

  return 8 // duration of one cycle in seconds
}

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const contextRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ─── FILE-BASED PLAYER (uncomment to use your own .mp3) ────
  // const audioRef = useRef<HTMLAudioElement | null>(null)
  // const toggle = useCallback(() => {
  //   if (!audioRef.current) {
  //     audioRef.current = new Audio('/wedding-music.mp3')
  //     audioRef.current.loop = true
  //     audioRef.current.volume = 0.4
  //   }
  //   if (playing) {
  //     audioRef.current.pause()
  //   } else {
  //     audioRef.current.play()
  //   }
  //   setPlaying(p => !p)
  // }, [playing])

  // ─── GENERATED AMBIENT (active by default) ────────────────
  const toggle = useCallback(() => {
    if (!playing) {
      const Context = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Context) return
      const ctx = contextRef.current ?? new Context()
      contextRef.current = ctx

      // Play first cycle immediately
      const cycleDuration = playAmbientSequence(ctx)

      // Schedule repeating cycles
      intervalRef.current = setInterval(() => {
        if (contextRef.current && contextRef.current.state === 'running') {
          playAmbientSequence(contextRef.current)
        }
      }, cycleDuration * 1000)
    } else {
      // Stop
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (contextRef.current) {
        contextRef.current.close()
        contextRef.current = null
      }
    }
    setPlaying(p => !p)
  }, [playing])

  return (
    <button
      className="music-player"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Pause ambient music' : 'Play gentle Indian wedding ambience'}
    >
      {playing ? <Pause size={15} /> : <Play size={15} />}
      <Music2 size={14} />
      <span>{playing ? 'Playing' : 'Music'}</span>
    </button>
  )
}
