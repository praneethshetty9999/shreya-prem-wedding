import { motion } from 'framer-motion'
import { RSVP_DEADLINE } from '../../lib/constants'
import { figureCropStyle } from '../../lib/figureCrop'

// The hand-painted gold underline, cropped out of the original frame art so
// the rebuilt HTML layer keeps the authentic brush stroke (dashes included).
const UNDERLINE_CROP = figureCropStyle({
  src: '/rsvp-frame.png',
  figureBox: { left: 28, top: 77.2, width: 42.5, height: 4.2 },
})

export function NameEntryStep({ value, onChange, onSubmit }) {
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
      {/* Rust border shows ~5% each side, ~10% top/bottom; sharp corners. */}
      <div
        className="relative aspect-[1009/543] w-full bg-cover bg-center shadow-2xl sm:aspect-auto sm:h-[80svh] sm:w-[90vw]"
        style={{ backgroundImage: "url('/rsvp-background.png')" }}
      >
        <h2
        className="absolute font-heading-condensed top-[20%] w-full text-center text-[19.2px] font-semibold leading-none tracking-[-0.02em] text-vermillion sm:text-[38.4px] lg:text-[54.18px]"
        style={{ transform: 'scaleX(0.88) scaleY(1.2)' }}
      >
        Please RSVP by
      </h2>

      <p
        className="absolute font-heading-condensed top-[32%] w-full text-center text-[9.6px] font-semibold leading-none tracking-[-0.02em] text-vermillion sm:text-[16px] lg:text-[35.79px]"
        style={{ transform: 'scaleX(0.88) scaleY(1.2)' }}
      >
        {RSVP_DEADLINE.replace('July', 'JULY')}
      </p>

        <img
          src="/Flower.png"
          alt=""
          aria-hidden="true"
          className="absolute left-[12%] top-[51%] w-[10.8%]"
        />
        <img
          src="/Flower.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[12%] top-[51%] w-[10.8%]"
        />

        <form
          onSubmit={handleSubmit}
          className="absolute left-1/2 top-[66%] w-[52%] max-w-xl -translate-x-1/2"
        >
          <div className="flex items-center px-1">
            <input
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="Your name & guest name (e.g. Rahul & Priya)"
              autoFocus
              aria-label="Your name"
              className="font-label w-full bg-transparent text-[24px] font-normal leading-none tracking-normal text-terracotta placeholder:text-[20px] placeholder:text-[#cf9d3f] focus:outline-none"
            />
            <button type="submit" className="sr-only">
              Submit
            </button>
          </div>
          <div
            aria-hidden="true"
            className="mt-1 w-full"
            style={{ ...UNDERLINE_CROP, aspectRatio: '429 / 23' }}
          />
        </form>

        <p
          className="font-label absolute left-1/2 top-[5%] w-[70%] -translate-x-1/2 text-center text-base font-medium tracking-wide"
          style={{ color: '#594F1A' }}
        >
          <span className="italic">
            We request your attendance for all three days of our celebration:
          </span>
          <br />
          <span className="font-bold">March 3-6, 2027</span>
        </p>
      </div>
    </motion.section>
  )
}
