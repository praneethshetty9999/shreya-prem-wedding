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

      {/* Postcard center divider */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[19%] hidden h-[62%] border-l border-dashed border-[#b98d4f]/70 md:block"
      />

      {/* Right half of the postcard */}
      <div className="flex w-full justify-center px-6 md:w-1/2 md:translate-x-full md:px-12 lg:px-20">
        <div className="w-full max-w-xl">
          <div className="font-label text-base text-[#7c3b24] sm:text-lg lg:text-xl">
            <p className="border-b border-dashed border-[#b98d4f] pb-2 text-right">
              With hearts full of love,
            </p>
            <p className="border-b border-dashed border-[#b98d4f] pb-2 pt-3 text-right">
              we invite you to join us as we begin
            </p>
            <p className="border-b border-dashed border-[#b98d4f] pb-2 pt-3 text-right tracking-widest">
              OUR FOREVER.
            </p>
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
