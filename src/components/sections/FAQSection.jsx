// Government e-Visa portal for India — verified live and official (Bureau of
// Immigration / Ministry of Home Affairs, run by NIC) before linking it here.
const VISA_URL = 'https://indianvisaonline.gov.in/evisa/tvoa.html'

// The FAQ page is the design file rendered as-is — a single flattened image,
// not rebuilt in HTML. faq.svg's embedded raster was only 1190px wide
// (0.83px per design-unit) versus travel.svg's 1975px (1.37px per
// design-unit) — noticeably softer at full width. Upscaled here to match
// travel's pixel density (Lanczos, 1190→1975px wide) and saved as WebP so
// the sharper version isn't a multi-MB PNG (1.07MB vs. 5.5MB raw).
// The visa link is an invisible <a> positioned over that line of text —
// percentages are the line's pixel box in the source image converted to %,
// so they track the image at any rendered width.
export function FAQSection() {
  return (
    <div className="relative bg-rsvp-cream">
      <img src="/faq.webp" alt="Frequently asked questions" className="block w-full" />
      <a
        href={VISA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Apply for an Indian e-Tourist visa (opens in a new tab)"
        className="absolute"
        style={{ left: '21.1%', top: '47.4%', width: '53.7%', height: '0.8%' }}
      />
    </div>
  )
}
