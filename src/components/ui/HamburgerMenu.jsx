import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowRightIcon } from '../rsvp/icons'

const NAV_ITEMS = [
  { label: 'Homepage', action: 'homepage' },
  { label: 'Our Story', action: 'ourStory' },
  { label: 'FAQ', action: 'faq' },
  { label: 'Travel', action: 'travel' },
]

export function HamburgerMenu({
  onGoHome,
  onOpenOurStory,
  onOpenTravel,
  onOpenFAQ,
  onOpenRsvp,
  iconColorClassName = 'bg-cream',
}) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined
    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  function handleNavAction(action) {
    setIsOpen(false)
    if (action === 'homepage') onGoHome()
    else if (action === 'ourStory') onOpenOurStory()
    else if (action === 'travel') onOpenTravel()
    else if (action === 'faq') onOpenFAQ()
  }

  function handleRsvpClick() {
    setIsOpen(false)
    onOpenRsvp()
  }

  return (
    <>
      {/* Opens the menu only — closing while it's open happens via the
          panel's own "✕ Close" link, so this stays hidden while open instead
          of doubling up as a second close control. */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="fixed left-5 top-5 z-[80] flex h-9 w-9 flex-col items-center justify-center gap-1.5 p-2"
        >
          <span className={`h-0.5 w-7 rounded-full ${iconColorClassName}`} />
          <span className={`h-0.5 w-7 rounded-full ${iconColorClassName}`} />
          <span className={`h-0.5 w-7 rounded-full ${iconColorClassName}`} />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-y-0 left-[280px] right-0 z-[60] cursor-pointer backdrop-blur-md"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0.22, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 left-0 z-[70] flex w-[280px] flex-col bg-rsvp-cream bg-cover bg-center px-6 pb-6 pt-10 shadow-2xl"
              style={{ backgroundImage: "url('/Haamburger-background.png')" }}
            >
              <div className="flex items-start justify-between">
                {/* Figma: DIN Bold 24px/100%/1%, #E0492B */}
                <h2 className="font-heading text-[24px] font-bold leading-none tracking-[0.01em] text-[#E0492B]">
                  Menu
                </h2>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="font-label text-sm text-[#BE452A] underline underline-offset-2"
                >
                  ✕ Close
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-5">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    disabled={!item.action}
                    onClick={() => handleNavAction(item.action)}
                    /* Figma: Source Code Pro Medium 18px/100%/0%, #BE452A */
                    className={`font-label text-left text-[18px] font-medium leading-none tracking-normal transition-colors ${item.action ? 'text-[#BE452A] hover:opacity-80' : 'cursor-default text-[#BE452A]/40'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-auto flex flex-col items-start gap-4">
                <button
                  type="button"
                  onClick={handleRsvpClick}
                  className="font-label flex items-center gap-2 rounded-full bg-vermillion px-6 py-2.5 text-white transition-colors hover:bg-vermillion/90"
                >
                  Confirm RSVP
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
                <p className="font-label text-xs text-vermillion/80">
                  Still have questions?{' '}
                  <a href="mailto:soodmenon@gmail.com" className="underline">
                    Email us
                  </a>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
