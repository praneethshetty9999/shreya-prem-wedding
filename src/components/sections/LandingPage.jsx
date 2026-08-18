import { motion } from 'framer-motion'
import { ArrowRightIcon } from '../rsvp/icons'

export function LandingPage({ onEnter }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative flex min-h-svh items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/rsvp-background.png')" }}
    >
      {/* Jaipur postage stamp */}
      <img
        src="/Postal Stamp Jaipur  1.png"
        alt=""
        aria-hidden="true"
        className="absolute right-[6%] top-[6%] w-24 sm:w-32 lg:w-36"
      />

      {/* Postcard center divider. The right column only switches to a half-
          width, two-column layout at min-[1340px]: — below that, "This has
          been in the works for a while..." (nowrap, so it can never wrap to
          a 2nd line) needs ~492px at the 20px size that ships alongside the
          half-width column; halving anything narrower than ~1340px leaves
          less room than that and the line would overflow past the divider.
          So the column (and the divider next to it) only appear once
          there's actually space for the line to fit beside it — below that
          the column stays full-width with no divider to compete with. */}
      <img
        src="/vertical.png"
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 top-[19%] hidden h-[62%] w-auto -translate-x-1/2 min-[1340px]:block"
      />

      {/* Right half of the postcard */}
      <div className="flex w-full justify-center px-6 md:px-12 min-[1340px]:w-1/2 min-[1340px]:translate-x-full min-[1340px]:px-20">
        <div className="w-full max-w-xl">
          <div className="font-label text-[12px] text-[#B87A36] sm:text-lg min-[1340px]:text-xl">
            {/* w-fit + ml-auto: the divider img below is w-full of *this*
                wrapper, not the whole column, so it shrinks to match the
                line's own text width instead of spanning the full width. */}
            <div className="ml-auto w-fit">
              <p className="whitespace-nowrap text-right">This has been in the works for a while...</p>
              <div className="h-2 overflow-hidden">
                <img src="/horizontal.png" alt="" aria-hidden="true" className="-mt-3 w-full" />
              </div>
            </div>
            <div className="ml-auto mt-1 w-fit">
              <p className="whitespace-nowrap text-right">Figured we’d make it official.</p>
              <div className="h-2 overflow-hidden">
                <img src="/horizontal.png" alt="" aria-hidden="true" className="-mt-3 w-full" />
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button
              type="button"
              onClick={onEnter}
              className="font-label flex items-center gap-2 rounded-full border border-vermillion px-7 py-2.5 text-lg text-vermillion transition-colors hover:bg-vermillion/10"
            >
              Enter
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
