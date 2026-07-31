import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { RSVPFlow } from './components/rsvp/RSVPFlow'
import { EventDetailsSection } from './components/sections/EventDetailsSection'
import { HeroSection } from './components/sections/HeroSection'
import { LandingPage } from './components/sections/LandingPage'
import { PalaceSection } from './components/sections/PalaceSection'
import { StorySection } from './components/sections/StorySection'
import { VideoSection } from './components/sections/VideoSection'
import { HamburgerMenu } from './components/ui/HamburgerMenu'
import { ItineraryBadge } from './components/ui/ItineraryBadge'
import { ItineraryModal } from './components/ui/ItineraryModal'
import { OurStoryOverlay } from './components/ui/OurStoryOverlay'

// gate.html appends this after a successful password submit so the user
// lands straight on the hero section instead of the postcard they just came
// from — a second "Enter" click there would be redundant.
function cameStraightFromGate() {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  return params.get('entered') === '1'
}

function App() {
  // Password protection now happens at the Cloudflare edge (functions/_middleware.js)
  // before any of this ever reaches the browser — hasEntered is just the
  // postcard-to-home transition, not a security boundary.
  const [hasEntered, setHasEntered] = useState(() => {
    const skipLanding = cameStraightFromGate()
    if (skipLanding) {
      // Strip the flag so refreshing or sharing the URL doesn't skip the
      // postcard for anyone else.
      window.history.replaceState({}, '', window.location.pathname)
    }
    return skipLanding
  })
  const [isRsvpOpen, setIsRsvpOpen] = useState(false)
  const [isOurStoryOpen, setIsOurStoryOpen] = useState(false)
  const [isItineraryOpen, setIsItineraryOpen] = useState(false)

  // "Homepage" needs to back out of whatever's open (RSVP, Our Story,
  // itinerary popup) — not just scroll — since any of those can be the
  // active screen when the hamburger is used.
  function goHome() {
    setIsRsvpOpen(false)
    setIsOurStoryOpen(false)
    setIsItineraryOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Our Story and the itinerary popup are both fixed, full-screen overlays
  // rendered independently of isRsvpOpen — if one was left open when RSVP
  // opened, it'd sit on top of (and hide) the RSVP flow underneath. Opening
  // any one of the three has to close the other two.
  function openRsvp() {
    setIsOurStoryOpen(false)
    setIsItineraryOpen(false)
    setIsRsvpOpen(true)
  }
  function openOurStory() {
    setIsRsvpOpen(false)
    setIsItineraryOpen(false)
    setIsOurStoryOpen(true)
  }
  function openItinerary() {
    setIsRsvpOpen(false)
    setIsOurStoryOpen(false)
    setIsItineraryOpen(true)
  }

  return (
    <>
      {/* Every screen except the landing postcard gets the hamburger — it
          renders once here, above the RSVP flow and the story/itinerary
          overlays alike, instead of being tied to any one of them. */}
      {hasEntered && (
        <HamburgerMenu
          onGoHome={goHome}
          onOpenOurStory={openOurStory}
          onOpenItinerary={openItinerary}
          onOpenRsvp={openRsvp}
        />
      )}

      {isRsvpOpen ? (
        <RSVPFlow onBack={() => setIsRsvpOpen(false)} />
      ) : (
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
              {/* The itinerary badge straddles the hero/beige boundary, so it
                  lives outside the hero (whose overflow-hidden would clip it). */}
              <div className="relative">
                <HeroSection onOpenRsvp={openRsvp} />
                <ItineraryBadge onClick={openItinerary} />
              </div>

              <section
                className="bg-parchment bg-cover bg-center"
                style={{ backgroundImage: "url('/Landing BG 1.png')" }}
              >
                <div className="mx-auto max-w-[90rem] px-6 pt-10 sm:pt-16">
                  <StorySection onOpenOurStory={openOurStory} />
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
      )}

      <AnimatePresence>
        {isOurStoryOpen && <OurStoryOverlay onClose={() => setIsOurStoryOpen(false)} />}
        {isItineraryOpen && <ItineraryModal onClose={() => setIsItineraryOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

export default App
