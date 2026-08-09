// The Travel page is the design file rendered as-is — a single flattened
// image, not rebuilt in HTML. Served as the raw PNG (extracted from
// travel.svg) rather than through the SVG wrapper, full-width — see the
// matching comment in FAQSection.jsx.

// Same tooltip treatment as the tilak mark in PalaceSection.jsx.
const tooltipClass =
  'pointer-events-none absolute bottom-full mb-2 rounded-xl bg-maroon/95 px-4 py-2.5 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100'

export function TravelSection() {
  return (
    <div className="relative bg-rsvp-cream">
      <img src="/travel.png" alt="Travel information" className="block w-full" />

      {/* The tilak dots baked into the flattened design, bottom-right —
          hover/focus for their significance, matched to the pixel bounds
          of that mark in travel.png. */}
      <div
        tabIndex={0}
        className="group absolute cursor-help focus:outline-none"
        style={{ left: '62%', top: '79%', width: '31.5%', height: '11.5%' }}
      >
        <div className={`${tooltipClass} right-0 w-60 text-left sm:w-72`}>
          <p className="font-label text-[11px] leading-relaxed tracking-wide text-cream">
            The tilak is a sacred mark of blessing in Indian culture — placed on the forehead to
            honor and welcome guests, invoke protection, and mark auspicious beginnings.
          </p>
        </div>
      </div>
    </div>
  )
}
