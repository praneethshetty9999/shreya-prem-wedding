import { useEffect, useState } from 'react'

// Gold circular FAQ badge, fixed to the viewport so it stays reachable no
// matter how far the page is scrolled. Hidden only while the hero
// (#hero-section) fully fills the screen; reveals the instant it stops
// being 100% on screen — i.e. the first pixel of scroll that lets the story
// section peek in — rather than waiting for the hero to scroll away
// entirely. threshold: 1 makes the observer fire exactly at that
// full-to-partial crossing (and the reverse, scrolling back to the top).
export function ItineraryBadge({ onClick }) {
  // Default to hidden: if a hero is present (the common case, since this
  // only renders once hasEntered is true and we're almost always on the
  // homepage right after the postcard), it must not flash into view before
  // the observer below has had a chance to check.
  const [isPastHero, setIsPastHero] = useState(false)

  useEffect(() => {
    let observer

    function watch(hero) {
      observer = new IntersectionObserver(
        ([entry]) => setIsPastHero(entry.intersectionRatio < 1),
        { threshold: [1] },
      )
      observer.observe(hero)
    }

    // On the landing → home transition, AnimatePresence (mode="wait") keeps
    // #hero-section out of the DOM until the postcard's exit animation
    // finishes, so it's routinely still missing on this effect's first run.
    // Staying hidden (the default above) and picking it up via
    // MutationObserver once it mounts avoids both a stuck-visible badge and
    // a visible flash during that transition.
    const hero = document.getElementById('hero-section')
    if (hero) {
      watch(hero)
      return () => observer.disconnect()
    }

    const mutationObserver = new MutationObserver(() => {
      const lateHero = document.getElementById('hero-section')
      if (!lateHero) return
      mutationObserver.disconnect()
      watch(lateHero)
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })
    return () => {
      mutationObserver.disconnect()
      observer?.disconnect()
    }
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
