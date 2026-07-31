import { motion } from 'framer-motion'

// "Coming soon" popup for the itinerary — triggered by the itinerary badge
// and the hamburger menu's "View Itinerary" link alike.
export function ItineraryModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
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
          onClick={onClose}
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
  )
}
