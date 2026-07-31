import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { AboutUsSection } from '../sections/AboutUsSection'

// Full-page "Our Story" chapters wall, triggered by clicking the couple photo
// in StorySection. Sky-toned background matches AboutUsSection's own
// fort-sky backdrop so there's no flash before that image loads in.
// Closing happens via the global hamburger's "Homepage" link (or Escape) —
// there's no dedicated close button here anymore.
export function OurStoryOverlay({ onClose }) {
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
      aria-label="Our story"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#7e93a0]"
    >
      <AboutUsSection />
    </motion.div>
  )
}
