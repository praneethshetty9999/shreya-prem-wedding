import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Gold circular "itinerary" badge pinned to the hero/beige boundary; opens a
// "Stay tuned!" popup. The painterly gold fill is borrowed from the
// Palace-boundary texture.
export function ItineraryBadge() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined
    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="absolute bottom-0 right-[2.5%] z-30 flex h-24 w-24 translate-y-[75%] cursor-pointer items-center justify-center rounded-full bg-cover bg-center shadow-lg transition-transform duration-300 hover:scale-105 sm:h-32 sm:w-32"
        style={{ backgroundImage: "url('/iternary-logo.png')" }}
      >
        <span className="text-xl font-bold text-white sm:text-2xl">itinerary</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#3a1d10]/30 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              role="dialog"
              aria-modal="true"
              aria-label="Itinerary coming soon"
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-lg rounded-lg border border-vermillion/60 bg-rsvp-cream bg-cover bg-center px-8 pb-10 pt-12 text-center shadow-2xl"
              style={{ backgroundImage: "url('/rsvp-background.png')" }}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="absolute right-5 top-4 text-2xl font-bold text-vermillion transition-transform hover:scale-110"
              >
                ✕
              </button>

              <img src="/Flower.png" alt="" aria-hidden="true" className="mx-auto w-24 sm:w-28" />

              <h2 className="font-heading mt-6 text-3xl font-bold text-vermillion sm:text-4xl">
                Stay tuned!
              </h2>

              <p className="font-label mx-auto mt-4 max-w-sm text-sm leading-relaxed text-vermillion/90">
                The itinerary, style guide, and all the exciting details are on their way.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
