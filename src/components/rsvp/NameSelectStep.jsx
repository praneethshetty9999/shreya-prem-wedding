export function NameSelectStep({ matches, onSelect }) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-terracotta sm:text-3xl">
        Select Your Name
      </h2>

      {matches.length > 0 ? (
        <ul className="mt-6 max-h-80 space-y-2 overflow-y-auto text-left">
          {matches.map((match) => (
            <li key={match}>
              <button
                type="button"
                onClick={() => onSelect(match)}
                className="font-heading w-full rounded-xl bg-cream px-4 py-3 text-left text-lg text-terracotta transition-colors hover:bg-gold/30"
              >
                {match}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-heading mt-6 text-terracotta">
          No matching names found. Please check the spelling and try again.
        </p>
      )}
    </div>
  )
}
