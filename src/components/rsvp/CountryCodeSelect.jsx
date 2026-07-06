import { useEffect, useRef, useState } from 'react'

const COUNTRY_CODES = [
  { value: '+91', flag: '🇮🇳', label: 'India' },
  { value: '+1', flag: '🇺🇸', label: 'US / Canada' },
  { value: '+44', flag: '🇬🇧', label: 'United Kingdom' },
  { value: '+61', flag: '🇦🇺', label: 'Australia' },
  { value: '+971', flag: '🇦🇪', label: 'UAE' },
]

export function CountryCodeSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const selected = COUNTRY_CODES.find((code) => code.value === value) ?? COUNTRY_CODES[0]

  useEffect(() => {
    if (!isOpen) return undefined

    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="font-heading flex h-full items-center gap-1.5 py-3 pl-3 pr-2 text-terracotta"
      >
        <span className="text-lg leading-none">{selected.flag}</span>
        <span>{selected.value}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-10 mt-2 w-56 overflow-hidden rounded-lg border border-terracotta bg-white text-left shadow-xl"
        >
          {COUNTRY_CODES.map((code) => (
            <li key={code.value}>
              <button
                type="button"
                role="option"
                aria-selected={code.value === value}
                onClick={() => {
                  onChange(code.value)
                  setIsOpen(false)
                }}
                className={`font-heading flex w-full items-center gap-2 px-3 py-2 text-sm text-terracotta transition-colors hover:bg-gold/20 ${
                  code.value === value ? 'bg-gold/20' : ''
                }`}
              >
                <span className="text-base leading-none">{code.flag}</span>
                <span className="flex-1">{code.label}</span>
                <span className="text-terracotta/60">{code.value}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
