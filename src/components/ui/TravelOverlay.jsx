import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { TravelSection } from '../sections/TravelSection'

// Full-page Travel info, opened from the hamburger's "Travel" link. Same
// overlay shell as OurStoryOverlay/FAQOverlay — no dedicated close button,
// closes via the hamburger's "Homepage" link or Escape.
export function TravelOverlay({ onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      role="dialog"
      aria-modal="true"
      aria-label="Travel information"
      className="fixed inset-0 z-50 overflow-y-auto bg-rsvp-cream"
    >
      <TravelSection />
    </motion.div>
  )
}
