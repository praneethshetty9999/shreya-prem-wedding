// The Travel page is the design file rendered as-is — a single flattened
// image, not rebuilt in HTML. Served as the raw PNG (extracted from
// travel.svg) rather than through the SVG wrapper, full-width — see the
// matching comment in FAQSection.jsx.
export function TravelSection() {
  return (
    <div className="bg-rsvp-cream">
      <img src="/travel.png" alt="Travel information" className="block w-full" />
    </div>
  )
}
