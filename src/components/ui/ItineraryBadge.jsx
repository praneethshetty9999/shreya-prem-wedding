// Gold circular "itinerary" badge, fixed to the viewport so it stays
// reachable no matter how far the page is scrolled. Opens the "stay tuned"
// popup (see ItineraryModal). The painterly gold fill is borrowed from the
// Palace-boundary texture.
export function ItineraryBadge({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-4 right-4 z-40 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-cover bg-center shadow-lg transition-transform duration-300 hover:scale-105 sm:bottom-5 sm:right-5 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
      style={{ backgroundImage: "url('/iternary-logo.png')" }}
    >
      <span className="text-base font-bold text-white sm:text-xl lg:text-2xl">itinerary</span>
    </button>
  )
}
