import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { EventCard } from '../ui/EventCard'
import { EventDetailOverlay } from '../ui/EventDetailOverlay'

// Description / facts copy is placeholder — real details to be supplied later.
// bg = the card artwork's flat background color (sampled from its pixels);
// figureBox = the figure illustration's bounding box in % of the card image,
// measured from pixel analysis; figureAspect = that box's width/height ratio.
const EVENTS = [
  {
    id: 'haldi',
    src: '/Card1.png',
    title: 'Haldi',
    date: 'March 3rd',
    bg: '#da9d3f',
    theme: 'dark',
    figureBox: { left: 57.9, top: 13.4, width: 34.4, height: 66.6 },
    figureNotch: { corner: 'top-right', width: 14, height: 5 },
    figureAspect: 0.8245,
    description:
      'A golden morning of turmeric, laughter, and blessings as family and friends gather to shower the couple with love (and quite a lot of yellow). Placeholder text — full details coming soon.',
    facts: [
      { label: 'Time', value: '10:00 AM' },
      { label: 'Venue', value: 'To be announced' },
      { label: 'Dress code', value: 'Shades of yellow' },
    ],
    position: 'md:col-start-1 md:row-start-1',
  },
  {
    id: 'kerala-wedding',
    src: '/Card2.png',
    title: 'Kerala Wedding',
    date: 'March 4th',
    bg: '#db595a',
    theme: 'light',
    figureBox: { left: 54.4, top: 10.58, width: 44.1, height: 73.67 },
    figureNotch: { corner: 'top-right', width: 27, height: 8 },
    figureAspect: 0.9556,
    description:
      'A serene traditional ceremony steeped in Kerala custom — white and gold, temple flowers, and timeless ritual. Placeholder text — full details coming soon.',
    facts: [
      { label: 'Time', value: '9:00 AM' },
      { label: 'Venue', value: 'To be announced' },
      { label: 'Dress code', value: 'Traditional attire' },
    ],
    position: 'md:col-start-2 md:row-start-1',
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
      'An evening under the stars with soulful qawwali and Sufi melodies echoing through the fort. Placeholder text — full details coming soon.',
    facts: [
      { label: 'Time', value: '7:30 PM' },
      { label: 'Venue', value: 'To be announced' },
      { label: 'Dress code', value: 'Festive evening wear' },
    ],
    position: 'md:col-start-1 md:row-start-2',
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
      'Henna, choreographed chaos, and a dance floor that will not be left empty — an afternoon of mehendi flowing into a night of sangeet. Placeholder text — full details coming soon.',
    facts: [
      { label: 'Time', value: '4:00 PM' },
      { label: 'Venue', value: 'To be announced' },
      { label: 'Dress code', value: 'Bright & festive' },
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
      'The main event — the shaadi itself, followed by the reception and an after party that promises to outlast the night. Placeholder text — full details coming soon.',
    facts: [
      { label: 'Time', value: '11:00 AM' },
      { label: 'Venue', value: 'To be announced' },
      { label: 'Dress code', value: 'Your regal best' },
    ],
  },
]

const GRID_EVENTS = EVENTS.filter((event) => event.id !== 'shaadi')
const SHAADI_EVENT = EVENTS.find((event) => event.id === 'shaadi')

// Card1-4 and Card5 are placed on one shared grid (rather than Card5 living in
// a separately-sized nested grid) so Card4's row and Card5's row-span-2 bottom
// resolve against the exact same grid line — guarantees the bottoms align
// instead of relying on a nested grid's auto height matching a stretched sibling.
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
            className={`mx-auto w-[85%] md:w-[86%] ${event.position}`}
          />
        ))}

        {/* A bare image grid item here would feed Card5's tall intrinsic aspect
            ratio into the grid's row-track sizing, inflating both spanned rows
            so Card3/Card4 end up short of the row's bottom. The sizeless div is
            the actual grid item; the card inside is scaled by height only
            (width auto) so it shrinks as a whole instead of being cropped. */}
        <div className="mx-auto w-[85%] md:col-start-3 md:row-span-2 md:flex md:h-full md:w-full md:items-start md:justify-center">
          <EventCard
            event={SHAADI_EVENT}
            onOpen={setActiveEvent}
            className="w-full md:h-full md:w-auto"
            imgClassName="md:h-full md:w-auto"
          />
        </div>
      </div>

      <AnimatePresence>
        {activeEvent && (
          <EventDetailOverlay event={activeEvent} onClose={() => setActiveEvent(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
