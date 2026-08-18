import { useState } from 'react'
import { CountryCodeSelect } from './CountryCodeSelect'

const fieldClass =
  'font-label w-full rounded-xl border border-vermillion bg-transparent px-4 py-2.5 text-sm text-terracotta placeholder:text-terracotta/50 focus:outline-none sm:py-3.5'

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
        className="font-label min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-terracotta placeholder:text-terracotta/50 focus:outline-none sm:py-3.5"
      />
    </div>
  )
}

export function GuestDetailsStep({ guestName, onReset, onSubmit, isSubmitting, submitError }) {
  const [primaryCode, setPrimaryCode] = useState('+1')
  const [primaryPhone, setPrimaryPhone] = useState('')
  const [secondaryCode, setSecondaryCode] = useState('+1')
  const [secondaryPhone, setSecondaryPhone] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [aptSuite, setAptSuite] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [dietary, setDietary] = useState('')
  const [submittingIntent, setSubmittingIntent] = useState(null)

  const isPhoneValid = primaryPhone.length >= 7 && primaryPhone.length <= 12
  const isComplete =
    isPhoneValid &&
    [streetAddress, aptSuite, city, state, country, zipCode].every(
      (value) => value.trim().length > 0
    )

  function getPayload(attending) {
    return {
      name: guestName,
      attending: attending,
      primaryMobile: primaryPhone ? `'${primaryCode} ${primaryPhone}` : '',
      secondaryMobile: secondaryPhone ? `'${secondaryCode} ${secondaryPhone}` : '',
      streetAddress: streetAddress.trim(),
      aptSuite: aptSuite.trim(),
      city: city.trim(),
      state: state.trim(),
      country: country.trim(),
      zipCode: zipCode.trim(),
      dietaryRestrictions: dietary.trim(),
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!isComplete) return
    setSubmittingIntent('attending')
    onSubmit(getPayload(true))
  }

  function handleNotComing() {
    setSubmittingIntent('not-attending')
    onSubmit(getPayload(false))
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl text-left">
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

      <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
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
          placeholder="Second Guest Mobile Number"
        />
        {primaryPhone.length > 0 && !isPhoneValid && (
          <p className="font-label text-xs text-red-600">Please enter a valid phone number.</p>
        )}

        <input
          type="text"
          placeholder="Street Address*"
          value={streetAddress}
          onChange={(event) => setStreetAddress(event.target.value)}
          className={fieldClass}
        />
        <input
          type="text"
          placeholder="Apt/Suite*"
          value={aptSuite}
          onChange={(event) => setAptSuite(event.target.value)}
          className={fieldClass}
        />
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
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
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <input
            type="text"
            placeholder="Country*"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className={fieldClass}
          />
          <input
            type="text"
            placeholder="Zip code*"
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
            className={fieldClass}
          />
        </div>
        <input
          type="text"
          placeholder="Any dietary restrictions?"
          value={dietary}
          onChange={(event) => setDietary(event.target.value)}
          className={fieldClass}
        />
      </div>

      {submitError && <p className="font-label mt-4 text-sm text-red-600">{submitError}</p>}

      <div className="mt-5 flex flex-col gap-2.5 sm:mt-8 sm:gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleNotComing}
          disabled={isSubmitting}
          className="font-label flex flex-1 items-center justify-center rounded-full border border-vermillion px-3 py-2.5 text-base text-vermillion transition-opacity disabled:opacity-40 sm:py-3.5 sm:text-lg whitespace-nowrap"
        >
          {isSubmitting && submittingIntent === 'not-attending'
            ? 'Submitting...'
            : "Won't be there :("}
        </button>

        <button
          type="submit"
          disabled={!isComplete || isSubmitting}
          className="font-label flex flex-1 items-center justify-center gap-2 rounded-full bg-vermillion px-3 py-2.5 text-base text-rsvp-cream transition-opacity disabled:opacity-40 sm:gap-3 sm:py-3.5 sm:text-lg whitespace-nowrap"
        >
          {isSubmitting && submittingIntent === 'attending'
            ? 'Submitting...'
            : 'See you there!'}
        </button>
      </div>
    </form>
  )
}