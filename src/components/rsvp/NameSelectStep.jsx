export function NameSelectStep({ matches, onSelect }) {
  return (
    <div>
      <h2 className="font-heading text-center text-2xl font-bold text-vermillion sm:text-3xl">
        Select your name
      </h2>

      {matches.length > 0 ? (
        <ul className="mt-6 max-h-80 space-y-3 overflow-y-auto text-left">
          {matches.map((match) => (
            <li key={match}>
              <button
                type="button"
                onClick={() => onSelect(match)}
                className="font-label w-full rounded-xl border border-vermillion px-4 py-3.5 text-left text-sm text-terracotta transition-colors hover:bg-vermillion/10"
              >
                {match}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-4">
          <img src="/notfound-dog.png" alt="" aria-hidden="true" className="w-28" />
          <p className="font-label text-sm text-terracotta">
            No matching names found.
            <br />
            Please check the spelling and try again.
          </p>
        </div>
      )}
    </div>
  )
}
