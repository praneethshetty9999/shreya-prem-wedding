import { useEffect, useState } from 'react'
import { CountryCodeSelect } from './CountryCodeSelect'

const MEAL_OPTIONS = ['Veg', 'Non-Veg']

const addressInputClass =
  'font-heading w-full rounded-lg border border-terracotta bg-white px-3 py-3 text-terracotta placeholder:text-terracotta/40 focus:outline-none'

export function GuestDetailsStep({ guestName, onReset, onSubmit, isSubmitting, submitError }) {
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [country, setCountry] = useState('')
  const [meal, setMeal] = useState('')
  const [isLookingUpPincode, setIsLookingUpPincode] = useState(false)

  useEffect(() => {
    const trimmed = pincode.trim()
    if (!/^\d{6}$/.test(trimmed)) return

    const controller = new AbortController()
    const timeoutId = setTimeout(async () => {
      setIsLookingUpPincode(true)
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${trimmed}`, {
          signal: controller.signal,
        })
        const data = await response.json()
        const postOffice = data?.[0]?.PostOffice?.[0]
        if (postOffice) {
          setCity(postOffice.District)
          setState(postOffice.State)
          setCountry(postOffice.Country)
        }
      } catch {
        // Lookup is a convenience, not a requirement — silently ignore failures.
      } finally {
        setIsLookingUpPincode(false)
      }
    }, 400)

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [pincode])

  const isPhoneValid = phone.length >= 7 && phone.length <= 12
  const isAddressComplete = [street, city, state, pincode, country].every(
    (value) => value.trim().length > 0,
  )
  const isComplete = isPhoneValid && isAddressComplete && meal !== ''

  function handleSubmit(event) {
    event.preventDefault()
    if (!isComplete) return
    const address = `${street.trim()}, ${city.trim()}, ${state.trim()} ${pincode.trim()}, ${country.trim()}`
    // Leading apostrophe forces Google Sheets to store this as text instead of
    // trying to parse "+91 ..." as a formula, which throws a parse error.
    onSubmit({ phone: `'${countryCode} ${phone}`, address, meal })
  }

  return (
    <form onSubmit={handleSubmit} className="text-left">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-2xl font-bold text-terracotta sm:text-3xl">
          Welcome, {guestName}
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="font-label shrink-0 text-xs tracking-widest text-terracotta/60 underline"
        >
          not you?
        </button>
      </div>

      <div className="mt-6 flex items-center rounded-lg border border-terracotta bg-white">
        <CountryCodeSelect value={countryCode} onChange={setCountryCode} />
        <div className="h-6 w-px shrink-0 bg-terracotta/30" />
        <input
          type="tel"
          inputMode="numeric"
          placeholder="Phone number"
          value={phone}
          onChange={(event) => setPhone(event.target.value.replace(/\D/g, ''))}
          className="font-heading min-w-0 flex-1 bg-transparent px-3 py-3 text-terracotta placeholder:text-terracotta/40 focus:outline-none"
        />
      </div>
      {phone.length > 0 && !isPhoneValid && (
        <p className="mt-1 text-sm text-red-600">Please enter a valid phone number.</p>
      )}

      <input
        type="text"
        placeholder="Street address"
        value={street}
        onChange={(event) => setStreet(event.target.value)}
        className={`${addressInputClass} mt-4`}
      />
      <div className="mt-3 grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className={addressInputClass}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(event) => setState(event.target.value)}
          className={addressInputClass}
        />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <input
          type="text"
          inputMode="numeric"
          placeholder="Pincode"
          value={pincode}
          onChange={(event) => setPincode(event.target.value.replace(/\D/g, '').slice(0, 6))}
          className={addressInputClass}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          className={addressInputClass}
        />
      </div>
      {isLookingUpPincode && (
        <p className="font-label mt-1 text-xs tracking-widest text-terracotta/50">
          looking up pincode…
        </p>
      )}

      <p className="font-heading mt-4 text-sm font-bold text-terracotta">Meal Preference</p>
      <div className="mt-2 flex gap-3">
        {MEAL_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setMeal(option)}
            className={`font-heading flex-1 rounded-lg border-2 border-terracotta py-3 font-bold transition-colors ${
              meal === option ? 'bg-terracotta text-cream' : 'bg-white text-terracotta'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {submitError && <p className="mt-4 text-sm text-red-600">{submitError}</p>}

      <button
        type="submit"
        disabled={!isComplete || isSubmitting}
        className="font-heading mt-6 w-full rounded-lg bg-terracotta py-3 font-bold text-cream transition-opacity disabled:opacity-40"
      >
        {isSubmitting ? 'Submitting…' : 'Confirm RSVP'}
      </button>
    </form>
  )
}
