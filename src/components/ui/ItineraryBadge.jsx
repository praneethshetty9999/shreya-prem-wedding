import { useEffect, useState } from 'react'

// Gold circular FAQ badge, fixed to the viewport so it stays reachable no
// matter how far the page is scrolled. Hidden for as long as any part of
// the hero (#hero-section) is on screen, then fades in the moment the hero
// has fully scrolled away and the next section begins — an
// IntersectionObserver on the hero itself, rather than a guessed scroll
// distance, so it tracks the real section boundary regardless of hero
// height. If there's no hero on the page (e.g. reached via a direct /faq
// link) it just stays visible. The painterly gold fill is borrowed from the
// Palace-boundary texture.
export function ItineraryBadge({ onClick }) {
  // Default to hidden, not visible: if a hero is present (the common case,
  // since this only renders once hasEntered is true and we're almost always
  // on the homepage right after the postcard), it must not flash into view
  // before the observer below has had a chance to check.
  const [isPastHero, setIsPastHero] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero-section')
    if (!hero) {
      setIsPastHero(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      setIsPastHero(!entry.isIntersecting)
    })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open FAQ"
      className={`fixed bottom-4 right-4 z-40 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-cover bg-center shadow-lg transition-all duration-300 hover:scale-105 sm:bottom-5 sm:right-5 sm:h-28 sm:w-28 lg:h-32 lg:w-32 ${
        isPastHero ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ backgroundImage: "url('/iternary-logo.png')" }}
    >
      <span className="font-heading-condensed text-l font-bold text-white sm:text-base lg:text-[22px]">FAQ</span>
    </button>
  )
}
