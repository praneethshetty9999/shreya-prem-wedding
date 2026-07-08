import { motion } from 'framer-motion'
import { RSVP_DEADLINE, SAVE_THE_DATE_RANGE } from '../../lib/constants'
import { figureCropStyle } from '../../lib/figureCrop'
import { BackButton } from './BackButton'
import { ArrowRightIcon } from './icons'

// The hand-painted gold underline, cropped out of the original frame art so
// the rebuilt HTML layer keeps the authentic brush stroke (dashes included).
const UNDERLINE_CROP = figureCropStyle({
  src: '/rsvp-frame.png',
  figureBox: { left: 28, top: 77.2, width: 42.5, height: 4.2 },
})

export function NameEntryStep({ value, onChange, onSubmit, onBack }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex min-h-svh items-center justify-center bg-terracotta bg-cover bg-center p-4 sm:p-10"
      style={{ backgroundImage: "url('/rust-background.png')" }}
    >
      <BackButton onClick={onBack} />

      {/* Rust border shows ~5% each side, ~10% top/bottom; sharp corners. */}
      <div
        className="relative aspect-[1009/543] w-full bg-cover bg-center shadow-2xl sm:aspect-auto sm:h-[80svh] sm:w-[90vw]"
        style={{ backgroundImage: "url('/rsvp-background.png')" }}
      >
        {/* Figma: DIN Medium 62px */}
        <h2 className="font-heading absolute top-[20%] w-full text-center text-2xl font-medium leading-none text-vermillion sm:text-5xl lg:text-[62px]">
          Please RSVP by
        </h2>
        {/* Figma: Source Code Pro Medium 29px */}
        <p className="font-label absolute top-[31%] w-full text-center text-xs font-medium leading-none tracking-[0.2em] text-vermillion sm:text-xl lg:text-[29px]">
          {RSVP_DEADLINE.replace('July', 'JULY')}
        </p>
        <span className="sr-only">Please RSVP by {RSVP_DEADLINE}</span>

        <img
          src="/Flower.png"
          alt=""
          aria-hidden="true"
          className="absolute left-[12%] top-[48%] w-[9%]"
        />
        <img
          src="/Flower.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[12%] top-[48%] w-[9%]"
        />

        <form
          onSubmit={handleSubmit}
          className="absolute left-1/2 top-[63%] w-[46%] max-w-xl -translate-x-1/2"
        >
          <div className="flex items-center gap-3 px-1">
            <input
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="Enter your name"
              autoFocus
              aria-label="Your name"
              className="w-full bg-transparent font-serif text-sm text-terracotta placeholder:text-[#cf9d3f] focus:outline-none sm:text-2xl"
            />
            <button
              type="submit"
              aria-label="Submit name"
              className="shrink-0 text-terracotta transition-transform hover:translate-x-0.5"
            >
              <ArrowRightIcon className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>
          </div>
          <div
            aria-hidden="true"
            className="mt-1 w-full"
            style={{ ...UNDERLINE_CROP, aspectRatio: '429 / 23' }}
          />
        </form>

        <p className="font-timer absolute left-1/2 top-[79%] w-[70%] -translate-x-1/2 text-center text-[10px] tracking-wide text-coral sm:text-lg lg:text-xl">
          We request your attendance for all three days of our
          <br />
          celebration: {SAVE_THE_DATE_RANGE}
        </p>
      </div>
    </motion.section>
  )
}
