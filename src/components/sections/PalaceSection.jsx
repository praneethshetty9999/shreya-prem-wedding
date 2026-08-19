const MAPS_URL =
  'https://www.google.com/maps/dir//bishangarh+fort+jaipur/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x396d058b59c0dcd9:0xda1aa4a41bf4acce?sa=X&ved=1t:155782&ictx=111'

// No horizontal anchor here — the hand-print tooltip sits near the left edge
// and the tilak tooltip near the right, so each usage below picks its own
// left-0/right-0 anchor instead of a shared centered one, which was pushing
// the wider tilak tooltip past the viewport edge on narrow screens.
const tooltipClass =
  'pointer-events-none absolute bottom-full mb-2 rounded-xl bg-maroon/95 px-4 py-2.5 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100'

export function PalaceSection() {
  return (
    <div className="relative aspect-[3/4] w-full md:aspect-[6/5] md:-mt-[1.2%]">
      <img
        src="/logo2.png"
        alt=""
        aria-hidden="true"
        className="absolute right-[12%] top-[6%] z-0 w-[65%] md:right-[11%] md:top-[6%] md:w-[42%]"
      />
      <img
        src="/Palace.png"
        alt="Alila Fort Bishangarh"
        className="absolute bottom-0 left-1/2 z-10 h-[85%] w-auto -translate-x-1/2 translate-y-[9%] md:-left-[8%] md:h-full md:translate-x-0 md:translate-y-0"
      />

      {/* Hand-print marks on the fort wall — click for directions to the venue. */}
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open directions to Alila Fort Bishangarh in Google Maps"
        className="group absolute left-[20%] top-[58%] z-20 w-[10%] md:left-[12.5%] md:top-[45%] md:w-[6%]"
      >
        <img
          src="/hand.png"
          alt=""
          className="h-auto w-full transition-transform duration-300 ease-out group-hover:scale-110"
        />
        <span className={`${tooltipClass} left-0 flex items-center gap-1.5 whitespace-nowrap`}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-3.5 w-3.5 text-cream"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21s-7-5.1-7-11a7 7 0 1 1 14 0c0 5.9-7 11-7 11z"
            />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span className="font-label text-xs tracking-widest text-cream">get directions</span>
        </span>
      </a>

      {/* Tilak marks over the fort — hover for their significance. */}
      <div
        tabIndex={0}
        className="group absolute bottom-[10%] right-[8%] z-40 w-[24%] cursor-help focus:outline-none md:bottom-[9%] md:right-[11%] md:w-[18%]"
      >
        <img
          src="/Tilak.png"
          alt="Rows of red tilak marks"
          className="h-auto w-full transition-transform duration-300 ease-out group-hover:scale-105"
        />
        <div className={`${tooltipClass} right-0 w-60 text-left sm:w-72`}>
          <p className="font-label text-[11px] leading-relaxed tracking-wide text-cream">
            The tilak is a sacred mark of blessing in Indian culture — placed on the forehead to
            honor and welcome guests, invoke protection, and mark auspicious beginnings.
          </p>
        </div>
      </div>

      <div className="absolute bottom-[23%] left-0 z-30 aspect-[40/3] w-full overflow-hidden md:bottom-[26%]">
        <img
          src="/Palace-boundary.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  )
}
