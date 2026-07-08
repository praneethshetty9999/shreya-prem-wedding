import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { figureCropStyle, morphTransition } from '../../lib/figureCrop'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay, ease: 'easeOut' },
  }),
}

// Text treatments for light vs dark card background colors.
const THEMES = {
  dark: {
    close: 'text-maroon/70 hover:text-maroon',
    label: 'text-maroon/70',
    heading: 'text-maroon',
    divider: 'bg-maroon/40',
    body: 'text-maroon/90',
    tile: 'border-maroon/25 bg-white/25',
    tileLabel: 'text-maroon/60',
    tileValue: 'text-maroon',
  },
  light: {
    close: 'text-cream/80 hover:text-white',
    label: 'text-cream/80',
    heading: 'text-white',
    divider: 'bg-cream/50',
    body: 'text-cream',
    tile: 'border-white/25 bg-white/10',
    tileLabel: 'text-cream/70',
    tileValue: 'text-white',
  },
}

// Full-screen event detail view, washed in the clicked card's own background
// color. The card's figure morphs in from the EventCard via the shared
// `event-figure-${id}` layoutId while the copy staggers up beneath it.
export function EventDetailOverlay({ event, onClose }) {
  const theme = THEMES[event.theme]

  useEffect(() => {
    function handleKeyDown(keyEvent) {
      if (keyEvent.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      role="dialog"
      aria-modal="true"
      aria-label={`${event.title} details`}
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ backgroundColor: event.bg }}
    >
      <button
        type="button"
        onClick={onClose}
        className={`fixed right-5 top-5 z-10 flex items-center gap-2 transition-colors ${theme.close}`}
      >
        <span className="font-label text-sm tracking-widest">close</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="mx-auto flex min-h-svh w-full max-w-3xl flex-col items-center px-6 py-16 text-center sm:py-20">
        <motion.div
          layoutId={`event-figure-${event.id}`}
          aria-hidden="true"
          transition={{ layout: morphTransition }}
          className="w-52 sm:w-64"
          style={{ aspectRatio: event.figureAspect, ...figureCropStyle(event) }}
        />

        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.15}
          variants={fadeUp}
          className={`font-label mt-8 text-sm uppercase tracking-[0.3em] ${theme.label}`}
        >
          {event.date}
        </motion.p>

        <motion.h2
          initial="hidden"
          animate="visible"
          custom={0.22}
          variants={fadeUp}
          className={`font-heading mt-2 text-4xl font-bold uppercase sm:text-5xl ${theme.heading}`}
        >
          {event.title}
        </motion.h2>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.3}
          variants={fadeUp}
          aria-hidden="true"
          className={`mt-4 h-px w-24 ${theme.divider}`}
        />

        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.38}
          variants={fadeUp}
          className={`mt-6 max-w-xl leading-relaxed ${theme.body}`}
        >
          {event.description}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.46}
          variants={fadeUp}
          className="mt-10 grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {event.facts.map((fact) => (
            <div key={fact.label} className={`rounded-xl border px-4 py-5 ${theme.tile}`}>
              <p className={`font-label text-xs uppercase tracking-widest ${theme.tileLabel}`}>
                {fact.label}
              </p>
              <p className={`font-heading mt-2 font-bold ${theme.tileValue}`}>{fact.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
