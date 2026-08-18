// The Travel page is the design file rendered as-is — a single flattened
// image, not rebuilt in HTML. It isn't one image scaled to every viewport:
// the design reflows its text column at each breakpoint (font size and
// line wrapping change), so a single raster blurs badly at some widths and
// looks razor-sharp at others. Travel-320/480/576/768/992/1024/1200/1440.png
// are exports of that same reflow at each breakpoint's canvas width;
// <picture> picks whichever one matches the current viewport so the page is
// always displayed near its native resolution instead of being stretched or
// squashed from a single source. Same approach as FAQSection.jsx.
//
// Because the design reflows per breakpoint, the tilak hover target also
// shifts position from image to image — pixel-measured per breakpoint
// (bounding box of the tilak color against each export) and applied via the
// media queries below, keyed to the same breakpoints as the <picture>
// sources.

// Same tooltip treatment as the tilak mark in PalaceSection.jsx.
const tooltipClass =
  'pointer-events-none absolute bottom-full mb-2 rounded-xl bg-maroon/95 px-4 py-2.5 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100'

export function TravelSection() {
  return (
    <div className="relative bg-rsvp-cream">
      <style>{`
        .travel-tilak-trigger { left: 45.33%; top: 73.66%; width: 45.95%; height: 11.78%; }
        @media (min-width: 480px) {
          .travel-tilak-trigger { left: 50%; top: 72.64%; width: 45.5%; height: 12.32%; }
        }
        @media (min-width: 576px) {
          .travel-tilak-trigger { left: 43.17%; top: 70.72%; width: 47.88%; height: 13.65%; }
        }
        @media (min-width: 768px) {
          .travel-tilak-trigger { left: 54.75%; top: 76.95%; width: 39.31%; height: 12.5%; }
        }
        @media (min-width: 992px) {
          .travel-tilak-trigger { left: 62.23%; top: 75.58%; width: 28.35%; height: 12.36%; }
        }
        @media (min-width: 1024px) {
          .travel-tilak-trigger { left: 53.93%; top: 71.71%; width: 42.98%; height: 14.17%; }
        }
        @media (min-width: 1200px) {
          .travel-tilak-trigger { left: 56%; top: 71.06%; width: 37.08%; height: 17%; }
        }
        @media (min-width: 1440px) {
          .travel-tilak-trigger { left: 79.97%; top: 75.42%; width: 20.03%; height: 11.8%; }
        }
      `}</style>

      <picture>
        <source media="(min-width: 1440px)" srcSet="/Travel-1440.png" />
        <source media="(min-width: 1200px)" srcSet="/Travel-1200.png" />
        <source media="(min-width: 1024px)" srcSet="/Travel-1024.png" />
        <source media="(min-width: 992px)" srcSet="/Travel-992.png" />
        <source media="(min-width: 768px)" srcSet="/Travel-768.png" />
        <source media="(min-width: 576px)" srcSet="/Travel-576.png" />
        <source media="(min-width: 480px)" srcSet="/Travel-480.png" />
        <img src="/Travel-320.png" alt="Travel information" className="block w-full" />
      </picture>

      {/* The tilak dots baked into the flattened design, bottom-right —
          hover/focus for their significance. */}
      <div tabIndex={0} className="travel-tilak-trigger group absolute cursor-help focus:outline-none">
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
