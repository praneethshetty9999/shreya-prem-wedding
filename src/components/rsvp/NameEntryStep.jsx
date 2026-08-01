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
      {/* h-[85svh]: the old aspect-[1009/543] (~5% side / ~10% top-bottom
          rust border) rendered barely 190px tall on a phone-width screen —
          nowhere near enough room for the stack of absolutely-positioned
          text below it, so everything overlapped. Sizing off viewport
          height instead, the same way the sm+ card already does, keeps the
          card tall enough at any width; bg-cover on rust-background.png
          still crops to fit without stretching either way. */}
      <div
        className="relative h-[85svh] w-full bg-cover bg-center shadow-2xl sm:h-[80svh] sm:w-[90vw]"
        style={{ backgroundImage: "url('/rsvp-background.png')" }}
      >
        <h2
        className="absolute font-heading-condensed top-[26%] w-full text-center text-[19.2px] font-semibold leading-none tracking-[-0.02em] text-vermillion sm:top-[20%] sm:text-[38.4px] lg:text-[54.18px]"
        style={{ transform: 'scaleX(0.88) scaleY(1.2)' }}
      >
        Please RSVP by
      </h2>

      <p
        className="absolute font-heading-condensed top-[38%] w-full text-center text-[9.6px] font-semibold leading-none tracking-[-0.02em] text-vermillion sm:top-[32%] sm:text-[16px] lg:text-[35.79px]"
        style={{ transform: 'scaleX(0.88) scaleY(1.2)' }}
      >
        {RSVP_DEADLINE.replace('July', 'JULY')}
      </p>

        <img
          src="/Flower.png"
          alt=""
          aria-hidden="true"
          className="absolute left-[12%] top-[51%] hidden w-[10.8%] sm:block"
        />
        <img
          src="/Flower.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[12%] top-[51%] hidden w-[10.8%] sm:block"
        />

        <form
          onSubmit={handleSubmit}
          className="absolute left-1/2 top-[80%] w-[85%] max-w-xl -translate-x-1/2 sm:top-[66%] sm:w-[52%]"
        >
          <div className="flex items-center px-1">
            <input
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="Your name & guest name (e.g. Rahul & Priya)"
              autoFocus
              aria-label="Your name"
              className="font-label w-full bg-transparent text-[13px] font-normal leading-none tracking-normal text-terracotta placeholder:text-[11px] placeholder:text-[#cf9d3f] focus:outline-none sm:text-[24px] sm:placeholder:text-[20px]"
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
