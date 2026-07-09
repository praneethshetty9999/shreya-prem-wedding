import { motion } from 'framer-motion'
import { useState } from 'react'
import { figureCropStyle } from '../../lib/figureCrop'
import { SITE_PASSWORD } from '../../lib/constants'
import { unlockSite } from '../../lib/siteAuth'
import { ArrowRightIcon } from '../rsvp/icons'

// The elephant stamp is cropped straight out of the landing mock art.
const STAMP_CROP = figureCropStyle({
  src: '/landing-page.png',
  figureBox: { left: 84.2, top: 5.8, width: 10.8, height: 18 },
})

export function LandingPage({ onEnter }) {
  const [isAsking, setIsAsking] = useState(false)
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (password === SITE_PASSWORD) {
      unlockSite()
      onEnter()
    } else {
      setHasError(true)
      setPassword('')
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative flex min-h-svh items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/rsvp-background.png')" }}
    >
      {/* Elephant postage stamp */}
      <div
        aria-hidden="true"
        className="absolute right-[6%] top-[6%] w-24 sm:w-32 lg:w-36"
        style={{ ...STAMP_CROP, aspectRatio: '144 / 174' }}
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
              With hearts full of love and joy,
            </p>
            <p className="border-b border-dashed border-[#b98d4f] pb-2 pt-3 text-right">
              we invite you to join us as we begin
            </p>
            <p className="border-b border-dashed border-[#b98d4f] pb-2 pt-3 text-right tracking-widest">
              OUR FOREVER.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-end gap-2">
            {isAsking ? (
              <motion.form
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onSubmit={handleSubmit}
                className="flex items-center gap-2 rounded-full border border-vermillion px-5 py-2.5"
              >
                <input
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    setHasError(false)
                  }}
                  placeholder="Enter password"
                  autoFocus
                  aria-label="Site password"
                  className="font-label w-40 bg-transparent text-lg text-vermillion placeholder:text-vermillion/50 focus:outline-none sm:w-48"
                />
                <button
                  type="submit"
                  aria-label="Submit password"
                  className="shrink-0 text-vermillion transition-transform hover:translate-x-0.5"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </motion.form>
            ) : (
              <button
                type="button"
                onClick={() => setIsAsking(true)}
                className="font-label flex items-center gap-2 rounded-full border border-vermillion px-7 py-2.5 text-lg text-vermillion transition-colors hover:bg-vermillion/10"
              >
                Enter
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            )}
            {hasError && (
              <p role="alert" className="font-label text-sm text-vermillion">
                Incorrect password — please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
