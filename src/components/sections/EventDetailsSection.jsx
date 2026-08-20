import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { EventCard } from '../ui/EventCard'
import { EventDetailOverlay } from '../ui/EventDetailOverlay'

// Description / facts copy is placeholder — real details to be supplied later.
// bg = the card artwork's flat background color (sampled from its pixels);
// figureBox = the figure illustration's bounding box in % of the card image,
// measured from pixel analysis; figureAspect = that box's width/height ratio.
// Array order is the mobile (single-column) stacking order: Haldi, Sufi Night,
// Kerala Wedding, Mehendi & Sangeet, Shaadi. Desktop ignores it — each card is
// pinned by its own `position` col-start/row-start, so reordering here is
// mobile-only.
const EVENTS = [
  {
    id: 'haldi',
    src: '/Card1.png',
    title: 'Haldi',
    date: 'March 3rd',
    bg: '#da9d3f',
    theme: 'dark',
    figureBox: { left: 57.94, top: 16.67, width: 30, height: 60.56 },
    figureAspect: 0.7907,
    description:
      'A golden morning of turmeric, laughter, and blessings as family and friends gather to shower the couple with love (and quite a lot of yellow). More details coming soon.',
    facts: [
      { label: 'Time', value: '1:00 PM' },
      { label: 'Venue', value: 'Alila Fort: Haveli/Poolside' },
      { label: 'Dress code', value: 'Shades of yellow and orange' },
    ],
    position: 'md:col-start-1 md:row-start-1',
  },
  {
    id: 'sufi-night',
    src: '/Card3.png',
    title: 'Sufi Night',
    date: 'March 3rd',
    bg: '#1a2f43',
    theme: 'light',
    figureBox: { left: 57, top: 14.5, width: 37, height: 76 },
    figureNotch: { corner: 'bottom-right', width: 20, height: 16 },
    figureAspect: 0.7771,
    description:
      'An evening under the stars with soulful qawwali and Sufi melodies echoing through the fort. More details coming soon.',
    facts: [
      { label: 'Time', value: '6:00 PM' },
      { label: 'Venue', value: 'Alila Fort: Nazara' },
      { label: 'Dress code', value: 'Festive evening wear' },
    ],
    position: 'md:col-start-1 md:row-start-2',
  },
  {
    id: 'kerala-wedding',
    src: '/Card2.png',
    title: 'Kerala Wedding',
    date: 'March 4th',
    bg: '#db595a',
    theme: 'light',
    figureBox: { left: 55.22, top: 20.31, width: 38.38, height: 60.8 },
    figureAspect: 1.0077,
    description:
      'A serene traditional ceremony steeped in Kerala custom — white and gold, temple flowers, and timeless ritual. More details coming soon.',
    facts: [
      { label: 'Time', value: '10:00 AM' },
      { label: 'Venue', value: 'Alila Fort: Courtyard' },
      { label: 'Dress code', value: 'Shades of white and gold' },
    ],
    position: 'md:col-start-2 md:row-start-1',
  },
  {
    id: 'mehendi-sangeet',
    src: '/Card4.png',
    title: 'Mehendi & Sangeet',
    date: 'March 4th',
    bg: '#9e9900',
    theme: 'light',
    figureBox: { left: 57.0, top: 20.91, width: 35.0, height: 65.22 },
    figureNotch: { corner: 'bottom-right', width: 20, height: 9 },
    figureAspect: 0.8568,
    description:
      'Henna, choreographed chaos, and a dance floor that will not be left empty — an afternoon of mehendi flowing into a night of sangeet. More details coming soon.',
    facts: [
      { label: 'Time', value: '6:00 PM' },
      { label: 'Venue', value: 'Alila Fort: Aravali Lawn' },
      { label: 'Dress code', value: 'Indian festive wear' },
    ],
    position: 'md:col-start-2 md:row-start-2',
  },
  {
    id: 'shaadi',
    src: '/Card5.png',
    title: 'Shaadi',
    date: 'March 5th',
    bg: '#a30221',
    theme: 'light',
    figureBox: { left: 20.32, top: 28.06, width: 59.94, height: 37.89 },
    figureAspect: 1.1953,
    description:
      'An all day event -- the shaadi itself, followed by the reception and a special after party that promises to outlast the night. Full details coming soon!',
    facts: [
      { label: 'Time', value: 'TBA' },
      { label: 'Venue', value: 'Alila Fort Bishangarh' },
      { label: 'Dress code', value: 'TBA' },
    ],
  },
]

const GRID_EVENTS = EVENTS.filter((event) => event.id !== 'shaadi')
const SHAADI_EVENT = EVENTS.find((event) => event.id === 'shaadi')

// Card1-4 and Card5 are placed on one shared grid, and every card (Card5
// included) is sized off the same width percentage of its own column rather
// than Card5 stretching to fill the row-span-2 track by height. Letting
// Card5 stretch by height fed back into the grid's auto row-sizing (its
// height is indefinite until the rows are sized, so the browser falls back
// to Card5's own intrinsic aspect ratio at the column's full width — taller
// than two stacked Card1-4 rows — which inflated both rows and pushed
// Card3/Card4 short of Card5's bottom). Sizing every card by width instead
// keeps each card's own box non-circular, so rows 1-2 size purely off
// Card1-4 (identical aspect ratio → identical size) and Card5's bottom lands
// within a pixel or two of Card3/Card4's without any of them changing size
// relative to each other.
export function EventDetailsSection() {
  const [activeEvent, setActiveEvent] = useState(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2 md:gap-8">
        {GRID_EVENTS.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onOpen={setActiveEvent}
            className={`mx-auto w-[85%] self-start md:w-[86%] ${event.position}`}
          />
        ))}

        <EventCard
          event={SHAADI_EVENT}
          onOpen={setActiveEvent}
          className="mx-auto w-[85%] self-start md:col-start-3 md:row-span-2 md:w-[86%]"
        />
      </div>

      <AnimatePresence>
        {activeEvent && (
          <EventDetailOverlay event={activeEvent} onClose={() => setActiveEvent(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
