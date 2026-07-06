import { motion } from 'framer-motion'
import { useMemo } from 'react'

const PETAL_COLORS = ['#f3e4ce', '#ffe2b3', '#e0725a']

function createPetals(count) {
  const band = 100 / count
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: band * index + Math.random() * band,
    size: 16 + Math.random() * 16,
    duration: 14 + Math.random() * 10,
    delay: Math.random() * -24,
    drift: (Math.random() - 0.5) * 80,
    rotation: Math.random() * 360,
    color: PETAL_COLORS[index % PETAL_COLORS.length],
  }))
}

const BLOSSOM_ANGLES = [0, 72, 144, 216, 288]

function Petal({ size, color }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <g fill={color} fillOpacity="0.55">
        {BLOSSOM_ANGLES.map((angle) => (
          <ellipse key={angle} cx="12" cy="7.5" rx="3" ry="5" transform={`rotate(${angle} 12 12)`} />
        ))}
      </g>
      <circle cx="12" cy="12" r="1.6" fill={color} fillOpacity="0.7" />
    </svg>
  )
}

// Purely decorative falling-petal ambience. Renders as a plain in-flow layer
// (no z-index) so it simply paints after its static siblings, in front of the
// hero content — deliberately avoids negative z-index, which can escape an
// unisolated stacking context and end up invisible behind unrelated page
// content (bit us twice already elsewhere in this project).
export function PetalShower({ count = 24 }) {
  const petals = useMemo(() => createPetals(count), [count])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: `${petal.left}%`, top: '-10%' }}
          initial={{ opacity: 0, rotate: petal.rotation }}
          animate={{
            top: '110%',
            x: [0, petal.drift, 0],
            opacity: [0, 0.45, 0.45, 0],
            rotate: petal.rotation + 180,
          }}
          transition={{
            top: { duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: 'linear' },
            x: {
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            opacity: {
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              times: [0, 0.15, 0.85, 1],
            },
            rotate: { duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: 'linear' },
          }}
        >
          <Petal size={petal.size} color={petal.color} />
        </motion.div>
      ))}
    </div>
  )
}
