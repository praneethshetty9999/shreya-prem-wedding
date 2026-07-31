// Gold circular "itinerary" badge, fixed to the viewport so it stays
// reachable no matter how far the page is scrolled. Opens the "stay tuned"
// popup (see ItineraryModal). The painterly gold fill is borrowed from the
// Palace-boundary texture.
export function ItineraryBadge({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-5 right-5 z-40 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-cover bg-center shadow-lg transition-transform duration-300 hover:scale-105 sm:h-24 sm:w-24"
      style={{ backgroundImage: "url('/iternary-logo.png')" }}
    >
      <span className="text-lg font-bold text-white sm:text-xl">itinerary</span>
    </button>
  )
}
