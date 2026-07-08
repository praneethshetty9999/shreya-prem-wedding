import { useState } from 'react'
import { CountryCodeSelect } from './CountryCodeSelect'
import { ArrowRightIcon } from './icons'

const fieldClass =
  'font-label w-full rounded-xl border border-vermillion bg-transparent px-4 py-3.5 text-sm text-terracotta placeholder:text-terracotta/50 focus:outline-none'

function PhoneRow({ code, onCodeChange, phone, onPhoneChange, placeholder }) {
  return (
    <div className="flex items-center rounded-xl border border-vermillion">
      <CountryCodeSelect value={code} onChange={onCodeChange} />
      <div className="h-7 w-px shrink-0 bg-vermillion" />
      <input
        type="tel"
        inputMode="numeric"
        placeholder={placeholder}
        value={phone}
        onChange={(event) => onPhoneChange(event.target.value.replace(/\D/g, ''))}
        className="font-label min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-terracotta placeholder:text-terracotta/50 focus:outline-none"
      />
    </div>
  )
}

export function GuestDetailsStep({ guestName, onReset, onSubmit, isSubmitting, submitError }) {
  const [primaryCode, setPrimaryCode] = useState('+1')
  const [primaryPhone, setPrimaryPhone] = useState('')
  const [secondaryCode, setSecondaryCode] = useState('+1')
  const [secondaryPhone, setSecondaryPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [dietary, setDietary] = useState('')

  const isPhoneValid = primaryPhone.length >= 7 && primaryPhone.length <= 12
  const isComplete =
    isPhoneValid && [street, city, state].every((value) => value.trim().length > 0)

  function handleSubmit(event) {
    event.preventDefault()
    if (!isComplete) return
    // Leading apostrophe forces Google Sheets (USER_ENTERED input) to store
    // "+1 ..." as text instead of trying to parse it as a formula.
    onSubmit({
      primaryMobile: `'${primaryCode} ${primaryPhone}`,
      secondaryMobile: secondaryPhone ? `'${secondaryCode} ${secondaryPhone}` : '',
      address: `${street.trim()}, ${city.trim()}, ${state.trim()}`,
      dietaryRestrictions: dietary.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="text-left">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-heading text-2xl font-bold text-vermillion sm:text-3xl">
          Welcome, {guestName}!
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="font-label shrink-0 text-sm text-vermillion underline underline-offset-2"
        >
          Not you?
        </button>
      </div>

      <div className="mt-6 space-y-3">
        <PhoneRow
          code={primaryCode}
          onCodeChange={setPrimaryCode}
          phone={primaryPhone}
          onPhoneChange={setPrimaryPhone}
          placeholder="Primary Mobile Number*"
        />
        <PhoneRow
          code={secondaryCode}
          onCodeChange={setSecondaryCode}
          phone={secondaryPhone}
          onPhoneChange={setSecondaryPhone}
          placeholder="Secondary Mobile Number"
        />
        {primaryPhone.length > 0 && !isPhoneValid && (
          <p className="font-label text-xs text-red-600">Please enter a valid phone number.</p>
        )}

        <input
          type="text"
          placeholder="Street Address*"
          value={street}
          onChange={(event) => setStreet(event.target.value)}
          className={fieldClass}
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="City*"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className={fieldClass}
          />
          <input
            type="text"
            placeholder="State*"
            value={state}
            onChange={(event) => setState(event.target.value)}
            className={fieldClass}
          />
        </div>
        <input
          type="text"
          placeholder="Any dietary restrictions..."
          value={dietary}
          onChange={(event) => setDietary(event.target.value)}
          className={fieldClass}
        />
      </div>

      {submitError && <p className="font-label mt-4 text-sm text-red-600">{submitError}</p>}

      <button
        type="submit"
        disabled={!isComplete || isSubmitting}
        className="font-label mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-vermillion py-3.5 text-lg text-rsvp-cream transition-opacity disabled:opacity-40"
      >
        {isSubmitting ? 'Submitting…' : 'Confirm RSVP'}
        {!isSubmitting && <ArrowRightIcon className="h-5 w-5" />}
      </button>
    </form>
  )
}
