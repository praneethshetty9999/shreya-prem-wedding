import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { RSVPFlow } from './components/rsvp/RSVPFlow'
import { EventDetailsSection } from './components/sections/EventDetailsSection'
import { HeroSection } from './components/sections/HeroSection'
import { LandingPage } from './components/sections/LandingPage'
import { PalaceSection } from './components/sections/PalaceSection'
import { StorySection } from './components/sections/StorySection'
import { VideoSection } from './components/sections/VideoSection'
import { ItineraryBadge } from './components/ui/ItineraryBadge'

function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [isRsvpOpen, setIsRsvpOpen] = useState(false)

  if (isRsvpOpen) {
    return <RSVPFlow onBack={() => setIsRsvpOpen(false)} />
  }

  return (
    <AnimatePresence mode="wait">
      {!hasEntered ? (
        <LandingPage key="landing" onEnter={() => setHasEntered(true)} />
      ) : (
        <motion.main
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* The itinerary badge straddles the hero/beige boundary, so it lives
              outside the hero (whose overflow-hidden would clip it). */}
          <div className="relative">
            <HeroSection onOpenRsvp={() => setIsRsvpOpen(true)} />
            <ItineraryBadge />
          </div>

          <section
            className="bg-parchment bg-cover bg-center"
            style={{ backgroundImage: "url('/beige-background.jpg')" }}
          >
            <div className="mx-auto max-w-[90rem] px-6 pt-10 sm:pt-16">
              <StorySection />
            </div>

            {/* No bottom padding: the palace is pulled up so its towers rise over
                the cards' bottom edge (Sufi Night card), with the palace painting
                on top of the cards where they overlap. */}
            <div className="mx-auto max-w-[90rem] px-2 pt-16 sm:px-4 sm:pt-24">
              <EventDetailsSection />
            </div>

            <PalaceSection />
          </section>

          <VideoSection />
        </motion.main>
      )}
    </AnimatePresence>
  )
}

export default App
