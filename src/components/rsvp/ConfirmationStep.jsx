import { motion } from 'framer-motion'
import { ArrowRightIcon } from './icons'

// TODO: mismatched with SAVE_THE_DATE_RANGE ("March 3 – 6, 2027") used elsewhere —
// confirm which is correct before shipping.
const WOOFCOME_DATE = 'March 4th, 2027'

export function ConfirmationStep({ onBack }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-cover bg-center px-6 py-12 text-center"
      style={{ backgroundImage: "url('/rsvp-background.png')" }}
    >
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-wide text-terracotta sm:text-4xl">
          SAVE THE DATE
        </h1>
        <p className="font-heading mt-2 text-3xl font-bold tracking-wide text-terracotta sm:text-5xl">
          {WOOFCOME_DATE}
        </p>
      </div>

      {/* TODO: swap in the real dog-illustration asset once available. */}
      <div
        role="img"
        aria-label="Illustration of two dogs"
        className="flex h-24 w-56 items-center justify-center rounded-lg border-2 border-dashed border-terracotta/30 text-terracotta/40"
      >
        <span className="font-label text-xs tracking-widest">dog illustration</span>
      </div>

      <p className="font-serif text-2xl text-terracotta sm:text-3xl">you&apos;re woofcome!</p>

      <button
        type="button"
        onClick={onBack}
        aria-label="Back to home"
        className="mt-6 text-terracotta transition-transform hover:translate-x-1"
      >
        <ArrowRightIcon className="h-8 w-8" />
      </button>
    </motion.section>
  )
}
