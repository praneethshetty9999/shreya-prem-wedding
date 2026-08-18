import { motion } from 'framer-motion'
import { RSVP_DEADLINE } from '../../lib/constants'
import { figureCropStyle } from '../../lib/figureCrop'
import { ArrowRightIcon } from './icons'

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
      {/* Below sm: a fixed h-[68svh] instead of aspect-[1009/543] — locking
          height to width made the postcard very short on phones (the
          background image is a wide ~1.86:1 rectangle), which is what
          forced all the text into a cramped stack. Taller now, at the cost
          of bg-cover cropping the art's left/right edges a bit — the
          flowers are dropped below sm: rather than resized, since they'd
          otherwise need their own third breakpoint to avoid colliding with
          the taller/differently-spaced text. Rust border shows ~5% each
          side, ~10% top/bottom on sm:+; sharp corners. */}
      <div
        className="relative h-[68svh] w-full bg-cover bg-center shadow-2xl sm:aspect-auto sm:h-[80svh] sm:w-[90vw]"
        style={{ backgroundImage: "url('/rsvp-background.png')" }}
      >
        <h2 className="absolute font-heading-condensed top-[29%] w-full text-center text-[clamp(25px,8.4vw,30px)] font-bold leading-none tracking-[0.01em] text-vermillion sm:top-[23%] sm:text-[48px] lg:text-[67.72px]">
        Please RSVP by
      </h2>

      <p className="absolute font-heading-condensed top-[37%] w-full text-center text-[clamp(25px,8.4vw,30px)] font-bold leading-none tracking-[0.01em] text-vermillion sm:top-[35%] sm:text-[48px] lg:text-[67.72px]">
        {RSVP_DEADLINE.replace('September', 'SEPTEMBER')}
      </p>

        <img
          src="/Flower.png"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-[46%] w-[28%] -translate-x-1/2 sm:hidden"
        />
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

        {/* w-[52%] left the long placeholder overflowing its own box on
            narrow phones (nothing was clipping it, it just ran past the
            postcard edge) — wider on mobile, back to the original 52% once
            the postcard has real room to work with at sm:. */}
        <form
          onSubmit={handleSubmit}
          className="absolute left-1/2 top-[76%] w-[92%] max-w-xl -translate-x-1/2 sm:top-[66%] sm:w-[52%]"
        >
          <div className="flex items-center gap-2 px-1">
            <input
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="Your name & guest name (e.g. Rahul & Priya)"
              autoFocus
              aria-label="Your name"
              className="font-label min-w-0 flex-1 bg-transparent text-[clamp(14px,4vw,24px)] font-normal leading-none tracking-normal text-terracotta placeholder:text-[clamp(10px,2.9vw,20px)] placeholder:text-[#cf9d3f] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Submit"
              className="flex shrink-0 items-center justify-center text-vermillion lg:hidden"
            >
              <ArrowRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
          <div
            aria-hidden="true"
            className="mt-1 w-full"
            style={{ ...UNDERLINE_CROP, aspectRatio: '429 / 23' }}
          />
        </form>

        <p
          className="font-label absolute left-1/2 top-[6%] w-[92%] -translate-x-1/2 text-center text-[clamp(11px,3.6vw,15px)] font-medium leading-snug tracking-wide sm:w-[70%] sm:text-base sm:leading-normal"
          style={{ color: '#594F1A' }}
        >
          <span className="sm:hidden">
            We request your attendance for all
            <br />
            three days of our celebration:
          </span>
          <span className="hidden sm:inline">
            We request your attendance for all three days of our celebration:
          </span>
          <br />
          <span className="font-bold">March 3-6, 2027</span>
        </p>
      </div>
    </motion.section>
  )
}
