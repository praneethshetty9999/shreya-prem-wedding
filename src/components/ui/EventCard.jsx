import { motion, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'
import { figureCropStyle, morphTransition } from '../../lib/figureCrop'

// Interactive event card. The card itself (and its text) never moves — the
// only animated pieces are a pixel-aligned copy of the card's figure artwork
// (see figureCropStyle) that gently floats, sways, and scales while hovered,
// and a soft glare that follows the cursor. The figure carries a layoutId so
// clicking morphs it into the full-screen detail overlay.
export function EventCard({ event, onOpen, className = '', imgClassName = '' }) {
  const [isHovered, setIsHovered] = useState(false)

  // Cursor position within the card (0..1), drives the glare only.
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const glareX = useTransform(px, [0, 1], ['25%', '75%'])
  const glareY = useTransform(py, [0, 1], ['25%', '75%'])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 240, 210, 0.15), transparent 60%)`

  function handleMouseMove(mouseEvent) {
    const rect = mouseEvent.currentTarget.getBoundingClientRect()
    px.set((mouseEvent.clientX - rect.left) / rect.width)
    py.set((mouseEvent.clientY - rect.top) / rect.height)
  }

  const box = event.figureBox

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(event)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      aria-label={`${event.date} — ${event.title}. View details`}
      className={`relative block cursor-pointer overflow-hidden rounded-xl shadow-md transition-shadow duration-300 hover:shadow-xl ${className}`}
    >
      <img src={event.src} alt="" className={`h-auto w-full ${imgClassName}`} />

      {/* The animated figure: identical pixels to the artwork it sits on while
          at rest, so it is invisible until hovered. The crop is padded past the
          figure's edges and the hover motion is smaller than that padding, so
          the moving copy always covers the static original beneath it. */}
      <motion.div
        aria-hidden="true"
        layoutId={`event-figure-${event.id}`}
        className="pointer-events-none absolute"
        style={{
          left: `${box.left}%`,
          top: `${box.top}%`,
          width: `${box.width}%`,
          height: `${box.height}%`,
          ...figureCropStyle(event),
        }}
        animate={
          isHovered
            ? { scale: 1.06, y: [0, -4, 0, 3, 0], rotate: [0, 2.2, 0, -2.2, 0] }
            : { scale: 1, y: 0, rotate: 0 }
        }
        transition={
          isHovered
            ? {
                scale: { duration: 0.35, ease: 'easeOut' },
                y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 4.4, repeat: Infinity, ease: 'easeInOut' },
                layout: morphTransition,
              }
            : { duration: 0.35, ease: 'easeOut', layout: morphTransition }
        }
      />

      <motion.div
        aria-hidden="true"
        style={{ background: glare }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0"
      />
    </motion.button>
  )
}
