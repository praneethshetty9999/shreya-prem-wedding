import { useState } from 'react'
import { RSVPFlow } from './components/rsvp/RSVPFlow'
import { EventDetailsSection } from './components/sections/EventDetailsSection'
import { HeroSection } from './components/sections/HeroSection'
import { PalaceSection } from './components/sections/PalaceSection'
import { StorySection } from './components/sections/StorySection'
import { VideoSection } from './components/sections/VideoSection'

function App() {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false)

  if (isRsvpOpen) {
    return <RSVPFlow onBack={() => setIsRsvpOpen(false)} />
  }

  return (
    <main>
      <HeroSection onOpenRsvp={() => setIsRsvpOpen(true)} />

      <section
        className="bg-parchment bg-cover bg-center"
        style={{ backgroundImage: "url('/beige-background.jpg')" }}
      >
        <div className="mx-auto max-w-[90rem] px-6 pt-10 sm:pt-16">
          <StorySection />
        </div>

        <div className="mx-auto max-w-[90rem] px-2 py-12 sm:px-4 sm:py-16">
          <EventDetailsSection />
        </div>

        <PalaceSection />
      </section>

      <VideoSection />
    </main>
  )
}

export default App
