import { motion } from 'framer-motion'
import { RSVP_DEADLINE } from '../../lib/constants'
import { ArrowRightIcon } from './icons'
import { BackButton } from './BackButton'

export function NameEntryStep({ value, onChange, onSubmit, onBack }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative flex min-h-svh items-center justify-center bg-terracotta bg-cover bg-center p-4 sm:p-10"
      style={{ backgroundImage: "url('/rust-background.png')" }}
    >
      <BackButton onClick={onBack} />

      <div
        className="relative aspect-[1009/543] w-full max-w-4xl rounded-3xl bg-cover bg-center shadow-2xl"
        style={{ backgroundImage: "url('/rsvp-frame.png')" }}
      >
        <h2 className="sr-only">Please RSVP by {RSVP_DEADLINE}</h2>

        <form
          onSubmit={handleSubmit}
          className="absolute left-1/2 top-[76%] w-[43%] max-w-md -translate-x-1/2 -translate-y-1/2"
        >
          {/* Masks the "enter your name" placeholder baked into rsvp-frame.png so it
              doesn't show through once the real input below has a value. Both this
              and the row below are `relative` with no z-index, so paint order falls
              back to DOM order and the row (declared after) reliably wins. */}
          <div className="absolute inset-x-0 -inset-y-1 bg-[#fbefd7]" />

          <div className="relative flex items-center gap-3">
            <input
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="enter your name"
              autoFocus
              aria-label="Your name"
              className="font-heading w-full bg-transparent text-sm text-terracotta placeholder:text-terracotta/40 focus:outline-none sm:text-lg"
            />
            <button
              type="submit"
              aria-label="Submit name"
              className="shrink-0 text-terracotta"
            >
              <ArrowRightIcon className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>
          </div>
          <div className="mt-1 border-b-2 border-gold" />
        </form>
      </div>
    </motion.section>
  )
}
