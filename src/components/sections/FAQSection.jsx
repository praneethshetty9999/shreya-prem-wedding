// Government e-Visa portal for India — verified live and official (Bureau of
// Immigration / Ministry of Home Affairs, run by NIC) before linking it here.
const VISA_URL = 'https://indianvisaonline.gov.in/evisa/tvoa.html'

// Same tooltip treatment as the tilak mark in PalaceSection.jsx.
const tooltipClass =
  'pointer-events-none absolute bottom-full mb-2 rounded-xl bg-maroon/95 px-4 py-2.5 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100'

// The FAQ page is the design file rendered as-is — a single flattened image,
// not rebuilt in HTML. It isn't one image scaled to every viewport: the
// design reflows its text column at each breakpoint (font size and line
// wrapping change), so a single raster blurs badly at some widths and looks
// razor-sharp at others. 320/480/576/768/992/1024/1200/1440 FAQ.png are
// exports of that same reflow at each breakpoint's canvas width; <picture>
// picks whichever one matches the current viewport so the page is always
// displayed near its native resolution instead of being stretched or
// squashed from a single source.
//
// Because the design reflows per breakpoint, the invisible visa-link <a>
// and the tilak hover target also shift position from image to image — both
// are pixel-measured per breakpoint (bounding box of the link/tilak color
// against each export) and applied via the media queries below, keyed to
// the same breakpoints as the <picture> sources.
export function FAQSection() {
  return (
    <div className="relative bg-rsvp-cream">
      <style>{`
        .faq-visa-link { left: 16.19%; top: 46.12%; width: 62.22%; height: 0.69%; }
        .faq-tilak-trigger { left: 45.83%; top: 84.24%; width: 46.95%; height: 6.41%; }
        @media (min-width: 480px) {
          .faq-visa-link { left: 16.6%; top: 44.08%; width: 61.5%; height: 0.7%; }
          .faq-tilak-trigger { left: 48.6%; top: 83.14%; width: 46.5%; height: 6.46%; }
        }
        @media (min-width: 576px) {
          .faq-visa-link { left: 22.17%; top: 42.51%; width: 51.25%; height: 0.69%; }
          .faq-tilak-trigger { left: 43.71%; top: 84.49%; width: 48.88%; height: 7.79%; }
        }
        @media (min-width: 768px) {
          .faq-visa-link { left: 20.44%; top: 44.66%; width: 54.06%; height: 0.72%; }
          .faq-tilak-trigger { left: 62.69%; top: 86.43%; width: 34.06%; height: 5.52%; }
        }
        @media (min-width: 992px) {
          .faq-visa-link { left: 29.7%; top: 42.38%; width: 37.74%; height: 0.7%; }
          .faq-tilak-trigger { left: 55.62%; top: 82.22%; width: 38.88%; height: 8.65%; }
        }
        @media (min-width: 1024px) {
          .faq-visa-link { left: 23.2%; top: 41.15%; width: 49.36%; height: 0.69%; }
          .faq-tilak-trigger { left: 50.17%; top: 82.09%; width: 43.98%; height: 7.35%; }
        }
        @media (min-width: 1200px) {
          .faq-visa-link { left: 31.08%; top: 41.16%; width: 34.6%; height: 0.69%; }
          .faq-tilak-trigger { left: 55.48%; top: 80.46%; width: 38.08%; height: 8.72%; }
        }
        @media (min-width: 1440px) {
          .faq-visa-link { left: 24.6%; top: 41.77%; width: 43.4%; height: 0.71%; }
          .faq-tilak-trigger { left: 85.47%; top: 84.81%; width: 14.53%; height: 5.68%; }
        }
      `}</style>

      <picture>
        <source media="(min-width: 1440px)" srcSet="/1440 FAQ.png" />
        <source media="(min-width: 1200px)" srcSet="/1200 FAQ.png" />
        <source media="(min-width: 1024px)" srcSet="/1024.png" />
        <source media="(min-width: 992px)" srcSet="/992.png" />
        <source media="(min-width: 768px)" srcSet="/768.png" />
        <source media="(min-width: 576px)" srcSet="/576 FAQ.png" />
        <source media="(min-width: 480px)" srcSet="/480 FAQ.png" />
        <img src="/320 FAQ.png" alt="Frequently asked questions" className="block w-full" />
      </picture>

      <a
        href={VISA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Apply for an Indian e-Tourist visa (opens in a new tab)"
        className="faq-visa-link absolute"
      />

      {/* The tilak dots baked into the flattened design, bottom-right —
          hover/focus for their significance. */}
      <div tabIndex={0} className="faq-tilak-trigger group absolute cursor-help focus:outline-none">
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
