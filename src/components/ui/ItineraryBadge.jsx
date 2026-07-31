// Gold circular "itinerary" badge pinned to the hero/beige boundary; opens
// the "stay tuned" popup (see ItineraryModal). The painterly gold fill is
// borrowed from the Palace-boundary texture.
export function ItineraryBadge({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute bottom-0 right-[2.5%] z-30 flex h-24 w-24 translate-y-[75%] cursor-pointer items-center justify-center rounded-full bg-cover bg-center shadow-lg transition-transform duration-300 hover:scale-105 sm:h-32 sm:w-32"
      style={{ backgroundImage: "url('/iternary-logo.png')" }}
    >
      <span className="text-xl font-bold text-white sm:text-2xl">itinerary</span>
    </button>
  )
}
