import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RSVPFlow } from './components/rsvp/RSVPFlow'
import { EventDetailsSection } from './components/sections/EventDetailsSection'
import { HeroSection } from './components/sections/HeroSection'
import { LandingPage } from './components/sections/LandingPage'
import { PalaceSection } from './components/sections/PalaceSection'
import { StorySection } from './components/sections/StorySection'
import { VideoSection } from './components/sections/VideoSection'
import { FAQOverlay } from './components/ui/FAQOverlay'
import { HamburgerMenu } from './components/ui/HamburgerMenu'
import { ItineraryBadge } from './components/ui/ItineraryBadge'
import { OurStoryOverlay } from './components/ui/OurStoryOverlay'
import { TravelOverlay } from './components/ui/TravelOverlay'

// gate.html appends this after a successful password submit so the user
// lands straight on the hero section instead of the postcard they just came
// from — a second "Enter" click there would be redundant.
function cameStraightFromGate() {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  return params.get('entered') === '1'
}

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  // Password protection now happens at the Cloudflare edge (functions/_middleware.js)
  // before any of this ever reaches the browser — hasEntered is just the
  // postcard-to-home transition, not a security boundary.
  const [hasEntered, setHasEntered] = useState(() => {
    // Landing anywhere other than "/" (a shared /rsvp or /our-story link,
    // browser back/forward, a refresh mid-flow) means the postcard has
    // already been dealt with — jump straight past it.
    const skipLanding = cameStraightFromGate() || window.location.pathname !== '/'
    if (cameStraightFromGate()) {
      // Strip the flag so refreshing or sharing the URL doesn't skip the
      // postcard for anyone else.
      window.history.replaceState({}, '', window.location.pathname)
    }
    return skipLanding
  })
  // /rsvp and /our-story are real routes (not just component state) so the
  // browser's own back button closes them instead of leaving the app
  // entirely and re-triggering the password gate. See feedback: back button
  // used to land on /gate because these were state-only overlays with no
  // history entry of their own.
  const isRsvpOpen = location.pathname === '/rsvp'
  const isOurStoryOpen = location.pathname === '/our-story'
  const isFaqOpen = location.pathname === '/faq'
  const isTravelOpen = location.pathname === '/travel'

  // "Homepage" needs to back out of whatever's open (RSVP, Our Story, FAQ,
  // Travel) — not just scroll — since any of those can be the active screen
  // when the hamburger is used.
  function goHome() {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openRsvp() {
    navigate('/rsvp')
  }
  function openOurStory() {
    navigate('/our-story')
  }
  function openFAQ() {
    navigate('/faq')
  }
  function openTravel() {
    navigate('/travel')
  }

  return (
    <>
      {/* Every screen except the landing postcard gets the hamburger — it
          renders once here, above the RSVP flow and the story/FAQ/travel
          overlays alike, instead of being tied to any one of them. The FAQ
          badge has no purpose (and no room) on the RSVP flow. */}
      {hasEntered && (
        <>
          <HamburgerMenu
            onGoHome={goHome}
            onOpenOurStory={openOurStory}
            onOpenTravel={openTravel}
            onOpenFAQ={openFAQ}
            onOpenRsvp={openRsvp}
            iconColorClassName={isFaqOpen || isTravelOpen ? 'bg-[#F43511]' : 'bg-cream'}
          />
          {!isRsvpOpen && <ItineraryBadge onClick={openFAQ} />}
        </>
      )}

      {isRsvpOpen ? (
        <RSVPFlow onBack={() => navigate('/')} />
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
              <HeroSection onOpenRsvp={openRsvp} />

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
        {isOurStoryOpen && <OurStoryOverlay onClose={() => navigate('/')} />}
        {isFaqOpen && <FAQOverlay onClose={() => navigate('/')} />}
        {isTravelOpen && <TravelOverlay onClose={() => navigate('/')} />}
      </AnimatePresence>
    </>
  )
}

export default App
