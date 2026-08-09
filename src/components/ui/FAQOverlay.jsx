import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { FAQSection } from '../sections/FAQSection'

// Full-page FAQ, opened from the hamburger's "FAQ Section" link. Same
// overlay shell as OurStoryOverlay — no dedicated close button, closes via
// the hamburger's "Homepage" link or Escape.
export function FAQOverlay({ onClose }) {
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
      aria-label="Frequently asked questions"
      className="fixed inset-0 z-50 overflow-y-auto bg-rsvp-cream"
    >
      <FAQSection />
    </motion.div>
  )
}
